import { Conversation } from '@/types/chat';

// Update a conversation in the list of all conversations
export const updateConversation = (
  updatedConversation: Conversation,
  allConversations: Conversation[],
) => {
  // Map over all conversations and replace the old one with the updated version
  const updatedConversations = allConversations.map((c) => {
    if (c.id === updatedConversation.id) {
      return updatedConversation;
    }

    return c;
  });

  // Save the updated conversation and the updated list of all conversations to local storage
  saveConversation(updatedConversation);
  saveConversations(updatedConversations);

  // Return an object with the updated single conversation and the updated list of all conversations
  return {
    single: updatedConversation,
    all: updatedConversations,
  };
};

// Save a single conversation to local storage
export const saveConversation = (conversation: Conversation) => {
  localStorage.setItem('selectedConversation', JSON.stringify(conversation));
};

// Save a list of conversations to local storage
export const saveConversations = (conversations: Conversation[]) => {
  localStorage.setItem('conversationHistory', JSON.stringify(conversations));
};
