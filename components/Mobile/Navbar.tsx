import { IconPlus } from '@tabler/icons-react'; // Importing the IconPlus component from the '@tabler/icons-react' library
import { FC } from 'react';// Importing the FunctionComponent type from the 'react' library

import { Conversation } from '@/types/chat';// Importing the Conversation type from the '@/types/chat' module
// Defining the Props interface for the Navbar component
interface Props {
  selectedConversation: Conversation; // Prop for the selected conversation
  onNewConversation: () => void; // Callback function for creating a new conversation
}

// Defining the Navbar component as a FunctionComponent with the specified Props
export const Navbar: FC<Props> = ({
  selectedConversation,
  onNewConversation,
}) => {
  // JSX code for the Navbar component
  return (
    // Navigation container with flex layout, background color, padding, and spacing
    <nav className="flex w-full justify-between bg-[#202123] py-3 px-4">
       {/* Empty div for spacing on the left */}
      <div className="mr-4"></div>

      {/* Container for the selected conversation's name with ellipsis for overflow */}
      <div className="max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap">
        {selectedConversation.name}
      </div>

      {/* IconPlus component for adding a new conversation with styling and click event */}
      <IconPlus
        className="cursor-pointer hover:text-neutral-400 mr-8"
        onClick={onNewConversation}
      />
    </nav>
  );
};

/*This code defines a React functional component (Navbar) that represents a navigation bar. 
It takes two props (selectedConversation and onNewConversation) and displays the selected conversation's name and an "Add Conversation" icon. 
The styling is achieved using Tailwind CSS classes.*/
