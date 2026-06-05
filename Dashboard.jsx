import React, { useEffect, useState } from "react";
import {
  getSummary,
  getAlerts,
  getBlockedIPs,
  getReport
} from "../services/idsService.js";

function Dashboard() {
  const [summary, setSummary] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [blockedIPs, setBlockedIPs] = useState([]);
  const [actions, setActions] = useState([]);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const summaryData = await getSummary();
      const alertData = await getAlerts();
      const responseData = await getBlockedIPs();
      const reportData = await getReport();

      setSummary(summaryData);
      setAlerts(alertData);
      setBlockedIPs(responseData.blocked_ips || []);
      setActions(responseData.actions || []);
      setReport(reportData);
    } catch (err) {
      setError("Backend connection failed. Run Flask backend on http://localhost:5000");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  const exportReport = () => {
    if (!report) return;

    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "netshield-ids-report.json";
    link.click();

    URL.revokeObjectURL(url);
  };

  const attackTypes = Object.entries(summary.attack_types || {});
  const maxAttack = Math.max(...attackTypes.map((item) => item[1]), 1);

  const severityData = [
    { label: "High", value: summary.high || 0, className: "high" },
    { label: "Medium", value: summary.medium || 0, className: "medium" },
    { label: "Low", value: summary.low || 0, className: "low" }
  ];

  const maxSeverity = Math.max(...severityData.map((item) => item.value), 1);

  return (
    <div className="command-app">
      <div className="scan-lines"></div>
      <div className="cyber-grid"></div>

      <aside className="side-nav">
        <div className="side-logo">
          <span>🛡️</span>
        </div>

        <div className="side-brand">
          <h2>NetShield</h2>
          <p>IDS Command</p>
        </div>

        <div className="nav-menu">
          <button className="active" onClick={() => scrollToSection("overview")}>
            Overview
          </button>

          <button onClick={() => scrollToSection("live-alerts")}>
            Live Alerts
          </button>

          <button onClick={() => scrollToSection("attack-radar")}>
            Attack Radar
          </button>

          <button onClick={() => scrollToSection("response")}>
            Response
          </button>

          <button onClick={exportReport}>
            Reports
          </button>
        </div>

        <div className="system-box">
          <p>Engine</p>
          <h4>Suricata IDS</h4>
          <small>Log Analyzer Active</small>
        </div>
      </aside>

      <main className="main-command">
        <header className="top-command">
          <div>
            <p className="eyebrow">Task 4 • Network Intrusion Detection System</p>
            <h1>Cyber Command Center</h1>
            <span>
              Network threat monitoring, alert analysis, and response intelligence.
            </span>
          </div>

          <div className="top-actions">
            <div className="live-badge">
              <span></span>
              Live Monitoring
            </div>

            <button onClick={loadDashboard}>Refresh</button>
            <button className="ghost-btn" onClick={exportReport}>
              Export
            </button>
          </div>
        </header>

        {error && <div className="error-banner">{error}</div>}

        {loading ? (
          <section className="loading-screen">
            <div className="radar-loader"></div>
            <h2>Loading IDS Intelligence...</h2>
            <p>Parsing Suricata alert logs and building dashboard.</p>
          </section>
        ) : (
          <>
            <section className="metric-strip" id="overview">
              <div className="metric-card cyan">
                <p>Total Alerts</p>
                <h2>{summary.total_alerts || 0}</h2>
                <span>IDS events detected</span>
              </div>

              <div className="metric-card red">
                <p>High Severity</p>
                <h2>{summary.high || 0}</h2>
                <span>Critical attack signals</span>
              </div>

              <div className="metric-card yellow">
                <p>Risk Score</p>
                <h2>{summary.risk_score || 0}/100</h2>
                <span>Risk Level: {summary.risk_level || "Safe"}</span>
              </div>

              <div className="metric-card green">
                <p>Blocked IPs</p>
                <h2>{blockedIPs.length}</h2>
                <span>Response recommendations</span>
              </div>
            </section>

            <section className="command-layout">
              <div className="left-zone">
                <div className="panel terminal-panel" id="live-alerts">
                  <div className="panel-head">
                    <div>
                      <h3>Live IDS Alert Terminal</h3>
                      <p>Suricata alert stream converted into threat intelligence</p>
                    </div>
                    <span className="terminal-tag">LIVE FEED</span>
                  </div>

                  <div className="terminal-table-wrap">
                    <table className="terminal-table">
                      <thead>
                        <tr>
                          <th>Time</th>
                          <th>Source</th>
                          <th>Destination</th>
                          <th>Proto</th>
                          <th>Attack</th>
                          <th>Severity</th>
                        </tr>
                      </thead>

                      <tbody>
                        {alerts.map((alert) => (
                          <tr key={alert.id}>
                            <td>{alert.timestamp}</td>
                            <td>
                              {alert.src_ip}:{alert.src_port}
                            </td>
                            <td>
                              {alert.dest_ip}:{alert.dest_port}
                            </td>
                            <td>{alert.protocol}</td>
                            <td>{alert.attack_type}</td>
                            <td>
                              <span className={`pill ${alert.severity.toLowerCase()}`}>
                                {alert.severity}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="panel">
                  <div className="panel-head">
                    <div>
                      <h3>Attack Pattern Analysis</h3>
                      <p>Detected attack categories from IDS signatures</p>
                    </div>
                  </div>

                  <div className="attack-bars">
                    {attackTypes.map(([type, count]) => (
                      <div className="attack-row" key={type}>
                        <div>
                          <span>{type}</span>
                          <strong>{count}</strong>
                        </div>

                        <div className="bar-track">
                          <div
                            className="bar-fill blue"
                            style={{ width: `${(count / maxAttack) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="center-zone">
                <div className="panel radar-panel" id="attack-radar">
                  <div className="panel-head center">
                    <div>
                      <h3>Threat Radar</h3>
                      <p>Network activity surveillance</p>
                    </div>
                  </div>

                  <div className="radar">
                    <div className="radar-circle circle-1"></div>
                    <div className="radar-circle circle-2"></div>
                    <div className="radar-circle circle-3"></div>
                    <div className="radar-line"></div>
                    <div className="radar-dot dot-1"></div>
                    <div className="radar-dot dot-2"></div>
                    <div className="radar-dot dot-3"></div>

                    <div className="radar-core">
                      <h2>{summary.risk_score || 0}</h2>
                      <span>Risk</span>
                    </div>
                  </div>

                  <div className="severity-box">
                    {severityData.map((item) => (
                      <div className="severity-row" key={item.label}>
                        <div>
                          <span>{item.label}</span>
                          <strong>{item.value}</strong>
                        </div>

                        <div className="bar-track">
                          <div
                            className={`bar-fill ${item.className}`}
                            style={{ width: `${(item.value / maxSeverity) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="panel mini-stats">
                  <div>
                    <p>Top Attacker</p>
                    <h3>{Object.keys(summary.top_attackers || {})[0] || "N/A"}</h3>
                  </div>

                  <div>
                    <p>Threat Level</p>
                    <h3>{summary.risk_level || "Safe"}</h3>
                  </div>
                </div>
              </div>

              <div className="right-zone">
                <div className="panel response-panel" id="response">
                  <div className="panel-head">
                    <div>
                      <h3>Response Engine</h3>
                      <p>Block / monitor recommendations</p>
                    </div>
                  </div>

                  <div className="blocked-grid">
                    {blockedIPs.map((ip) => (
                      <div className="blocked-tile" key={ip}>
                        <span>🚫</span>
                        <div>
                          <h4>{ip}</h4>
                          <p>Recommended Block</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="action-list">
                    {actions.map((action, index) => (
                      <div className="action-card" key={`${action.src_ip}-${index}`}>
                        <h4>{action.src_ip}</h4>
                        <strong>{action.action}</strong>
                        <p>{action.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;