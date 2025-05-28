import React from 'react';
import { Scale, Shield, BookOpen, Coffee } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            About Guardian
          </h1>
          <p className="text-slate-600">
            Making legal assistance accessible to everyone through technology
          </p>
        </div>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Our Mission</h2>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
            <p className="text-slate-700 leading-relaxed">
              Guardian was created with a simple yet powerful mission: to bridge the gap between complex legal systems and everyday people. We believe that legal assistance should be accessible to everyone, regardless of their background or resources.
            </p>
            <p className="text-slate-700 leading-relaxed mt-4">
              By leveraging technology and artificial intelligence, we provide quick, reliable answers to common legal questions, helping individuals understand their rights and navigate legal challenges with confidence.
            </p>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">How Guardian Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard
              icon={<BookOpen className="h-8 w-8" />}
              title="Comprehensive Knowledge Base"
              description="Guardian draws from a vast database of legal resources, statutes, case law, and expert interpretations to provide accurate information."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Privacy & Security"
              description="Your questions and information are treated with the utmost confidentiality, and we employ strong security measures to protect your data."
            />
            <FeatureCard
              icon={<Scale className="h-8 w-8" />}
              title="Legal Clarity"
              description="We translate complex legal jargon into clear, understandable language to help you make informed decisions."
            />
            <FeatureCard
              icon={<Coffee className="h-8 w-8" />}
              title="Continuous Learning"
              description="Our system continuously improves through machine learning and regular updates to legal information and precedents."
            />
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Important Disclaimer</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <p className="text-amber-800 text-sm leading-relaxed">
              <strong>Guardian provides legal information, not legal advice.</strong> The information provided through our service is for educational and informational purposes only and is not a substitute for professional legal advice. 
            </p>
            <p className="text-amber-800 text-sm leading-relaxed mt-3">
              While we strive for accuracy, we cannot guarantee that the information is always up-to-date or applicable to your specific situation. For personalized legal advice, please consult with a qualified attorney licensed in your jurisdiction.
            </p>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Our Team</h2>
          <p className="text-slate-700 mb-8">
            Guardian is developed by a passionate team of legal professionals, technologists, and advocates for access to justice. We're committed to democratizing legal knowledge and empowering individuals to understand and exercise their legal rights.
          </p>
          <div className="text-center">
            <button className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
              Join Our Team
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="text-indigo-600 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm">{description}</p>
    </div>
  );
};

export default AboutPage;