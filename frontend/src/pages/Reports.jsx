import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Reports = () => {
  // Mock data - replace with API calls in production
  const [dateRange, setDateRange] = useState('week');
  const [fuelType, setFuelType] = useState('all');

  // Sample data for charts
  const salesData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Ventes (€)',
        data: [2500, 3200, 2800, 3100, 3500, 4200, 3800],
        backgroundColor: 'rgba(14, 165, 233, 0.5)',
        borderColor: 'rgb(14, 165, 233)',
        borderWidth: 1
      }
    ]
  };

  const fuelConsumptionData = {
    labels: ['Diesel', 'Sans Plomb 95', 'Sans Plomb 98'],
    datasets: [
      {
        data: [45, 30, 25],
        backgroundColor: [
          'rgba(14, 165, 233, 0.7)',
          'rgba(34, 197, 94, 0.7)',
          'rgba(168, 85, 247, 0.7)'
        ],
        borderColor: [
          'rgb(14, 165, 233)',
          'rgb(34, 197, 94)',
          'rgb(168, 85, 247)'
        ],
        borderWidth: 1
      }
    ]
  };

  const stockEvolutionData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Diesel',
        data: [15000, 14200, 13500, 15000, 14500, 13800, 13000],
        borderColor: 'rgb(14, 165, 233)',
        tension: 0.1,
        fill: false
      },
      {
        label: 'Sans Plomb 95',
        data: [12000, 11500, 11000, 12000, 11800, 11200, 10800],
        borderColor: 'rgb(34, 197, 94)',
        tension: 0.1,
        fill: false
      },
      {
        label: 'Sans Plomb 98',
        data: [8000, 7800, 7500, 8000, 7800, 7500, 7200],
        borderColor: 'rgb(168, 85, 247)',
        tension: 0.1,
        fill: false
      }
    ]
  };

  // Summary data
  const summary = {
    totalSales: '24,300.00 €',
    averageDaily: '3,471.43 €',
    topFuel: 'Diesel',
    topFuelPercentage: '45%'
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Rapports</h1>
        <button className="btn-primary">
          <i className="fas fa-download mr-2"></i>
          Exporter en PDF
        </button>
      </div>

      {/* Filters */}
      <div className="card flex items-center space-x-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Période
          </label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="input-field"
          >
            <option value="day">Aujourd'hui</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="year">Cette année</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type de carburant
          </label>
          <select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            className="input-field"
          >
            <option value="all">Tous</option>
            <option value="diesel">Diesel</option>
            <option value="sp95">Sans Plomb 95</option>
            <option value="sp98">Sans Plomb 98</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <h3 className="text-sm font-medium text-gray-500">Ventes totales</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{summary.totalSales}</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-500">Moyenne journalière</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{summary.averageDaily}</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-500">Carburant le plus vendu</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{summary.topFuel}</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-500">Part des ventes</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{summary.topFuelPercentage}</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Évolution des ventes</h3>
          <Bar
            data={salesData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: false
                }
              }
            }}
          />
        </div>

        {/* Fuel Consumption Chart */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Répartition des ventes par carburant</h3>
          <div className="aspect-w-16 aspect-h-9">
            <Pie
              data={fuelConsumptionData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Stock Evolution Chart */}
        <div className="card lg:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Évolution des stocks</h3>
          <Line
            data={stockEvolutionData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                }
              },
              scales: {
                y: {
                  beginAtZero: false
                }
              }
            }}
          />
        </div>
      </div>

      {/* Detailed Table */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Détail des ventes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Carburant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Quantité (L)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Prix/L (€)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total (€)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Sample data rows */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2023-08-15
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Diesel
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  45
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  1.89
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  85.05
                </td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;