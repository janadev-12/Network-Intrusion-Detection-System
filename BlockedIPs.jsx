import React from "react";

function BlockedIPs({ items = [] }) {
  if (!items.length) {
    return (
      <div className="empty-panel">
        <p>No response recommendations available.</p>
      </div>
    );
  }

  return (
    <div className="response-list">
      {items.map((item, index) => (
        <div
          key={`${item.ip}-${index}`}
          className={`response-item ${item.severity.toLowerCase()}`}
        >
          <div className="response-top">
            <div>
              <h4>{item.ip}</h4>
              <p>{item.action}</p>
            </div>

            <span className={`severity-pill ${item.severity.toLowerCase()}`}>
              {item.severity}
            </span>
          </div>

          <div className="response-reason">{item.reason}</div>
        </div>
      ))}
    </div>
  );
}

export default BlockedIPs;