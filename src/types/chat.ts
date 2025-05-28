export interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: {
    title: string;
    url: string;
  }[];
}