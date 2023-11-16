// Importing necessary dependencies from React
import {
  FC,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

// Importing translation hook from next-i18next
import { useTranslation } from 'next-i18next';

// Importing constant for default system prompt
import { DEFAULT_SYSTEM_PROMPT } from '@/utils/app/const';

// Importing types for conversation and prompts
import { Conversation } from '@/types/chat';
import { Prompt } from '@/types/prompt';

// Importing PromptList and VariableModal components
import { PromptList } from './PromptList';
import { VariableModal } from './VariableModal';

// Props interface for the SystemPrompt component
interface Props {
  // Conversation object containing prompt information
  conversation: Conversation;
  // Array of prompts to be displayed
  prompts: Prompt[];
  // Callback function to handle changes in the selected prompt
  onChangePrompt: (prompt: string) => void;
}

// SystemPrompt component for handling system prompts and variables
export const SystemPrompt: FC<Props> = ({
  conversation,
  prompts,
  onChangePrompt,
}) => {
  // Using the translation hook for localization
  const { t } = useTranslation('chat');

  // State variables for handling user input, prompt list, and modal visibility
  const [value, setValue] = useState<string>('');
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [showPromptList, setShowPromptList] = useState(false);
  const [promptInputValue, setPromptInputValue] = useState('');
  const [variables, setVariables] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Refs for textarea and prompt list elements
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const promptListRef = useRef<HTMLUListElement | null>(null);

  // Filtering prompts based on user input
  const filteredPrompts = prompts.filter((prompt) =>
    prompt.name.toLowerCase().includes(promptInputValue.toLowerCase()),
  );

  // Event handler for textarea value change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Updating the value state
    const value = e.target.value;
    const maxLength = conversation.model.maxLength;

    // Checking for prompt length limit
    if (value.length > maxLength) {
      // Displaying an alert if the limit is exceeded
      alert(
        t(
          `Prompt limit is {{maxLength}} characters. You have entered {{valueLength}} characters.`,
          { maxLength, valueLength: value.length },
        ),
      );
      return;
    }

    // Setting the value and updating prompt list visibility
    setValue(value);
    updatePromptListVisibility(value);

    // Triggering onChangePrompt if the value is not empty
    if (value.length > 0) {
      onChangePrompt(value);
    }
  };

  // Event handler for initializing the variable modal
  const handleInitModal = () => {
    const selectedPrompt = filteredPrompts[activePromptIndex];
    // Updating the value by replacing the last word with the selected prompt content
    setValue((prevVal) => {
      const newContent = prevVal?.replace(/\/\w*$/, selectedPrompt.content);
      return newContent;
    });
    // Handling the selected prompt
    handlePromptSelect(selectedPrompt);
    setShowPromptList(false);
  };

  // Function to parse variables from prompt content
  const parseVariables = (content: string) => {
    const regex = /{{(.*?)}}/g;
    const foundVariables = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
      foundVariables.push(match[1]);
    }

    return foundVariables;
  };

  // Function to update prompt list visibility based on user input
  const updatePromptListVisibility = useCallback((text: string) => {
    const match = text.match(/\/\w*$/);

    if (match) {
      setShowPromptList(true);
      setPromptInputValue(match[0].slice(1));
    } else {
      setShowPromptList(false);
      setPromptInputValue('');
    }
  }, []);

  // Event handler for selecting a prompt
  const handlePromptSelect = (prompt: Prompt) => {
    // Parsing variables from the selected prompt content
    const parsedVariables = parseVariables(prompt.content);
    // Setting variables and handling modal visibility
    setVariables(parsedVariables);

    if (parsedVariables.length > 0) {
      setIsModalVisible(true);
    } else {
      // Updating the value with the selected prompt content and triggering onChangePrompt
      const updatedContent = value?.replace(/\/\w*$/, prompt.content);

      setValue(updatedContent);
      onChangePrompt(updatedContent);

      // Updating prompt list visibility
      updatePromptListVisibility(prompt.content);
    }
  };

  // Event handler for submitting variable changes
  const handleSubmit = (updatedVariables: string[]) => {
    // Updating the value by replacing variables with the updated values
    const newContent = value?.replace(/{{(.*?)}}/g, (match, variable) => {
      const index = variables.indexOf(variable);
      return updatedVariables[index];
    });

    setValue(newContent);
    onChangePrompt(newContent);

    // Focusing on the textarea after variable changes
    if (textareaRef && textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Event handler for handling keyboard events in the textarea
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (showPromptList) {
      // Handling arrow keys, tab, enter, and escape keys for prompt list navigation
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActivePromptIndex((prevIndex) =>
          prevIndex < prompts.length - 1 ? prevIndex + 1 : prevIndex,
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActivePromptIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex,
        );
      } else if (e.key === 'Tab') {
        e.preventDefault();
        setActivePromptIndex((prevIndex) =>
          prevIndex < prompts.length - 1 ? prevIndex + 1 : 0,
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleInitModal();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setShowPromptList(false);
      } else {
        setActivePromptIndex(0);
      }
    }
  };

  // Effect to adjust textarea height based on content
  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
    }
  }, [value]);

  // Effect to set initial value when conversation or prompts change
  useEffect(() => {
    if (conversation.prompt) {
      setValue(conversation.prompt);
    } else {
      setValue(DEFAULT_SYSTEM_PROMPT);
    }
  }, [conversation]);

  // Effect to handle clicks outside of the prompt list
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        promptListRef.current &&
        !promptListRef.current.contains(e.target as Node)
      ) {
        setShowPromptList(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <label className="mb-2 text-left text-neutral-700 dark:text-neutral-400">
        {t('System Prompt')}
      </label>
      <textarea
        ref={textareaRef}
        className="w-full rounded-lg border border-neutral-200 bg-transparent px-4 py-3 text-neutral-900 dark:border-neutral-600 dark:text-neutral-100"
        style={{
          resize: 'none',
          bottom: `${textareaRef?.current?.scrollHeight}px`,
          maxHeight: '300px',
          overflow: `${
            textareaRef.current && textareaRef.current.scrollHeight > 400
              ? 'auto'
              : 'hidden'
          }`,
        }}
        placeholder={
          t(`Enter a prompt or type "/" to select a prompt...`) || ''
        }
        value={t(value) || ''}
        rows={1}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      {showPromptList && filteredPrompts.length > 0 && (
        <div>
          <PromptList
            activePromptIndex={activePromptIndex}
            prompts={filteredPrompts}
            onSelect={handleInitModal}
            onMouseOver={setActivePromptIndex}
            promptListRef={promptListRef}
          />
        </div>
      )}

      {isModalVisible && (
        <VariableModal
          prompt={prompts[activePromptIndex]}
          variables={variables}
          onSubmit={handleSubmit}
          onClose={() => setIsModalVisible(false)}
        />
      )}
    </div>
  );
};
