from collections import Counter


def generate_response_actions(alerts):
    """
    Simple response mechanism:
    - High severity IPs are marked suspicious.
    - IPs with 2 or more alerts are recommended for blocking.
    """
    source_counter = Counter(alert["src_ip"] for alert in alerts)
    blocked_ips = []
    actions = []

    for alert in alerts:
        src_ip = alert["src_ip"]
        severity = alert["severity"]
        attack_type = alert["attack_type"]

        if severity == "High" or source_counter[src_ip] >= 2:
            if src_ip not in blocked_ips:
                blocked_ips.append(src_ip)

            actions.append({
                "src_ip": src_ip,
                "action": "Block / Monitor IP",
                "reason": f"{severity} severity {attack_type} detected",
                "status": "Recommended"
            })
        else:
            actions.append({
                "src_ip": src_ip,
                "action": "Monitor",
                "reason": f"{attack_type} detected",
                "status": "Observation"
            })

    unique_actions = []
    seen = set()

    for action in actions:
        key = (action["src_ip"], action["action"])
        if key not in seen:
            unique_actions.append(action)
            seen.add(key)

    return {
        "blocked_ips": blocked_ips,
        "actions": unique_actions
    }