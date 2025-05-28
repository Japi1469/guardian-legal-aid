import { legalResources } from '../data/legalResources';
import type { Message } from '../types/chat';

const generateResponse = (query: string): Message => {
  const isCanadian = query.toLowerCase().includes('canada') || 
                    query.toLowerCase().includes('ontario') || 
                    query.toLowerCase().includes('provincial');
  
  const jurisdiction = isCanadian ? 'Canada' : 'US';
  
  // Filter resources by jurisdiction and find relevant ones
  const relevantResources = legalResources
    .filter(resource => resource.jurisdiction === jurisdiction)
    .filter(resource => {
      const searchTerms = query.toLowerCase().split(' ');
      const content = resource.content.toLowerCase();
      return searchTerms.some(term => content.includes(term));
    });

  let response: string;
  let sources = relevantResources.map(({ title, url }) => ({ title, url }));

  if (relevantResources.length > 0) {
    response = `Based on your query about ${query}, here's what I found:\n\n`;
    relevantResources.forEach(resource => {
      response += `${resource.content}\n\n`;
    });
    response += `For more detailed information, please check the provided sources.`;
  } else {
    response = `I apologize, but I couldn't find specific information about "${query}". Consider:\n\n` +
               `1. Rephrasing your question\n` +
               `2. Consulting with a legal professional\n` +
               `3. Checking government legal resources\n\n` +
               `Remember that this is general information and not legal advice.`;
    sources = [];
  }

  return {
    role: 'assistant',
    content: response,
    sources
  };
};

export const processQuery = async (query: string): Promise<Message> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return generateResponse(query);
}; 