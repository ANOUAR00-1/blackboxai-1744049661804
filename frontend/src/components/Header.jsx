import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo and Title */}
        <div className="flex items-center">
          <i className="fas fa-gas-pump text-primary-600 text-2xl mr-3"></i>
          <h1 className="text-xl font-semibold text-gray-800">
            Station-Service
          </h1>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 text-gray-500 hover:text-gray-700 relative">
            <i className="fas fa-bell"></i>
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User menu */}
          <div className="relative">
            <button className="flex items-center space-x-3 text-gray-700 hover:text-gray-900">
              <img
                src="https://ui-avatars.com/api/?name=Admin&background=0EA5E9&color=fff"
                alt="User"
                className="h-8 w-8 rounded-full"
              />
              <span className="hidden md:block font-medium">Admin</span>
            </button>
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-gray-700"
            title="Déconnexion"
          >
            <i className="fas fa-sign-out-alt text-xl"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;