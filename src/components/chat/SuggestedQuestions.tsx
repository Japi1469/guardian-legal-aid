import React from 'react';
import { HelpCircle } from 'lucide-react';

interface SuggestedQuestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ onSuggestionClick }) => {
  const suggestions = [
    "What are my tenant rights in Canada?",
    "How do I file for divorce in the US?",
    "What's the small claims limit in Ontario?",
    "Can my employer fire me without cause in California?",
    "How do I dispute a debt collection in Canada?",
    "What should I do after a car accident in New York?"
  ];

  return (
    <div className="mt-4">
      <p className="text-sm text-slate-500 mb-2 flex items-center">
        <HelpCircle className="h-4 w-4 mr-1" />
        <span>Try asking one of these questions:</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;