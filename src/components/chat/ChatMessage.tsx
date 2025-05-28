import React from 'react';
import { User, Scale } from 'lucide-react';
import { motion } from 'framer-motion';
import { Message } from '../../types/chat';

interface ChatMessageProps {
  message: Message;
  isLast: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLast }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex items-start max-w-[80%] space-x-2`}>
        {/* Avatar */}
        {!isUser && (
          <div className="flex-shrink-0 bg-indigo-100 rounded-full p-2">
            <Scale className="h-5 w-5 text-indigo-700" />
          </div>
        )}
        
        {/* Message content */}
        <div 
          className={`rounded-2xl px-4 py-3 ${
            isUser 
              ? 'bg-indigo-600 text-white rounded-tr-none'
              : 'bg-slate-100 text-slate-800 rounded-tl-none'
          }`}
        >
          {message.content}
          
          {message.sources && message.sources.length > 0 && (
            <div className="mt-2 pt-2 border-t border-slate-200 text-xs text-slate-500">
              <p className="font-medium">Sources:</p>
              <ul className="mt-1 space-y-1">
                {message.sources.map((source, index) => (
                  <li key={index}>
                    <a 
                      href={source.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline"
                    >
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {isLast && message.role === 'assistant' && (
            <div className="mt-1">
              <span className="inline-block w-1 h-1 bg-slate-400 rounded-full animate-pulse"></span>
              <span className="inline-block w-1 h-1 bg-slate-400 rounded-full animate-pulse ml-1" style={{ animationDelay: '0.2s' }}></span>
              <span className="inline-block w-1 h-1 bg-slate-400 rounded-full animate-pulse ml-1" style={{ animationDelay: '0.4s' }}></span>
            </div>
          )}
        </div>
        
        {/* Avatar for user */}
        {isUser && (
          <div className="flex-shrink-0 bg-indigo-600 rounded-full p-2">
            <User className="h-5 w-5 text-white" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;