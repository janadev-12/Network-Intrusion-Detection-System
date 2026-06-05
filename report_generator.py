import json
from datetime import datetime
from pathlib import Path


def generate_report(analysis, response_data, output_path="reports/ids_report.json"):
    report = {
        "project": "NetShield IDS",
        "generated_at": datetime.now().isoformat(),
        "summary": analysis["summary"],
        "alerts": analysis["alerts"],
        "response": response_data
    }

    path = Path(output_path)
    path.parent.mkdir(parents=True, exist_ok=True)

    with open(path, "w", encoding="utf-8") as file:
        json.dump(report, file, indent=4)

    return report