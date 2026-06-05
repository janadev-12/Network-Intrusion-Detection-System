const API_BASE_URL = "http://localhost:5000";

export const getSummary = async () => {
  const response = await fetch(`${API_BASE_URL}/api/summary`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch summary");
  }

  return data.summary;
};

export const getAlerts = async () => {
  const response = await fetch(`${API_BASE_URL}/api/alerts`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch alerts");
  }

  return data.alerts;
};

export const getBlockedIPs = async () => {
  const response = await fetch(`${API_BASE_URL}/api/blocked-ips`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch blocked IPs");
  }

  return {
    blocked_ips: data.blocked_ips || [],
    actions: data.actions || []
  };
};

export const getReport = async () => {
  const response = await fetch(`${API_BASE_URL}/api/report`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch report");
  }

  return data.report;
};