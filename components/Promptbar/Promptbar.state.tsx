// Importing the Prompt type
import { Prompt } from '@/types/prompt';

// Defining the shape of the initial state for the prompt bar
export interface PromptbarInitialState {
  searchTerm: string;
  filteredPrompts: Prompt[];
}

// Creating the actual initial state object
export const initialState: PromptbarInitialState = {
  searchTerm: '',
  filteredPrompts: [],
};
