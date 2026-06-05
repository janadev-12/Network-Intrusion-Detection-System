import os
from flask import Flask, jsonify
from flask_cors import CORS

from ids_parser import parse_eve_log
from alert_analyzer import analyze_alerts
from response_engine import generate_response_actions
from report_generator import generate_report

app = Flask(__name__)
CORS(app)

# Real log path only
# Default path: backend/real_logs/eve.json
# You can override this path using NETSHIELD_LOG_PATH environment variable.
LOG_PATH = os.environ.get("NETSHIELD_LOG_PATH", "real_logs/eve.json")


def get_ids_data():
    alerts = parse_eve_log(LOG_PATH)
    analysis = analyze_alerts(alerts)
    response_data = generate_response_actions(analysis["alerts"])
    report = generate_report(analysis, response_data)

    return {
        "log_path": LOG_PATH,
        "analysis": analysis,
        "response": response_data,
        "report": report
    }


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "success": True,
        "message": "NetShield IDS API is running",
        "version": "1.0.0",
        "mode": "Real IDS Log Mode",
        "log_path": LOG_PATH
    })


@app.route("/api/alerts", methods=["GET"])
def get_alerts():
    data = get_ids_data()

    return jsonify({
        "success": True,
        "mode": "real",
        "log_path": data["log_path"],
        "alerts": data["analysis"]["alerts"]
    })


@app.route("/api/summary", methods=["GET"])
def get_summary():
    data = get_ids_data()

    return jsonify({
        "success": True,
        "mode": "real",
        "log_path": data["log_path"],
        "summary": data["analysis"]["summary"]
    })


@app.route("/api/blocked-ips", methods=["GET"])
def get_blocked_ips():
    data = get_ids_data()

    return jsonify({
        "success": True,
        "mode": "real",
        "log_path": data["log_path"],
        "blocked_ips": data["response"]["blocked_ips"],
        "actions": data["response"]["actions"]
    })


@app.route("/api/report", methods=["GET"])
def get_report():
    data = get_ids_data()

    return jsonify({
        "success": True,
        "mode": "real",
        "log_path": data["log_path"],
        "report": data["report"]
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)