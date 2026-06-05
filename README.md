# NetShield IDS - Network Intrusion Detection Dashboard

NetShield IDS is a cybersecurity project that analyzes Suricata IDS alert logs and visualizes detected network attacks using a React dashboard.

This project is built for **Task 4: Network Intrusion Detection System**.

The system reads Suricata `eve.json` logs, classifies network alerts by severity, identifies attack types, recommends response actions, and displays everything in a cyber command center dashboard.

---

## Project Objective

The main objective of this project is to build a network-based intrusion detection dashboard that can:

- Monitor IDS alert logs
- Detect suspicious network activities
- Classify alerts by severity
- Identify attack types
- Recommend response actions
- Visualize attacks using a dashboard
- Generate security reports

---

## Task 4 Requirement Mapping

| Task Requirement | Project Implementation |
|---|---|
| Set up a network-based intrusion detection system | Suricata IDS log-based monitoring |
| Configure rules and alerts | Custom Suricata rules in `rules/custom.rules` |
| Monitor network traffic continuously | Suricata generates `eve.json` alerts |
| Implement response mechanism | Backend recommends block / monitor actions |
| Visualize detected attacks | React cyber command center dashboard |

---

## Features

- Suricata IDS `eve.json` log analysis
- Real IDS log mode support
- Alert parsing and classification
- Attack type detection
- Severity mapping: High, Medium, Low
- Risk score calculation
- Suspicious IP detection
- Block / monitor recommendation engine
- Live alert terminal
- Threat radar visualization
- Attack pattern analysis
- Response engine panel
- Exportable JSON report
- Cyber command center UI
- React + Flask full-stack architecture

---

## Tech Stack

### IDS Engine

- Suricata IDS
- Npcap for Windows packet capture
- Custom Suricata rules

### Backend

- Python
- Flask
- Flask-CORS
- JSON log parsing

### Frontend

- React.js
- Vite
- JavaScript
- CSS

---

## Project Structure

```text
Network Intrusion System/
│
├── backend/
│   ├── app.py
│   ├── ids_parser.py
│   ├── alert_analyzer.py
│   ├── response_engine.py
│   ├── report_generator.py
│   ├── requirements.txt
│   ├── real_logs/
│   │   └── eve.json
│   ├── sample_logs/
│   │   └── eve.json
│   └── reports/
│       └── ids_report.json
│
├── frontend/
│   ├── public/
│   │   └── shield-logo.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── AlertCard.jsx
│   │   │   ├── AlertTable.jsx
│   │   │   ├── SeverityChart.jsx
│   │   │   ├── AttackTypeChart.jsx
│   │   │   └── BlockedIPs.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── idsService.js
│   │   ├── styles/
│   │   │   └── main.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── rules/
│   └── custom.rules
│
├── screenshots/
│   └── output-preview.png
│
├── reports/
│   ├── findings.md
│   ├── remediation.md
│   └── test-cases.md
│
├── README.md
└── .gitignore
```

---

## How It Works

```text
Suricata monitors network traffic
        ↓
Suricata generates eve.json alerts
        ↓
Python backend reads eve.json
        ↓
Alert analyzer classifies attack type and severity
        ↓
Response engine recommends block / monitor actions
        ↓
React dashboard displays alerts, risk score, radar, and response data
        ↓
User can export IDS incident report
```

---

## Attack Types Detected

The project can classify and display common IDS alert categories such as:

- SSH brute force attempts
- SQL injection patterns
- Port scan activity
- Malware traffic patterns
- Suspicious DNS queries
- Suspicious SMB connections
- RDP attack attempts
- Suspicious network activity

---

## Severity Mapping

Suricata severity values are mapped into readable severity levels.

```text
Suricata Severity 1 → High
Suricata Severity 2 → Medium
Suricata Severity 3 → Low
```

---

## Risk Score Logic

The backend calculates risk score based on alert severity.

```text
High severity alert   = 25 points
Medium severity alert = 12 points
Low severity alert    = 5 points
```

Maximum risk score is capped at `100`.

```text
0       = Safe
1 - 34  = Low
35 - 69 = Medium
70 -100 = High
```

---

## Response Mechanism

The response engine recommends security actions based on detected alerts.

Example actions:

- Block suspicious IP
- Monitor suspicious IP
- Review repeated attacker IPs
- Prioritize high severity alerts
- Investigate attack signatures

Example response output:

