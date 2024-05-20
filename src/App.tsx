import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/Navbar';
import Login from './components/auth/Login';
import Incidents from './components/incidents/Incidents';
import Dashboard from './components/dashboard/Dashboard';
import useAuth from './hooks/useAuth';
import { Container } from '@mui/material';

const App: React.FC = () => {
  const { loggedIn, logout } = useAuth();

  return (
    <Router>
      <div>
        <NavBar onLogout={logout} />
        <Container>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/incidents"
              element={loggedIn ? <Incidents /> : <Navigate to="/login" />}
            />
            <Route
              path="/dashboard"
              element={loggedIn ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/"
              element={<Navigate to={loggedIn ? "/dashboard" : "/login"} />}
            />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;
