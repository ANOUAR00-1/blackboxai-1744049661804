import React, { useState } from 'react';

const FuelManagement = () => {
  // Mock data - replace with API calls in production
  const [fuels, setFuels] = useState([
    { id: 1, name: 'Diesel', price: '1.89', stock: 15000, threshold: 2000 },
    { id: 2, name: 'Sans Plomb 95', price: '1.95', stock: 12000, threshold: 1500 },
    { id: 3, name: 'Sans Plomb 98', price: '2.05', stock: 8000, threshold: 1500 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFuel, setEditingFuel] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    threshold: ''
  });

  const handleOpenModal = (fuel = null) => {
    if (fuel) {
      setEditingFuel(fuel);
      setFormData({
        name: fuel.name,
        price: fuel.price,
        stock: fuel.stock,
        threshold: fuel.threshold
      });
    } else {
      setEditingFuel(null);
      setFormData({
        name: '',
        price: '',
        stock: '',
        threshold: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFuel(null);
    setFormData({
      name: '',
      price: '',
      stock: '',
      threshold: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace with actual API call
    if (editingFuel) {
      setFuels(fuels.map(fuel => 
        fuel.id === editingFuel.id 
          ? { ...fuel, ...formData }
          : fuel
      ));
    } else {
      setFuels([...fuels, { id: Date.now(), ...formData }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    // TODO: Replace with actual API call
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce carburant ?')) {
      setFuels(fuels.filter(fuel => fuel.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des carburants</h1>
        <button
          onClick={() => handleOpenModal()}
          className="btn-primary"
        >
          <i className="fas fa-plus mr-2"></i>
          Ajouter un carburant
        </button>
      </div>

      {/* Fuels Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Prix (€/L)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Stock (L)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Seuil d'alerte
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Statut
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {fuels.map((fuel) => (
                <tr key={fuel.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {fuel.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {fuel.price} €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {fuel.stock.toLocaleString()} L
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {fuel.threshold.toLocaleString()} L
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      fuel.stock > fuel.threshold
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {fuel.stock > fuel.threshold ? 'Normal' : 'Stock bas'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleOpenModal(fuel)}
                      className="text-primary-600 hover:text-primary-900 mr-4"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(fuel.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {editingFuel ? 'Modifier le carburant' : 'Ajouter un carburant'}
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="px-6 py-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Prix (€/L)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="input-field mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Stock (L)
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="input-field mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Seuil d'alerte (L)
                  </label>
                  <input
                    type="number"
                    value={formData.threshold}
                    onChange={(e) => setFormData({ ...formData, threshold: e.target.value })}
                    className="input-field mt-1"
                    required
                  />
                </div>
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
                  {editingFuel ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FuelManagement;