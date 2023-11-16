// Importing necessary dependencies from React
import { FC, KeyboardEvent, useEffect, useRef, useState } from 'react';

// Importing Prompt type from the prompt module
import { Prompt } from '@/types/prompt';

// Props interface for the VariableModal component
interface Props {
  // Prompt object containing details about the selected prompt
  prompt: Prompt;
  // Array of variables extracted from the prompt content
  variables: string[];
  // Callback function to handle form submission with updated variables
  onSubmit: (updatedVariables: string[]) => void;
  // Callback function to handle modal closure
  onClose: () => void;
}

// VariableModal component for editing variables associated with a prompt
export const VariableModal: FC<Props> = ({ prompt, variables, onSubmit, onClose }) => {
  // State variable to store updated variable values
  const [updatedVariables, setUpdatedVariables] = useState<{ key: string; value: string }[]>(
    // Initializing with variable keys and empty values
    variables
      .map((variable) => ({ key: variable, value: '' }))
      // Filtering out duplicate variables
      .filter((item, index, array) => array.findIndex((t) => t.key === item.key) === index),
  );

  // Ref for the modal element
  const modalRef = useRef<HTMLDivElement>(null);

  // Ref for the first textarea element (for focus)
  const nameInputRef = useRef<HTMLTextAreaElement>(null);

  // Event handler for updating variable values
  const handleChange = (index: number, value: string) => {
    setUpdatedVariables((prev) => {
      const updated = [...prev];
      updated[index].value = value;
      return updated;
    });
  };

  // Event handler for form submission
  const handleSubmit = () => {
    // Checking if all variables have non-empty values
    if (updatedVariables.some((variable) => variable.value === '')) {
      alert('Please fill out all variables');
      return;
    }

    // Triggering the parent component's onSubmit callback with updated values
    onSubmit(updatedVariables.map((variable) => variable.value));
    // Closing the modal
    onClose();
  };

  // Event handler for keyboard events
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // Submitting the form on Enter key press
      handleSubmit();
    } else if (e.key === 'Escape') {
      // Closing the modal on Escape key press
      onClose();
    }
  };

  // Effect for handling clicks outside the modal to close it
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    // Adding click event listener to the window
    window.addEventListener('click', handleOutsideClick);

    // Cleanup: removing the click event listener on component unmount
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [onClose]);

  // Effect for focusing on the first textarea when the modal is opened
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  // Rendering the VariableModal component
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onKeyDown={handleKeyDown}
    >
      <div
        ref={modalRef}
        className="dark:border-netural-400 inline-block max-h-[400px] transform overflow-y-auto rounded-lg border border-gray-300 bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all dark:bg-[#202123] sm:my-8 sm:max-h-[600px] sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
        role="dialog"
      >
        {/* Heading with the prompt name */}
        <div className="mb-4 text-xl font-bold text-black dark:text-neutral-200">
          {prompt.name}
        </div>

        {/* Description of the prompt */}
        <div className="mb-4 text-sm italic text-black dark:text-neutral-200">
          {prompt.description}
        </div>

        {/* Mapping through updatedVariables to render textarea for each variable */}
        {updatedVariables.map((variable, index) => (
          <div className="mb-4" key={index}>
            {/* Displaying variable name */}
            <div className="mb-2 text-sm font-bold text-neutral-200">
              {variable.key}
            </div>

            {/* Textarea for entering variable values */}
            <textarea
              ref={index === 0 ? nameInputRef : undefined}
              className="mt-1 w-full rounded-lg border border-neutral-500 px-4 py-2 text-neutral-900 shadow focus:outline-none dark:border-neutral-800 dark:border-opacity-50 dark:bg-[#40414F] dark:text-neutral-100"
              style={{ resize: 'none' }}
              placeholder={`Enter a value for ${variable.key}...`}
              value={variable.value}
              onChange={(e) => handleChange(index, e.target.value)}
              rows={3}
            />
          </div>
        ))}

        {/* Submit button for submitting the form */}
        <button
          className="mt-6 w-full rounded-lg border border-neutral-500 px-4 py-2 text-neutral-900 shadow hover:bg-neutral-100 focus:outline-none dark:border-neutral-800 dark:border-opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-300"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
