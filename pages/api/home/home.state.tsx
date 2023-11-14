// Import necessary types from the 'chat', 'error', 'folder', 'openai', 'plugin', and 'prompt' modules.
import { Conversation, Message } from '@/types/chat';
import { ErrorMessage } from '@/types/error';
import { FolderInterface } from '@/types/folder';
import { OpenAIModel, OpenAIModelID } from '@/types/openai';
import { PluginKey } from '@/types/plugin';
import { Prompt } from '@/types/prompt';

// Define the shape of the initial state for the home-related context.
export interface HomeInitialState {
  apiKey: string; // API key for OpenAI
  pluginKeys: PluginKey[]; // List of plugin keys
  loading: boolean; // Loading indicator
  lightMode: 'light' | 'dark'; // UI theme mode
  messageIsStreaming: boolean; // Indicates if messages are streaming
  modelError: ErrorMessage | null; // Error related to OpenAI models
  models: OpenAIModel[]; // List of OpenAI models
  folders: FolderInterface[]; // List of folders
  conversations: Conversation[]; // List of conversations
  selectedConversation: Conversation | undefined; // Currently selected conversation
  currentMessage: Message | undefined; // Currently selected message
  prompts: Prompt[]; //Lists of prompts
  temperature: number; // Temperature setting for model responses
  showChatbar: boolean; // Flag to show/hide the chatbar
  showPromptbar: boolean; // Flag to show/hide the promptbar
  currentFolder: FolderInterface | undefined; //Currently selected folder
  messageError: boolean; // Indicates if there is an error with messages
  searchTerm: string; // Search term for filtering content
  defaultModelId: OpenAIModelID | undefined; // Default OpenAI model ID
  serverSideApiKeyIsSet: boolean; // Indicates if the server-side API key is set
  serverSidePluginKeysSet: boolean; // Indicates if the server-side plugin keys are set
}

// Define the initial state with default values.
export const initialState: HomeInitialState = {
  apiKey: '',
  loading: false,
  pluginKeys: [],
  lightMode: 'dark',
  messageIsStreaming: false,
  modelError: null,
  models: [],
  folders: [],
  conversations: [],
  selectedConversation: undefined,
  currentMessage: undefined,
  prompts: [],
  temperature: 1,
  showPromptbar: true,
  showChatbar: true,
  currentFolder: undefined,
  messageError: false,
  searchTerm: '',
  defaultModelId: undefined,
  serverSideApiKeyIsSet: false,
  serverSidePluginKeysSet: false,
};
