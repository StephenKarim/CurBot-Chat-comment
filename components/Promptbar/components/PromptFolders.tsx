// Importing React hooks and types
import { useContext } from 'react';
import { FolderInterface } from '@/types/folder';

// Importing context and components
import HomeContext from '@/pages/api/home/home.context';
import Folder from '@/components/Folder';
import { PromptComponent } from '@/components/Promptbar/components/Prompt';
import PromptbarContext from '../PromptBar.context';

// Functional component for rendering prompt folders
export const PromptFolders = () => {
  // Destructuring values from the HomeContext
  const {
    state: { folders },
  } = useContext(HomeContext);

  // Destructuring values from the PromptbarContext
  const {
    state: { searchTerm, filteredPrompts },
    handleUpdatePrompt,
  } = useContext(PromptbarContext);

  // Function to handle drop events when a prompt is moved to a folder
  const handleDrop = (e: any, folder: FolderInterface) => {
    if (e.dataTransfer) {
      const prompt = JSON.parse(e.dataTransfer.getData('prompt'));

      // Updating the prompt's folderId and triggering the update
      const updatedPrompt = {
        ...prompt,
        folderId: folder.id,
      };

      handleUpdatePrompt(updatedPrompt);
    }
  };

  // Function to render prompt components within a specific folder
  const PromptFolders = (currentFolder: FolderInterface) =>
    filteredPrompts
      .filter((p) => p.folderId)
      .map((prompt, index) => {
        if (prompt.folderId === currentFolder.id) {
          return (
            <div key={index} className="ml-5 gap-2 border-l pl-2">
              <PromptComponent prompt={prompt} />
            </div>
          );
        }
      });

  // Rendering the overall component
  return (
    <div className="flex w-full flex-col pt-2">
      {/* Mapping and rendering folders */}
      {folders
        .filter((folder) => folder.type === 'prompt')
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((folder, index) => (
          <Folder
            key={index}
            searchTerm={searchTerm}
            currentFolder={folder}
            handleDrop={handleDrop}
            folderComponent={PromptFolders(folder)}
          />
        ))}
    </div>
  );
};
