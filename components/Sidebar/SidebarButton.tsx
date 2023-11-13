import { FC } from 'react'; // Importing React's functional component

// Defining prop types for SidebarButton component
interface Props {
  text: string;
  icon: JSX.Element;
  onClick: () => void;
}

// Defining SidebarButton as a functional component
export const SidebarButton: FC<Props> = ({ text, icon, onClick }) => {
  return (
    // Rendering a button with specific styles and behavior
    <button
      className="flex w-full cursor-pointer select-none items-center gap-3 rounded-md py-3 px-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-gray-500/10"
      onClick={onClick}
    >
      {/* Displaying the provided icon */}
      <div>{icon}</div>
      {/* Displaying the provided text */}
      <span>{text}</span>
    </button>
  );
};
