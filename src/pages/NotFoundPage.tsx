import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="flex justify-center mb-8">
          <div className="bg-amber-100 p-5 rounded-full">
            <AlertTriangle className="h-16 w-16 text-amber-600" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-slate-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Home className="h-5 w-5 mr-2" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;