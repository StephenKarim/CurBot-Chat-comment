// Importing the OpenAIModel type from the 'openai' module
import { OpenAIModel } from './openai';

// Defining the Role type as a union of 'assistant' and 'user'
export type Role = 'assistant' | 'user';

// Defining the Message interface with role and content properties
export interface Message {
  role: Role; // Role of the message (either 'assistant' or 'user')
  content: string; // Content of the message
}

// Defining the ChatBody interface with model, messages, key, prompt, and temperature properties
export interface ChatBody {
  model: OpenAIModel; // OpenAIModel associated with the chat body
  messages: Message[]; // Array of messages in the chat body
  key: string; // Unique key for the chat body
  prompt: string; // Prompt used in the chat body
  temperature: number; // Temperature setting for generating responses
}

// Defining the Conversation interface with id, name, messages, model, prompt, temperature, and folderId properties
export interface Conversation {
  id: string; // Unique identifier for the conversation
  name: string; // Name of the conversation
  messages: Message[]; // Array of messages in the conversation
  model: OpenAIModel; // OpenAIModel associated with the conversation
  prompt: string; // Prompt used in the conversation
  temperature: number; // Temperature setting for generating responses
  folderId: string | null; // Identifier for the folder containing the conversation, or null if not in a folder
}

