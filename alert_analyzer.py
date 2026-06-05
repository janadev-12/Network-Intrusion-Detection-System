from collections import Counter


def map_severity(suricata_severity):
    """
    Suricata severity:
    1 = High
    2 = Medium
    3 = Low
    """
    if suricata_severity == 1:
        return "High"
    if suricata_severity == 2:
        return "Medium"
    return "Low"


def get_attack_type(signature):
    signature = signature.lower()

    if "brute" in signature or "login" in signature:
        return "Brute Force"
    if "sql" in signature:
        return "SQL Injection"
    if "port scan" in signature or "scan" in signature:
        return "Port Scan"
    if "malware" in signature or "trojan" in signature:
        return "Malware Traffic"
    if "dns" in signature:
        return "Suspicious DNS"
    if "smb" in signature:
        return "Suspicious SMB"
    if "rdp" in signature:
        return "RDP Attack"

    return "Suspicious Activity"


def get_recommendation(attack_type):
    recommendations = {
        "Brute Force": "Enable account lockout, use strong passwords, MFA, and block repeated failed login IPs.",
        "SQL Injection": "Use parameterized queries, input validation, and Web Application Firewall rules.",
        "Port Scan": "Restrict exposed services, block scanning IPs, and review firewall rules.",
        "Malware Traffic": "Isolate affected host, update signatures, and perform malware analysis.",
        "Suspicious DNS": "Check domain reputation, block malicious domains, and inspect DNS logs.",
        "Suspicious SMB": "Disable unused SMB services and restrict SMB access to trusted hosts.",
        "RDP Attack": "Disable public RDP, use VPN, enable MFA, and restrict RDP access.",
        "Suspicious Activity": "Investigate source IP, review logs, and apply network access controls."
    }

    return recommendations.get(attack_type, recommendations["Suspicious Activity"])


def calculate_risk_score(alerts):
    score = 0

    for alert in alerts:
        severity = alert.get("severity", "Low")

        if severity == "High":
            score += 25
        elif severity == "Medium":
            score += 12
        else:
            score += 5

    return min(score, 100)


def get_risk_level(score):
    if score >= 70:
        return "High"
    if score >= 35:
        return "Medium"
    if score > 0:
        return "Low"
    return "Safe"


def analyze_alerts(alerts):
    analyzed_alerts = []

    for alert in alerts:
        severity = map_severity(alert.get("suricata_severity", 3))
        attack_type = get_attack_type(alert.get("signature", ""))

        analyzed_alerts.append({
            **alert,
            "severity": severity,
            "attack_type": attack_type,
            "recommendation": get_recommendation(attack_type)
        })

    severity_counter = Counter(alert["severity"] for alert in analyzed_alerts)
    attack_counter = Counter(alert["attack_type"] for alert in analyzed_alerts)
    source_counter = Counter(alert["src_ip"] for alert in analyzed_alerts)

    risk_score = calculate_risk_score(analyzed_alerts)

    summary = {
        "total_alerts": len(analyzed_alerts),
        "high": severity_counter.get("High", 0),
        "medium": severity_counter.get("Medium", 0),
        "low": severity_counter.get("Low", 0),
        "risk_score": risk_score,
        "risk_level": get_risk_level(risk_score),
        "attack_types": dict(attack_counter),
        "top_attackers": dict(source_counter.most_common(5))
    }

    return {
        "summary": summary,
        "alerts": analyzed_alerts
    }