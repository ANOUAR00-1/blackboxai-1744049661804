import React, { useState } from 'react';

const SalesManagement = () => {
  // Mock data - replace with API calls in production
  const [sales, setSales] = useState([
    { 
      id: 1, 
      fuelId: 1,
      fuelName: 'Diesel',
      quantity: 45,
      pricePerLiter: 1.89,
      totalPrice: 85.05,
      date: '2023-08-15 14:30'
    },
    { 
      id: 2,
      fuelId: 2,
      fuelName: 'Sans Plomb 95',
      quantity: 35,
      pricePerLiter: 1.95,
      totalPrice: 68.25,
      date: '2023-08-15 14:15'
    },
    { 
      id: 3,
      fuelId: 3,
      fuelName: 'Sans Plomb 98',
      quantity: 30,
      pricePerLiter: 2.05,
      totalPrice: 61.50,
      date: '2023-08-15 14:00'
    },
  ]);

  const fuels = [
    { id: 1, name: 'Diesel', price: 1.89, stock: 15000 },
    { id: 2, name: 'Sans Plomb 95', price: 1.95, stock: 12000 },
    { id: 3, name: 'Sans Plomb 98', price: 2.05, stock: 8000 },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fuelId: '',
    quantity: ''
  });
  const [error, setError] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setFormData({
      fuelId: '',
      quantity: ''
    });
    setError('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const selectedFuel = fuels.find(f => f.id === parseInt(formData.fuelId));
    if (!selectedFuel) {
      setError('Veuillez sélectionner un carburant');
      return;
    }

    const quantity = parseInt(formData.quantity);
    if (quantity <= 0) {
      setError('La quantité doit être supérieure à 0');
      return;
    }

    if (quantity > selectedFuel.stock) {
      setError('Stock insuffisant');
      return;
    }

    // Calculate total price
    const totalPrice = quantity * selectedFuel.price;

    // Create new sale
    const newSale = {
      id: Date.now(),
      fuelId: selectedFuel.id,
      fuelName: selectedFuel.name,
      quantity,
      pricePerLiter: selectedFuel.price,
      totalPrice,
      date: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };

    // TODO: Replace with actual API call
    setSales([newSale, ...sales]);
    handleCloseModal();
  };

  // Calculate total sales
  const totalSales = sales.reduce((acc, sale) => acc + sale.totalPrice, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des ventes</h1>
        <button
          onClick={handleOpenModal}
          className="btn-primary"
        >
          <i className="fas fa-plus mr-2"></i>
          Nouvelle vente
        </button>
      </div>

      {/* Sales Summary Card */}
      <div className="card bg-primary-50 border border-primary-100">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-primary-900">Total des ventes</h2>
            <p className="text-sm text-primary-600">Aujourd'hui</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary-900">
              {totalSales.toFixed(2)} €
            </p>
            <p className="text-sm text-primary-600">
              {sales.length} transactions
            </p>
          </div>
        </div>
      </div>

      {/* Sales Table */}
      <div className="card">
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
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sale.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {sale.fuelName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sale.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sale.pricePerLiter.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {sale.totalPrice.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Sale Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Nouvelle vente
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="px-6 py-4 space-y-4">
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Carburant
                  </label>
                  <select
                    value={formData.fuelId}
                    onChange={(e) => setFormData({ ...formData, fuelId: e.target.value })}
                    className="input-field mt-1"
                    required
                  >
                    <option value="">Sélectionnez un carburant</option>
                    {fuels.map(fuel => (
                      <option key={fuel.id} value={fuel.id}>
                        {fuel.name} - {fuel.price.toFixed(2)} €/L
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Quantité (L)
                  </label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="input-field mt-1"
                    min="1"
                    required
                  />
                </div>
                {formData.fuelId && formData.quantity && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Aperçu
                    </h4>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Prix unitaire:</span>
                      <span className="font-medium">
                        {fuels.find(f => f.id === parseInt(formData.fuelId))?.price.toFixed(2)} €/L
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-600">Total:</span>
                      <span className="font-medium">
                        {(
                          fuels.find(f => f.id === parseInt(formData.fuelId))?.price * 
                          parseFloat(formData.quantity)
                        ).toFixed(2)} €
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="btn-secondary"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Enregistrer la vente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesManagement;