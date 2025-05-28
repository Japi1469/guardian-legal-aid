import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Scale, BookOpen, HelpCircle } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Scale className="h-8 w-8 text-indigo-700" />
            <span className="text-2xl font-bold text-slate-800">Guardian</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink to="/" label="Home" current={location.pathname === '/'} />
            <NavLink to="/about" label="About" current={location.pathname === '/about'} />
            <NavLink to="/resources" label="Resources" current={location.pathname === '/resources'} />
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-800 focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavLink to="/" label="Home" icon={<HelpCircle className="h-5 w-5" />} />
            <MobileNavLink to="/about" label="About" icon={<BookOpen className="h-5 w-5" />} />
            <MobileNavLink to="/resources" label="Resources" icon={<Scale className="h-5 w-5" />} />
          </div>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ to, label, current }: { to: string; label: string; current: boolean }) => (
  <Link 
    to={to} 
    className={`text-base font-medium transition-colors hover:text-indigo-700 ${
      current ? 'text-indigo-700' : 'text-slate-700'
    }`}
  >
    {label}
  </Link>
);

const MobileNavLink = ({ to, label, icon }: { to: string; label: string; icon: React.ReactNode }) => (
  <Link to={to} className="flex items-center space-x-3 px-2 py-3 rounded-lg hover:bg-slate-100">
    <span className="text-indigo-700">{icon}</span>
    <span className="text-slate-700 font-medium">{label}</span>
  </Link>
);

export default Header;