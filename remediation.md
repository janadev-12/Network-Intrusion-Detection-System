# Remediation Guide - NetShield IDS

## 1. Brute Force Attack

### Risk

Attackers may try multiple username and password combinations.

### Remediation

- Enable account lockout
- Use strong passwords
- Enable multi-factor authentication
- Block repeated failed login IPs
- Restrict SSH/RDP access using firewall rules

---

## 2. SQL Injection Attempt

### Risk

Attackers may attempt to manipulate database queries.

### Remediation

- Use parameterized queries
- Validate all user inputs
- Use Web Application Firewall rules
- Monitor web server logs
- Patch vulnerable applications

---

## 3. Port Scan Activity

### Risk

Attackers may scan open ports to identify vulnerable services.

### Remediation

- Close unused ports
- Restrict services using firewall rules
- Use IDS/IPS monitoring
- Block repeated scanning IPs
- Use network segmentation

---

## 4. Malware Traffic

### Risk

A host may be infected or communicating with malicious infrastructure.

### Remediation

- Isolate affected host
- Run malware scan
- Review DNS and proxy logs
- Block malicious domains and IPs
- Update antivirus and IDS signatures

---

## 5. Suspicious DNS Query

### Risk

DNS traffic may indicate command-and-control communication.

### Remediation

- Block malicious domains
- Use DNS filtering
- Monitor unusual DNS queries
- Review endpoint activity

---

## 6. Suspicious SMB / RDP Access

### Risk

Attackers may attempt lateral movement or remote access.

### Remediation

- Disable unused SMB/RDP services
- Restrict access to trusted IPs
- Use VPN for remote access
- Enable MFA
- Patch Windows systems

---

## Response Checklist

- Review high severity alerts first
- Identify top attacking IPs
- Block malicious IPs
- Monitor repeated alerts
- Update firewall rules
- Generate incident report
- Patch affected systems