import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    {
      path: '/dashboard',
      icon: 'fas fa-tachometer-alt',
      label: 'Tableau de bord'
    },
    {
      path: '/fuels',
      icon: 'fas fa-gas-pump',
      label: 'Carburants'
    },
    {
      path: '/sales',
      icon: 'fas fa-shopping-cart',
      label: 'Ventes'
    },
    {
      path: '/reports',
      icon: 'fas fa-chart-bar',
      label: 'Rapports'
    }
  ];

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-sm hidden lg:block">
      <nav className="h-full py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 ${
                    isActive ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-600' : ''
                  }`
                }
              >
                <i className={`${item.icon} w-5 text-center mr-3`}></i>
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Bottom section with system info */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Informations système
            </h3>
            <div className="text-xs text-gray-500 space-y-1">
              <p>Version: 1.0.0</p>
              <p>Dernière mise à jour: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;