// Importing relevant types from the 'chat' module
import { ChatBody, Message } from './chat';
// Interface for representing a Google-specific chat body, extending the generic ChatBody
export interface GoogleBody extends ChatBody {
  googleAPIKey: string;
  googleCSEId: string;
}
// Interface for representing a Google response, containing a message
export interface GoogleResponse {
  message: Message;
}

export interface GoogleSource {
  title: string;
  link: string;
  displayLink: string;
  snippet: string;
  image: string;
  text: string;
}
