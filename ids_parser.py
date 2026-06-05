import json
from pathlib import Path


def parse_eve_log(file_path="real_logs/eve.json"):
    """
    Parse real Suricata eve.json logs.
    If the log file is empty or missing, it returns an empty alert list.
    """
    path = Path(file_path)

    if not path.exists():
        print(f"[NetShield IDS] Log file not found: {file_path}")
        return []

    alerts = []

    with open(path, "r", encoding="utf-8", errors="ignore") as file:
        for line_number, line in enumerate(file, start=1):
            line = line.strip()

            if not line:
                continue

            try:
                event = json.loads(line)
            except json.JSONDecodeError:
                continue

            if event.get("event_type") != "alert":
                continue

            alert_data = event.get("alert", {})

            alerts.append({
                "id": len(alerts) + 1,
                "timestamp": event.get("timestamp", "N/A"),
                "src_ip": event.get("src_ip", "Unknown"),
                "src_port": event.get("src_port", "N/A"),
                "dest_ip": event.get("dest_ip", "Unknown"),
                "dest_port": event.get("dest_port", "N/A"),
                "protocol": event.get("proto", "N/A"),
                "signature_id": alert_data.get("signature_id", "N/A"),
                "signature": alert_data.get("signature", "Unknown Alert"),
                "category": alert_data.get("category", "Unknown"),
                "suricata_severity": alert_data.get("severity", 3),
                "line_number": line_number
            })

    return alerts