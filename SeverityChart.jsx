import React from "react";

function SeverityChart({ data = [] }) {
  const maxCount = Math.max(...data.map((item) => item.count), 1);

  return (
    <div className="chart-list">
      {data.map((item) => (
        <div key={item.label} className="chart-row">
          <div className="chart-top">
            <span className="chart-label">{item.label}</span>
            <span className="chart-value">{item.count}</span>
          </div>

          <div className="bar-track">
            <div
              className={`bar-fill ${item.label.toLowerCase()}`}
              style={{ width: `${(item.count / maxCount) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SeverityChart;