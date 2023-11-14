// Importing necessary types
import { Conversation } from '@/types/chat';

// Defining the initial state for the Chatbar
export interface ChatbarInitialState {
  searchTerm: string;
  filteredConversations: Conversation[];
}

// Creating the initial state object
export const initialState: ChatbarInitialState = {
  searchTerm: '',
  filteredConversations: [],
};
