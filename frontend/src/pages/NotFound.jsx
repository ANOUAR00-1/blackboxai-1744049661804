import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <i className="fas fa-exclamation-triangle text-6xl text-primary-600"></i>
        </div>

        {/* Error Message */}
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page non trouvée
        </h2>
        <p className="text-gray-500 mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        {/* Navigation Buttons */}
        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="btn-primary inline-flex items-center justify-center w-full"
          >
            <i className="fas fa-home mr-2"></i>
            Retour au tableau de bord
          </Link>
          
          <Link
            to="/sales"
            className="btn-secondary inline-flex items-center justify-center w-full"
          >
            <i className="fas fa-shopping-cart mr-2"></i>
            Voir les ventes
          </Link>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-sm text-gray-500">
          Si vous pensez qu'il s'agit d'une erreur, veuillez contacter le support technique.
        </p>
      </div>
    </div>
  );
};

export default NotFound;