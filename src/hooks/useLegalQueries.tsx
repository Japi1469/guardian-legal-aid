import { useState, useEffect } from 'react';
import { Message } from '../types/chat';
import { processQuery } from '../utils/chatUtils';

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
      const response = await processQuery(content);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error('Error processing message:', error);
      setErrorMessage('Sorry, there was a problem processing your query. Please try again.');
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