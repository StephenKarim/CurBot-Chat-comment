// CloseSidebarButton Component
// Importing icons for the close button
import { IconArrowBarLeft, IconArrowBarRight } from '@tabler/icons-react';

// Define the Props interface for the CloseSidebarButton component
interface Props {
  onClick: any;
  side: 'left' | 'right';
}

// CloseSidebarButton component definition
export const CloseSidebarButton = ({ onClick, side }: Props) => {
  return (
    <>
      {/* Close button */}
      <button
        className={`fixed top-5 ${
          side === 'right' ? 'right-[270px]' : 'left-[270px]'
        } z-50 h-7 w-7 hover:text-gray-400 dark:text-white dark:hover:text-gray-300 sm:top-0.5 sm:${
          side === 'right' ? 'right-[270px]' : 'left-[270px]'
        } sm:h-8 sm:w-8 sm:text-neutral-700`}
        onClick={onClick}
      >
        {side === 'right' ? <IconArrowBarRight /> : <IconArrowBarLeft />}
      </button>
      {/* Overlay div to cover the screen when the sidebar is closed */}
      <div
        onClick={onClick}
        className="absolute top-0 left-0 z-10 h-full w-full bg-black opacity-70 sm:hidden"
      ></div>
    </>
  );
};

// OpenSidebarButton Component
// OpenSidebarButton component definition
export const OpenSidebarButton = ({ onClick, side }: Props) => {
  return (
    // Open button
    <button
      className={`fixed top-2.5 ${
        side === 'right' ? 'right-2' : 'left-2'
      } z-50 h-7 w-7 text-white hover:text-gray-400 dark:text-white dark:hover:text-gray-300 sm:top-0.5 sm:${
        side === 'right' ? 'right-2' : 'left-2'
      } sm:h-8 sm:w-8 sm:text-neutral-700`}
      onClick={onClick}
    >
      {side === 'right' ? <IconArrowBarLeft /> : <IconArrowBarRight />}
    </button>
  );
};