```json
{
  "src_ip": "192.168.1.50",
  "action": "Block / Monitor IP",
  "reason": "High severity Brute Force detected",
  "status": "Recommended"
}
```

---

## Important Note About Real IDS Data

This project can run without Suricata, but **real IDS alerts require Suricata and Npcap to be installed on the system**.

After cloning the project, users can run the React dashboard and Flask backend normally. However, real network alerts will appear only if Suricata is installed and configured on the user's machine.

Required for real monitoring:

- Suricata IDS
- Npcap
- Active network interface
- Suricata `eve.json` log file

If Suricata is not installed or `eve.json` is empty, the dashboard will show:

```text
Total Alerts: 0
Risk Score: 0/100
Blocked IPs: 0
```

This is normal because no real IDS alerts have been generated yet.

---

## Setup Instructions

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/netshield-ids.git
cd netshield-ids
```

Replace the repository URL with your actual GitHub repository link.

---

## 2. Backend Setup

Go to the backend folder:

```bash
cd backend
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

Run the Flask backend:

```bash
python app.py
```

Backend will run on:

```text
http://localhost:5000
```

Backend health check output:

```json
{
  "success": true,
  "message": "NetShield IDS API is running",
  "version": "1.0.0",
  "mode": "Real IDS Log Mode"
}
```

---

## 3. Frontend Setup

Open a new terminal and go to the frontend folder:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

Run the React development server:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

## 4. Real Suricata Log Setup

To display real IDS alerts, Suricata must be running and generating an `eve.json` log file.

### Check Suricata Installation

```powershell
& "C:\Program Files\Suricata\suricata.exe" --build-info
```

### Check Active Network Adapter

```powershell
Get-NetAdapter | Select-Object Name, Status, InterfaceDescription
```

Example output:

```text
Name    Status   InterfaceDescription
----    ------   --------------------
Wi-Fi   Up       Realtek Wireless LAN WiFi Adapter
```

Use the adapter name that has `Status` as `Up`.

---

## 5. Run Suricata on Wi-Fi

Open **PowerShell as Administrator** and run:

```powershell
& "C:\Program Files\Suricata\suricata.exe" -c "C:\Program Files\Suricata\suricata.yaml" -i "Wi-Fi" -l "C:\Users\janav\OneDrive\Desktop\network intrusion system\Network Intrusion System\backend\real_logs" -k none -v
```

If your adapter name is different, replace `Wi-Fi` with your adapter name.

Example:

```powershell
-i "Ethernet"
```

---

## 6. Connect Backend to Real eve.json

If Suricata generates logs inside:

```text
backend/real_logs/eve.json
```

then backend can be run normally:

```powershell
cd "C:\Users\janav\OneDrive\Desktop\network intrusion system\Network Intrusion System\backend"
python app.py
```

If Suricata generates `eve.json` in another location, set the environment variable before running backend:

```powershell
$env:NETSHIELD_LOG_PATH="C:\Program Files\Suricata\log\eve.json"
python app.py
```

Meaning:

```text
NETSHIELD_LOG_PATH tells the backend where the real Suricata eve.json file is located.
```

---

## 7. Generate Network Traffic

After starting Suricata, open websites or use normal internet activity to generate network logs.

Examples:

```text
google.com
github.com
youtube.com
```

Then refresh the dashboard.

If Suricata detects alerts, they will appear in the NetShield IDS dashboard.

---

## API Endpoints

### Health Check

```http
GET /
```

### Get Alerts

```http
GET /api/alerts
```

### Get Summary

```http
GET /api/summary
```

### Get Blocked IP Recommendations

```http
GET /api/blocked-ips
```

### Get Report

```http
GET /api/report
```

---

## Example API Response

```json
{
  "success": true,
  "summary": {
    "total_alerts": 8,
    "high": 4,
    "medium": 3,
    "low": 1,
    "risk_score": 100,
    "risk_level": "High",
    "attack_types": {
      "Brute Force": 3,
      "SQL Injection": 1,
      "Port Scan": 1
    },
    "top_attackers": {
      "192.168.1.50": 2
    }
  }
}
```

---

## Dashboard Output

The dashboard displays:

- Total alerts
- High severity alerts
- Risk score
- Blocked IP count
- Live IDS alert terminal
- Threat radar
- Attack pattern analysis
- Top attacker IP
- Threat level
- Response engine recommendations
- Export report button

---

## Screenshots

### Output Preview

