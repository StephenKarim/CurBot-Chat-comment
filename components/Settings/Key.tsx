// Import necessary components and hooks from the React and Next.js libraries.
import { IconCheck, IconKey, IconX } from '@tabler/icons-react';
import { FC, KeyboardEvent, useEffect, useRef, useState } from 'react';

import { useTranslation } from 'next-i18next'; // Import the useTranslation hook from the next-i18next library for internationalization

import { SidebarButton } from '../Sidebar/SidebarButton'; // Import the SidebarButton component from the Sidebar directory

// Define the Props interface for the Key component.
interface Props {
  apiKey: string;
  onApiKeyChange: (apiKey: string) => void;
}
// Define the Key functional component.
export const Key: FC<Props> = ({ apiKey, onApiKeyChange }) => {
  const { t } = useTranslation('sidebar'); // Initialize the useTranslation hook for the 'sidebar' namespace.
  const [isChanging, setIsChanging] = useState(false); // State to track whether the API key is being changed.
  const [newKey, setNewKey] = useState(apiKey); // State to store the new API key.
  const inputRef = useRef<HTMLInputElement>(null); // Reference to the input element for the API key.

  // Function to handle the 'Enter' key press.
  const handleEnterDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUpdateKey(newKey);
    }
  };

  // Function to handle updating the API key.
  const handleUpdateKey = (newKey: string) => {
    onApiKeyChange(newKey.trim());
    setIsChanging(false);
  };

    // Effect to focus on the input element when changing the API key.
  useEffect(() => {
    if (isChanging) {
      inputRef.current?.focus();
    }
  }, [isChanging]);

  // Render the component based on whether the API key is being changed.
  return isChanging ? (
    // Render the input field when changing the API key.
    <div className="duration:200 flex w-full cursor-pointer items-center rounded-md py-3 px-3 transition-colors hover:bg-gray-500/10">
      <IconKey size={18} />

      <input
        ref={inputRef}
        className="ml-2 h-[20px] flex-1 overflow-hidden overflow-ellipsis border-b border-neutral-400 bg-transparent pr-1 text-[12.5px] leading-3 text-left text-white outline-none focus:border-neutral-100"
        type="password"
        value={newKey}
        onChange={(e) => setNewKey(e.target.value)}
        onKeyDown={handleEnterDown}
        placeholder={t('API Key') || 'API Key'}
      />

      <div className="flex w-[40px]">
        {/* Render the checkmark icon for confirming the API key update. */}
        <IconCheck
          className="ml-auto min-w-[20px] text-neutral-400 hover:text-neutral-100"
          size={18}
          onClick={(e) => {
            e.stopPropagation();
            handleUpdateKey(newKey);
          }}
        />

        {/* Render the 'X' icon for canceling the API key update. */}
        <IconX
          className="ml-auto min-w-[20px] text-neutral-400 hover:text-neutral-100"
          size={18}
          onClick={(e) => {
            e.stopPropagation();
            setIsChanging(false);
            setNewKey(apiKey);
          }}
        />
      </div>
    </div>
  ) : (
    // Render the SidebarButton when not changing the API key.
    <SidebarButton
      text={t('OpenAI API Key')}
      icon={<IconKey size={18} />}
      onClick={() => setIsChanging(true)}
    />
  );
};
