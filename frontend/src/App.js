import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import FuelManagement from './pages/FuelManagement';
import SalesManagement from './pages/SalesManagement';
import Reports from './pages/Reports';
import NotFound from './pages/NotFound';

function App() {
  // Simple auth check - in real app, this would check JWT token
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  // Protected Route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="fuels" element={<FuelManagement />} />
        <Route path="sales" element={<SalesManagement />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;