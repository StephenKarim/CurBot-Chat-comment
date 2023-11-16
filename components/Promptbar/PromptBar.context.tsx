// Importing necessary dependencies from React
import { Dispatch, createContext } from 'react';

// Importing types and initial state
import { ActionType } from '@/hooks/useCreateReducer';

import { Prompt } from '@/types/prompt';

import { PromptbarInitialState } from './Promptbar.state';

// Defining the shape of the PromptbarContextProps
export interface PromptbarContextProps {
  state: PromptbarInitialState;
  dispatch: Dispatch<ActionType<PromptbarInitialState>>;
  handleCreatePrompt: () => void;
  handleDeletePrompt: (prompt: Prompt) => void;
  handleUpdatePrompt: (prompt: Prompt) => void;
}

// Creating the PromptbarContext using createContext with an initial value of undefined!
const PromptbarContext = createContext<PromptbarContextProps>(undefined!);

// Exporting the PromptbarContext
export default PromptbarContext;
