// Importing relevant types from other modules
import { Conversation, Message } from './chat';
import { FolderInterface } from './folder';
import { OpenAIModel } from './openai';
import { Prompt } from './prompt';

// Defining a union type for supported export formats
export type SupportedExportFormats =
  | ExportFormatV1
  | ExportFormatV2
  | ExportFormatV3
  | ExportFormatV4;

// Defining a type for the latest export format
export type LatestExportFormat = ExportFormatV4;

////////////////////////////////////////////////////////////////////////////////////////////
// Interface for representing a conversation in Export Format V1
interface ConversationV1 {
  id: number; // Unique identifier for the conversation
  name: string; // Name or title of the conversation
  messages: Message[]; // Array of messages in the conversation
}

// Type definition for Export Format V1
export type ExportFormatV1 = ConversationV1[];

////////////////////////////////////////////////////////////////////////////////////////////
// Interface for representing a chat folder
interface ChatFolder {
  id: number; // Unique identifier for the folder
  name: string; // Name or title of the folder
}

// Interface for Export Format V2
export interface ExportFormatV2 {
  history: Conversation[] | null; // Array of conversations or null in Export Format V2
  folders: ChatFolder[] | null; // Array of chat folders or null in Export Format V2
}

////////////////////////////////////////////////////////////////////////////////////////////
// Interface for Export Format V3
export interface ExportFormatV3 {
  version: 3; // Version number for Export Format V3
  history: Conversation[]; // Array of conversations in Export Format V3
  folders: FolderInterface[]; // Array of folder interfaces in Export Format V3
}

// Interface for Export Format V4
export interface ExportFormatV4 {
  version: 4; // Version number for Export Format V4
  history: Conversation[]; // Array of conversations in Export Format V4
  folders: FolderInterface[]; // Array of folder interfaces in Export Format V4
  prompts: Prompt[]; // Array of prompts in Export Format V4
}