![Output Preview](./screenshots/output-preview.png)

---

## Custom Suricata Rules

Custom IDS rules are stored in:

```text
rules/custom.rules
```

Example rule:

```text
alert tcp any any -> any 22 (msg:"Possible SSH Brute Force Attempt"; flow:to_server; threshold:type both, track by_src, count 5, seconds 60; sid:100001; rev:1;)
```

These rules are included for educational and portfolio demonstration purposes.

---

## Reports

The project includes documentation reports inside the `reports/` folder.

```text
reports/
├── findings.md
├── remediation.md
└── test-cases.md
```

### findings.md

Contains detected attack categories and security findings.

### remediation.md

Contains remediation steps for detected attacks.

### test-cases.md

Contains test cases for backend, alert parsing, dashboard, and report generation.

---

## Test Cases

### Test Case 1: Backend Health Check

```text
http://localhost:5000
```

Expected result:

```json
{
  "success": true,
  "message": "NetShield IDS API is running"
}
```

### Test Case 2: Alerts API

```text
http://localhost:5000/api/alerts
```

Expected result:

```text
Parsed IDS alerts from eve.json
```

### Test Case 3: Summary API

```text
http://localhost:5000/api/summary
```

Expected result:

```text
Total alerts, severity counts, risk score, attack types, and top attackers
```

### Test Case 4: Dashboard

```text
http://localhost:5173
```

Expected result:

```text
Cyber Command Center dashboard loads successfully
```

### Test Case 5: Export Report

Expected result:

```text
JSON report downloads successfully
```

---

## Troubleshooting

## Suricata command not recognized

If this error appears:

```text
suricata is not recognized
```

Use the full executable path:

```powershell
& "C:\Program Files\Suricata\suricata.exe" --build-info
```

---

## eve.json not created

Check whether Suricata is running correctly:

```powershell
Get-Content "C:\Program Files\Suricata\log\suricata.log" -Tail 80
```

Also check if Npcap is installed:

```powershell
Get-Service npcap
```

---

## Dashboard shows 0 alerts

This means no real Suricata alerts were found.

Possible reasons:

- Suricata is not running
- `eve.json` is empty
- Wrong `eve.json` path
- No suspicious traffic detected yet
- Npcap is not installed or not working

---

## Frontend blank screen

Restart frontend:

```bash
npm run dev
```

Hard refresh browser:

```text
Ctrl + Shift + R
```

Check browser console:

```text
F12 → Console
```

---

## Backend connection failed

Make sure backend is running:

```bash
cd backend
python app.py
```

Backend should be available at:

```text
http://localhost:5000
```

---

## Limitations

- Real alerts depend on Suricata configuration.
- This project reads Suricata logs; it does not replace Suricata.
- Dashboard shows alerts only when `eve.json` contains alert events.
- Detection accuracy depends on IDS rules.
- Windows live capture requires Npcap.
- Some networks may not generate alerts unless suspicious traffic or test rules are triggered.

---

## Future Enhancements

- Real-time WebSocket alert updates
- PDF report export
- Email alert notifications
- Database storage for alerts
- Login system for SOC users
- Firewall auto-block integration
- More Suricata custom rules
- Attack timeline visualization
- GeoIP attacker map
- Threat intelligence API integration
- Packet capture upload support

---

## Learning Outcome

This project helped me understand:

- Network intrusion detection concepts
- Suricata IDS log structure
- `eve.json` alert parsing
- Network attack classification
- Severity mapping
- Risk scoring
- Response recommendation logic
- React dashboard development
- Flask API integration
- Real IDS tool integration
- Cybersecurity portfolio project development

---

## Resume Highlight

```text
Built NetShield IDS, a network intrusion detection dashboard using Suricata, Python Flask, and React to analyze IDS logs, classify attack severity, visualize threats, recommend response actions, and export incident reports.
```

---

## LinkedIn Project Summary

```text
I built NetShield IDS, a Network Intrusion Detection Dashboard that analyzes Suricata IDS alerts and visualizes network threats in a cyber command center interface.

The project includes alert parsing, severity classification, risk scoring, suspicious IP detection, response recommendations, and exportable incident reports.
```

---

## Author

**JANAVANTH R**

Cybersecurity Enthusiast | AI & ML Student  
Interested in Secure Coding, Ethical Hacking, Network Security, and AI-based Security Tools

---

## License

This project is created for educational and portfolio purposes.