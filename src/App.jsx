import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import useWebSocket from "./hooks/useWebSocket";
import { useEffect } from "react";
// import ProtectedRoute from "./routes/ProtectedRoute";

function PrivateRoute({ children }) {
  const user = useSelector((state) => state.auth.user); // Check if user is logged in
  return user ? children : <Navigate to="/login" />;
}

function App() {
  const cameraMode = useSelector((state) => state.appSettings.cameraMode);
  const user = useSelector((state) => state.auth.user);
const {connect ,disconnect,messages} = useWebSocket()
useEffect(() => {
  if (user) {
    connect(); // Connect WebSocket when user logs in
    console.log("here",messages)
  } else {
    disconnect(); // Disconnect WebSocket when user logs out
  }
}, [user]); // React when user state changes
  return (
    <Router>
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route 
        path="/dashboard/*" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } 
      />
      <Route path="*" element={<Navigate to={user ? "/dashboard/home" : "/login"} />} />
    </Routes>

    {/* Show "Test Mode Active" at the bottom of the app */}
    {cameraMode === "test" && (
      <div
        style={{
          position: "fixed",
          bottom: 20,
          right: "0%",
          transform: "translateX(-10%)",
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
  </Router>
  );
}

export default App;
