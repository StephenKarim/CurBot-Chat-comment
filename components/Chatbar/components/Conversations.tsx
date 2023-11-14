// Importing necessary dependencies and components
import { Conversation } from '@/types/chat';

import { ConversationComponent } from './Conversation';

// Props interface for Conversations component
interface Props {
  conversations: Conversation[];
}

// Conversations functional component
export const Conversations = ({ conversations }: Props) => {
  // Rendering the component
  return (
    <div className="flex w-full flex-col gap-1">
      {/* Mapping through conversations and rendering ConversationComponent */}
      {conversations
        .filter((conversation) => !conversation.folderId)
        .slice()
        .reverse()
        .map((conversation, index) => (
          <ConversationComponent key={index} conversation={conversation} />
        ))}
    </div>
  );
};
