// Importing necessary dependencies and components
import { useContext } from 'react';

import { FolderInterface } from '@/types/folder';

import HomeContext from '@/pages/api/home/home.context';

import Folder from '@/components/Folder';

import { ConversationComponent } from './Conversation';

interface Props {
  searchTerm: string;
}

export const ChatFolders = ({ searchTerm }: Props) => {
  // Accessing state and action functions from the global context
  const {
    state: { folders, conversations },
    handleUpdateConversation,
  } = useContext(HomeContext);

  const handleDrop = (e: any, folder: FolderInterface) => {
    if (e.dataTransfer) {
      // Extracting conversation data from the drop event
      const conversation = JSON.parse(e.dataTransfer.getData('conversation'));
      // Updating the conversation with the new folder ID
      handleUpdateConversation(conversation, {
        key: 'folderId',
        value: folder.id,
      });
    }
  };

  const ChatFolders = (currentFolder: FolderInterface) => {
    return (
      conversations &&
      conversations
        .filter((conversation) => conversation.folderId)
        .map((conversation, index) => {
          if (conversation.folderId === currentFolder.id) {
            return (
              // Rendering the ConversationComponent for each conversation
              <div key={index} className="ml-5 gap-2 border-l pl-2">
                <ConversationComponent conversation={conversation} />
              </div>
            );
          }
        })
    );
  };

  // Rendering the chat folders and associated conversations
  return (
    <div className="flex w-full flex-col pt-2">
      {folders
        .filter((folder) => folder.type === 'chat')
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((folder, index) => (
          <Folder
            key={index}
            searchTerm={searchTerm}
            currentFolder={folder}
            handleDrop={handleDrop}
            folderComponent={ChatFolders(folder)}
          />
        ))}
    </div>
  );
};
