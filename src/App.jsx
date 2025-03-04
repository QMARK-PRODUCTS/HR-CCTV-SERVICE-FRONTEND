import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const cameraMode = useSelector((state) => state.appSettings.cameraMode);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/dashboard/*" element={<Dashboard />} />
          {/* Redirect to /dashboard/home when app starts */}
          <Route path="*" element={<Navigate to="/dashboard/home" />} />
        </Routes>
      </Router>

      {/* Show "Test Mode Active" at the bottom of the app */}
      {cameraMode === "test" && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: "0%",
            transform: "translateX(-50%)",
            backgroundColor: "red",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          Test Mode Active
        </div>
      )}
    </>
  );
}

export default App;
