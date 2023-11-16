// Importing the IconRobot component from the @tabler/icons-react library
import { IconRobot } from '@tabler/icons-react';

// Importing React and the functional component (FC) type
import { FC } from 'react';

// Props interface for the ChatLoader component (empty in this case)
interface Props { }

// Functional component for displaying a loading indicator in the chat
export const ChatLoader: FC<Props> = () => {
  return (
    // Container for the loader with styling
    <div
      className="group border-b border-black/10 bg-gray-50 text-gray-800 dark:border-gray-900/50 dark:bg-[#444654] dark:text-gray-100"
      style={{ overflowWrap: 'anywhere' }}
    >
      {/* Container for the loader content with styling */}
      <div className="m-auto flex gap-4 p-4 text-base md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
        {/* Container for the robot icon with styling */}
        <div className="min-w-[40px] items-end">
          {/* Displaying the robot icon with a specified size */}
          <IconRobot size={30} />
        </div>
        {/* Placeholder for the loading animation */}
        <span className="animate-pulse cursor-default mt-1">▍</span>
      </div>
    </div>
  );
};
