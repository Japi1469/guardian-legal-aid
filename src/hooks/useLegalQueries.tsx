import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Message } from '../types/chat';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const useLegalQueries = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem('guardianChatHistory');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error('Failed to parse saved messages', e);
      }
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('guardianChatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = async (content: string) => {
    setMessages(prev => [...prev, { role: 'user', content }]);
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { data, error } = await supabase.functions.invoke('legal-query', {
        body: { query: content }
      });

      if (error) throw error;

      const response: Message = {
        role: 'assistant',
        content: data.answer,
        sources: data.sources,
        actions: data.actions
      };

      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMessage('Sorry, there was a problem connecting to our legal database. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem('guardianChatHistory');
  };

  return {
    messages,
    isLoading,
    errorMessage,
    sendMessage,
    clearMessages
  };
};