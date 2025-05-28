import React, { useState } from 'react';
import { Search, ExternalLink, FileText, Download, BookOpen } from 'lucide-react';

const ResourcesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'guides', name: 'Legal Guides' },
    { id: 'forms', name: 'Forms & Documents' },
    { id: 'websites', name: 'Official Websites' },
    { id: 'organizations', name: 'Organizations' },
  ];
  
  const resources = [
    {
      id: 1,
      title: 'Tenant Rights Handbook',
      description: 'Comprehensive guide to landlord-tenant laws and housing regulations.',
      type: 'guides',
      url: '#',
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: 2,
      title: 'Small Claims Court Forms',
      description: 'Standard forms required for filing a small claims case.',
      type: 'forms',
      url: '#',
      icon: <Download className="h-5 w-5" />,
    },
    {
      id: 3,
      title: 'U.S. Courts Official Website',
      description: 'Information on federal courts, procedures, and services.',
      type: 'websites',
      url: 'https://www.uscourts.gov',
      icon: <ExternalLink className="h-5 w-5" />,
    },
    {
      id: 4,
      title: 'Legal Aid Society',
      description: 'Nonprofit organization providing free legal services to low-income individuals.',
      type: 'organizations',
      url: '#',
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      id: 5,
      title: 'Consumer Protection Guide',
      description: 'Information on consumer rights, fraud prevention, and remedies.',
      type: 'guides',
      url: '#',
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: 6,
      title: 'Divorce Petition Template',
      description: 'Standard forms and instructions for filing for divorce.',
      type: 'forms',
      url: '#',
      icon: <Download className="h-5 w-5" />,
    },
    {
      id: 7,
      title: 'Employment Rights Handbook',
      description: 'Guide to workplace laws, discrimination, and fair labor standards.',
      type: 'guides',
      url: '#',
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: 8,
      title: 'American Bar Association',
      description: 'Professional organization offering legal information and attorney referrals.',
      type: 'organizations',
      url: 'https://www.americanbar.org',
      icon: <ExternalLink className="h-5 w-5" />,
    },
  ];
  
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === null || activeCategory === 'all' || resource.type === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Legal Resources
          </h1>
          <p className="text-slate-600">
            Access guides, forms, and official websites to help with your legal needs
          </p>
        </div>
        
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources..."
              className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id === 'all' ? null : category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  (category.id === 'all' && activeCategory === null) || category.id === activeCategory
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                } transition-colors`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-slate-600">No resources found matching your search criteria.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setActiveCategory(null);
              }}
              className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Reset filters
            </button>
          </div>
        )}
        
        {/* Disclaimer */}
        <div className="mt-12 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-slate-600 text-sm">
            <strong>Note:</strong> These resources are provided for informational purposes only. Guardian does not endorse or guarantee the accuracy or quality of any external resources. Always verify information through official channels.
          </p>
        </div>
      </div>
    </div>
  );
};

interface ResourceCardProps {
  resource: {
    id: number;
    title: string;
    description: string;
    type: string;
    url: string;
    icon: React.ReactNode;
  };
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  return (
    <a 
      href={resource.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow-sm hover:shadow-md border border-slate-100 overflow-hidden transition-shadow"
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 p-2 rounded-lg bg-indigo-100 text-indigo-600">
            {resource.icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-slate-800 mb-1 group-hover:text-indigo-600">
              {resource.title}
            </h3>
            <p className="text-slate-600 text-sm">
              {resource.description}
            </p>
            <div className="mt-3 flex items-center text-sm text-indigo-600">
              <span>Access resource</span>
              <ExternalLink className="h-4 w-4 ml-1" />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ResourcesPage;