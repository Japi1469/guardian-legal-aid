import React from 'react';
import { Scale, Mail, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-slate-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <Scale className="h-7 w-7 text-indigo-400" />
              <span className="text-xl font-bold text-white">Guardian</span>
            </Link>
            <p className="mt-4 text-slate-300 text-sm">
              Empowering access to legal assistance through technology.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/about" label="About" />
              <FooterLink to="/resources" label="Resources" />
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <FooterLink to="/privacy" label="Privacy Policy" />
              <FooterLink to="/terms" label="Terms of Service" />
              <FooterLink to="/disclaimer" label="Legal Disclaimer" />
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <a 
              href="mailto:contact@guardian-legal.com" 
              className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>contact@guardian-legal.com</span>
            </a>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-400">
          <p>
            © {currentYear} Guardian Legal Aid. All rights reserved.
          </p>
          <p className="mt-2 text-xs">
            Guardian provides legal information, not legal advice. For professional legal advice, consult a qualified attorney.
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, label }: { to: string; label: string }) => (
  <li>
    <Link 
      to={to} 
      className="text-slate-300 hover:text-white transition-colors"
    >
      {label}
    </Link>
  </li>
);

export default Footer;