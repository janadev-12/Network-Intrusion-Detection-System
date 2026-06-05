import React from "react";

function AlertTable({ alerts = [] }) {
  if (!alerts.length) {
    return (
      <div className="empty-panel">
        <p>No IDS alerts available.</p>
      </div>
    );
  }

  return (
    <div className="table-shell">
      <table className="alert-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Source IP</th>
            <th>Destination</th>
            <th>Protocol</th>
            <th>Attack Type</th>
            <th>Severity</th>
            <th>Signature</th>
          </tr>
        </thead>

        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.id}>
              <td>{alert.time}</td>
              <td>{alert.source}</td>
              <td>{alert.destination}</td>
              <td>{alert.protocol}</td>
              <td>{alert.attackType}</td>
              <td>
                <span
                  className={`severity-pill ${alert.severity.toLowerCase()}`}
                >
                  {alert.severity}
                </span>
              </td>
              <td>{alert.signature}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AlertTable;