import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/main.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Frontend error:", error);
    console.error("Error details:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.errorPage}>
          <div style={styles.errorBox}>
            <h1>⚠️ NetShield IDS UI Error</h1>
            <p>
              Something went wrong in the frontend. Check the browser console
              or restart the frontend server.
            </p>
            <button
              style={styles.button}
              onClick={() => window.location.reload()}
            >
              Reload Dashboard
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  errorPage: {
    minHeight: "100vh",
    background: "#020712",
    color: "#eaf8ff",
    display: "grid",
    placeItems: "center",
    padding: "20px",
    fontFamily: "Inter, Segoe UI, Arial, sans-serif"
  },
  errorBox: {
    maxWidth: "560px",
    padding: "30px",
    borderRadius: "22px",
    background: "rgba(7, 20, 35, 0.92)",
    border: "1px solid rgba(255, 91, 120, 0.35)",
    boxShadow: "0 22px 55px rgba(0,0,0,0.35)",
    textAlign: "center"
  },
  button: {
    marginTop: "18px",
    padding: "12px 18px",
    borderRadius: "12px",
    border: "none",
    background: "#58ffb4",
    color: "#03100b",
    fontWeight: "900",
    cursor: "pointer"
  }
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);