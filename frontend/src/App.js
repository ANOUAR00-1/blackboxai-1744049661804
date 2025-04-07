import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
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
    return <>{children}</>;
  };

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

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