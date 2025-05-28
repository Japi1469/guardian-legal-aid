import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Users, 
  Briefcase, 
  ShoppingCart, 
  Car, 
  File, 
  ArrowRight,
  Globe
} from 'lucide-react';

const categories = [
  {
    id: 'housing',
    name: 'Housing & Real Estate',
    description: 'Tenant rights, evictions, leases, property disputes (US & Canada)',
    icon: <Home className="h-6 w-6" />,
  },
  {
    id: 'family',
    name: 'Family Law',
    description: 'Divorce, custody, support (US & Canadian procedures)',
    icon: <Users className="h-6 w-6" />,
  },
  {
    id: 'employment',
    name: 'Employment',
    description: 'Workplace rights, discrimination, compensation laws',
    icon: <Briefcase className="h-6 w-6" />,
  },
  {
    id: 'consumer',
    name: 'Consumer Rights',
    description: 'Product liability, debt collection, consumer protection',
    icon: <ShoppingCart className="h-6 w-6" />,
  },
  {
    id: 'accidents',
    name: 'Accidents & Injuries',
    description: 'Personal injury, medical malpractice, insurance claims',
    icon: <Car className="h-6 w-6" />,
  },
  {
    id: 'documents',
    name: 'Legal Documents',
    description: 'Wills, power of attorney, contracts (jurisdiction-specific)',
    icon: <File className="h-6 w-6" />,
  },
  {
    id: 'international',
    name: 'Cross-Border Issues',
    description: 'US-Canada legal matters, immigration, trade',
    icon: <Globe className="h-6 w-6" />,
  }
];

const LegalCategories = () => {
  return (
    <section className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">
          Browse by Legal Category
        </h2>
        <p className="text-slate-600 mt-2">
          Explore legal topics for both US and Canadian jurisdictions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
  };
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white rounded-lg shadow-sm hover:shadow-md border border-slate-100 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 p-2 rounded-lg bg-indigo-100 text-indigo-600">
            {category.icon}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-slate-800 mb-1">
              {category.name}
            </h3>
            <p className="text-slate-600 text-sm">
              {category.description}
            </p>
            <button 
              className="mt-4 flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
            >
              <span>Explore topics</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LegalCategories;