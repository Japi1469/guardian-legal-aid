import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, HelpCircle, MessageSquare, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLegalQueries } from '../hooks/useLegalQueries';
import ChatMessage from '../components/chat/ChatMessage';
import SuggestedQuestions from '../components/chat/SuggestedQuestions';
import LegalCategories from '../components/home/LegalCategories';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { 
    messages, 
    isLoading, 
    sendMessage, 
    clearMessages,
    errorMessage
  } = useLegalQueries();

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() === '') return;
    
    sendMessage(query);
    setQuery('');
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Your Personal Legal Assistant
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Get clear answers to your legal questions using cutting-edge AI technology
            backed by comprehensive legal resources.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          {/* Chat container */}
          <div 
            ref={chatContainerRef}
            className="h-[400px] md:h-[500px] overflow-y-auto p-4 space-y-4"
          >
            <AnimatePresence>
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <Sparkles className="h-12 w-12 text-indigo-500 mb-4" />
                  <h2 className="text-xl font-semibold text-slate-700 mb-2">
                    How can I help with your legal questions?
                  </h2>
                  <p className="text-slate-500 max-w-md">
                    Ask me about landlord-tenant issues, small claims, family law, 
                    consumer rights, and more.
                  </p>
                </motion.div>
              ) : (
                messages.map((message, index) => (
                  <ChatMessage 
                    key={index} 
                    message={message} 
                    isLast={index === messages.length - 1 && isLoading}
                  />
                ))
              )}
              
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-red-50 text-red-700 text-center"
                >
                  {errorMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input area */}
          <div className="border-t border-slate-200 p-4">
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask your legal question..."
                className="flex-grow px-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || query.trim() === ''}
                className={`p-2 rounded-full ${
                  isLoading || query.trim() === '' 
                    ? 'bg-slate-300 text-slate-500' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                } transition-colors`}
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
            
            {showSuggestions && messages.length === 0 && (
              <SuggestedQuestions onSuggestionClick={handleSuggestionClick} />
            )}
          </div>
        </div>

        {/* Legal Categories Section */}
        <LegalCategories />
      </div>
    </div>
  );
};

export default HomePage;