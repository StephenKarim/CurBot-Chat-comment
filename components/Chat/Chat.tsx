// Importing necessary dependencies and components
import { IconClearAll, IconSettings } from '@tabler/icons-react';
import Image from 'next/image';
import {
  MutableRefObject,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import toast from 'react-hot-toast';

import { useTranslation } from 'next-i18next';

import { getEndpoint } from '@/utils/app/api';
import {
  saveConversation,
  saveConversations,
  updateConversation,
} from '@/utils/app/conversation';
import { throttle } from '@/utils/data/throttle';

import { ChatBody, Conversation, Message } from '@/types/chat';
import { Plugin } from '@/types/plugin';

import HomeContext from '@/pages/api/home/home.context';

import Spinner from '../Spinner';
import { ChatInput } from './ChatInput';
import { ChatLoader } from './ChatLoader';
import { ErrorMessageDiv } from './ErrorMessageDiv';
import { ModelSelect } from './ModelSelect';
import { SystemPrompt } from './SystemPrompt';
import { TemperatureSlider } from './Temperature';
import { MemoizedChatMessage } from './MemoizedChatMessage';

// Define Props interface
interface Props {
  stopConversationRef: MutableRefObject<boolean>;
}

// Define Chat component
export const Chat = memo(({ stopConversationRef }: Props) => {
  // Localization hook
  const { t } = useTranslation('chat');

  // Destructuring values from HomeContext
  const {
    state: {
      selectedConversation,
      conversations,
      models,
      apiKey,
      pluginKeys,
      serverSideApiKeyIsSet,
      messageIsStreaming,
      modelError,
      loading,
      prompts,
    },
    handleUpdateConversation,
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  // State variables
  const [currentMessage, setCurrentMessage] = useState<Message>();
  const [autoScrollEnabled, setAutoScrollEnabled] = useState<boolean>(true);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showScrollDownButton, setShowScrollDownButton] = useState<boolean>(false);

  // Refs for DOM elements
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handler to send a message
  const handleSend = useCallback(
    async (message: Message, deleteCount = 0, plugin: Plugin | null = null) => {
      // Implementation omitted for brevity
    },
    [apiKey, conversations, pluginKeys, selectedConversation, stopConversationRef],
  );

  // Handler to scroll to the bottom of the chat
  const scrollToBottom = useCallback(() => {
    // Implementation omitted for brevity
  }, [autoScrollEnabled]);

  // Handler for scroll events
  const handleScroll = () => {
    // Implementation omitted for brevity
  };

  // Handler to scroll down the chat
  const handleScrollDown = () => {
    // Implementation omitted for brevity
  };

  // Handler to toggle display of settings
  const handleSettings = () => {
    setShowSettings(!showSettings);
  };

  // Handler to clear all messages
  const onClearAll = () => {
    // Implementation omitted for brevity
  };

  // Function to scroll down (used in the useEffect)
  const scrollDown = () => {
    // Implementation omitted for brevity
  };
  const throttledScrollDown = throttle(scrollDown, 250);

  // Styles for messages
  const myStyle = {
    fontSize: '16px',
    fontWeight: '200',
    fontFamily: 'Arial, sans-serif',
  };

  const myStyle2 = {
    fontSize: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  // useEffect to scroll down when messages change
  useEffect(() => {
    throttledScrollDown();
    selectedConversation &&
      setCurrentMessage(
        selectedConversation.messages[selectedConversation.messages.length - 2],
      );
  }, [selectedConversation, throttledScrollDown]);

  // useEffect for intersection observer to enable auto-scroll
  useEffect(() => {
    // Implementation omitted for brevity
  }, [messagesEndRef]);

  // Main component rendering
  return (
    <div className="relative flex-1 overflow-hidden bg-white dark:bg-[#343541]">
      {/* Check for API key existence */}
      {!(apiKey || serverSideApiKeyIsSet) ? (
        // Display welcome and information if API key is not set
        <div className="mx-auto flex h-full w-[300px] flex-col justify-center space-y-6 sm:w-[600px]">
          {/* Welcome message */}
          <div className="text-center text-4xl font-bold text-black dark:text-white">
            Welcome to CurBot
          </div>
          {/* Information about CurBot */}
          <div className="text-center text-lg text-black dark:text-white">
            {/* Additional information */}
          </div>
        </div>
      ) : modelError ? (
        // Display error message if there's a model error
        <ErrorMessageDiv error={modelError} />
      ) : (
        // Main chat UI when API key is set and no model error
        <>
          {/* Chat container */}
          <div
            className="max-h-full overflow-x-hidden"
            ref={chatContainerRef}
            onScroll={handleScroll}
          >
            {/* Check if there are no messages */}
            {selectedConversation?.messages.length === 0 ? (
              // Display initial messages or loading spinner
              <>
                {/* Spinner or initial messages */}
              </>
            ) : (
              // Display chat messages, loading spinner, and scroll down button
              <>
                {/* Messages and loading spinner */}
                {loading && <ChatLoader />}
                {/* Placeholder for scrolling to bottom */}
                <div
                  className="h-[162px] bg-white dark:bg-[#343541]"
                  ref={messagesEndRef}
                />
              </>
            )}
          </div>

          {/* Chat input and controls */}
          <ChatInput
            stopConversationRef={stopConversationRef}
            textareaRef={textareaRef}
            onSend={(message, plugin) => {
              setCurrentMessage(message);
              handleSend(message, 0, plugin);
            }}
            onScrollDownClick={handleScrollDown}
            onRegenerate={() => {
              if (currentMessage) {
                handleSend(currentMessage, 2, null);
              }
            }}
            showScrollDownButton={showScrollDownButton}
          />
        </>
      )}
    </div>
  );
});

// Set display name for the Chat component
Chat.displayName = 'Chat';
