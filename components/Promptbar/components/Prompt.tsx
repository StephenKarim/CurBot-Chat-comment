// Importing icons from the @tabler/icons-react library and React hooks from 'react'
import {
  IconBulbFilled,
  IconCheck,
  IconTrash,
  IconX,
} from '@tabler/icons-react';
import {
  DragEvent,
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from 'react';

// Importing the Prompt type
import { Prompt } from '@/types/prompt';

// Importing a custom context and components
import SidebarActionButton from '@/components/Buttons/SidebarActionButton';
import PromptbarContext from '../PromptBar.context';
import { PromptModal } from './PromptModal';

// Interface for Props
interface Props {
  prompt: Prompt;
}

// Functional component for rendering a Prompt
export const PromptComponent = ({ prompt }: Props) => {
  // Destructuring values from the context
  const {
    dispatch: promptDispatch,
    handleUpdatePrompt,
    handleDeletePrompt,
  } = useContext(PromptbarContext);

  // State variables for handling the modal and deleting/renaming states
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState('');

  // Function to handle prompt updates
  const handleUpdate = (prompt: Prompt) => {
    handleUpdatePrompt(prompt);
    promptDispatch({ field: 'searchTerm', value: '' });
  };

  // Event handler for the delete button
  const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    if (isDeleting) {
      handleDeletePrompt(prompt);
      promptDispatch({ field: 'searchTerm', value: '' });
    }

    setIsDeleting(false);
  };

  // Event handler for canceling the delete action
  const handleCancelDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsDeleting(false);
  };

  // Event handler for opening the delete modal
  const handleOpenDeleteModal: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsDeleting(true);
  };

  // Event handler for drag start
  const handleDragStart = (e: DragEvent<HTMLButtonElement>, prompt: Prompt) => {
    if (e.dataTransfer) {
      e.dataTransfer.setData('prompt', JSON.stringify(prompt));
    }
  };

  // useEffect to ensure that only one state (deleting or renaming) is active at a time
  useEffect(() => {
    if (isRenaming) {
      setIsDeleting(false);
    } else if (isDeleting) {
      setIsRenaming(false);
    }
  }, [isRenaming, isDeleting]);

  // Rendering the Prompt component
  return (
    <div className="relative flex items-center">
      {/* Button for displaying prompt details */}
      <button
        className="flex w-full cursor-pointer items-center gap-3 rounded-lg p-3 text-sm transition-colors duration-200 hover:bg-[#343541]/90"
        draggable="true"
        onClick={(e) => {
          e.stopPropagation();
          setShowModal(true);
        }}
        onDragStart={(e) => handleDragStart(e, prompt)}
        onMouseLeave={() => {
          setIsDeleting(false);
          setIsRenaming(false);
          setRenameValue('');
        }}
      >
        <IconBulbFilled size={18} />
        {/* Displaying prompt name */}
        <div className="relative max-h-5 flex-1 overflow-hidden text-ellipsis whitespace-nowrap break-all pr-4 text-left text-[12.5px] leading-3">
          {prompt.name}
        </div>
      </button>

      {/* Displaying delete and cancel buttons when deleting or renaming */}
      {(isDeleting || isRenaming) && (
        <div className="absolute right-1 z-10 flex text-gray-300">
          <SidebarActionButton handleClick={handleDelete}>
            <IconCheck size={18} />
          </SidebarActionButton>

          <SidebarActionButton handleClick={handleCancelDelete}>
            <IconX size={18} />
          </SidebarActionButton>
        </div>
      )}

      {/* Displaying the delete button when not deleting or renaming */}
      {!isDeleting && !isRenaming && (
        <div className="absolute right-1 z-10 flex text-gray-300">
          <SidebarActionButton handleClick={handleOpenDeleteModal}>
            <IconTrash size={18} />
          </SidebarActionButton>
        </div>
      )}

      {/* Displaying the modal when showModal is true */}
      {showModal && (
        <PromptModal
          prompt={prompt}
          onClose={() => setShowModal(false)}
          onUpdatePrompt={handleUpdate}
        />
      )}
    </div>
  );
};
