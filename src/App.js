import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/dashboard/*" element={<Dashboard />} />
          {/* Redirect to /dashboard/home when app starts */}
          <Route path="*" element={<Navigate to="/dashboard/home" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;