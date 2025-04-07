import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Mock data - replace with API calls in production
  const stats = {
    todaySales: {
      amount: '2,450.00 €',
      percentage: '+12.5%',
      isPositive: true
    },
    fuelStock: {
      amount: '15,000 L',
      percentage: '-8.3%',
      isPositive: false
    },
    monthlyRevenue: {
      amount: '45,680.00 €',
      percentage: '+23.1%',
      isPositive: true
    },
    activeCustomers: {
      amount: '245',
      percentage: '+4.75%',
      isPositive: true
    }
  };

  const recentSales = [
    { id: 1, fuel: 'Diesel', quantity: '50L', amount: '89.50 €', date: '2023-08-15 14:30' },
    { id: 2, fuel: 'Sans Plomb 95', quantity: '35L', amount: '75.25 €', date: '2023-08-15 14:15' },
    { id: 3, fuel: 'Sans Plomb 98', quantity: '40L', amount: '92.00 €', date: '2023-08-15 14:00' },
  ];

  const lowStockAlerts = [
    { id: 1, fuel: 'Diesel', currentStock: '1,500L', threshold: '2,000L' },
    { id: 2, fuel: 'Sans Plomb 95', currentStock: '1,200L', threshold: '1,500L' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <i className="fas fa-download mr-2"></i>
            Exporter
          </button>
          <Link to="/reports" className="btn-primary">
            <i className="fas fa-chart-line mr-2"></i>
            Voir les rapports
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(stats).map(([key, stat]) => (
          <div key={key} className="card">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {key === 'todaySales' && 'Ventes du jour'}
                  {key === 'fuelStock' && 'Stock carburant'}
                  {key === 'monthlyRevenue' && 'Revenu mensuel'}
                  {key === 'activeCustomers' && 'Clients actifs'}
                </p>
                <p className="mt-2 text-2xl font-semibold text-gray-900">{stat.amount}</p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                stat.isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {stat.percentage}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Ventes récentes</h2>
            <Link to="/sales" className="text-sm text-primary-600 hover:text-primary-700">
              Voir tout
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Carburant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Quantité
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Montant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentSales.map((sale) => (
                  <tr key={sale.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {sale.fuel}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sale.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sale.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sale.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Alertes de stock bas</h2>
            <Link to="/fuels" className="text-sm text-primary-600 hover:text-primary-700">
              Gérer les stocks
            </Link>
          </div>
          <div className="space-y-4">
            {lowStockAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <div>
                  <h3 className="text-sm font-medium text-red-800">{alert.fuel}</h3>
                  <p className="mt-1 text-sm text-red-600">
                    Stock actuel: {alert.currentStock} / Seuil: {alert.threshold}
                  </p>
                </div>
                <Link
                  to="/fuels"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                >
                  Commander
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;