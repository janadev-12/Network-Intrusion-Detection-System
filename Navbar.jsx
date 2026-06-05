import React from "react";

function Navbar({ engine = "Suricata Log Analyzer", live = true }) {
  return (
    <header className="topbar">
      <div className="brand-wrap">
        <div className="brand-logo">
          <img src="/shield-logo.png" alt="NetShield IDS" />
        </div>

        <div className="brand-text">
          <h2>NetShield IDS</h2>
          <p>Cyber Command Center • Intrusion Monitoring</p>
        </div>
      </div>

      <div className="topbar-actions">
        <div className={`engine-badge ${live ? "live" : ""}`}>
          <span className="status-dot"></span>
          <span>{engine}</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;