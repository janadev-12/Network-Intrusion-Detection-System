import React from "react";

function AlertCard({ title, value, subtitle, tone = "neutral" }) {
  return (
    <div className={`metric-card ${tone}`}>
      <div className="metric-card-header">
        <span>{title}</span>
      </div>

      <div className="metric-value">{value}</div>
      <div className="metric-subtitle">{subtitle}</div>
    </div>
  );
}

export default AlertCard;