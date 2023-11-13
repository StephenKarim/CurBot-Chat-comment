import { MouseEventHandler, ReactElement } from 'react'; // Importing required types from the 'react' library.

// Defining the properties that the component will receive.
interface Props {
  handleClick: MouseEventHandler<HTMLButtonElement>; // A function to handle the click event on the button.
  children: ReactElement;  // The content of the button, expected to be a React element.
}
// Defining the functional component named SidebarActionButton.
const SidebarActionButton = ({ handleClick, children }: Props) => (
  // Rendering a button element with the provided properties.
  <button
    className="min-w-[20px] p-1 text-neutral-400 hover:text-neutral-100" // Applying CSS classes for styling using Tailwind CSS.
    onClick={handleClick} // Handling the click event by calling the handleClick function.
  >
    {children}
  </button>
);
// Exporting the SidebarActionButton component as the default export.
export default SidebarActionButton;
