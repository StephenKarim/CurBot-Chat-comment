// Importing necessary dependencies from React
import { FC, MutableRefObject } from 'react';

// Importing the Prompt type
import { Prompt } from '@/types/prompt';

// Props interface for the PromptList component
interface Props {
  prompts: Prompt[];
  activePromptIndex: number;
  onSelect: () => void;
  onMouseOver: (index: number) => void;
  promptListRef: MutableRefObject<HTMLUListElement | null>;
}

// PromptList component for displaying a list of prompts
export const PromptList: FC<Props> = ({
  prompts,
  activePromptIndex,
  onSelect,
  onMouseOver,
  promptListRef,
}) => {
  // Rendering the list of prompts
  return (
    <ul
      ref={promptListRef}
      className="z-10 max-h-52 w-full overflow-scroll rounded border border-black/10 bg-white shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:border-neutral-500 dark:bg-[#343541] dark:text-white dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]"
    >
      {prompts.map((prompt, index) => (
        <li
          key={prompt.id}
          className={`${
            index === activePromptIndex
              ? 'bg-gray-200 dark:bg-[#202123] dark:text-black'
              : ''
          } cursor-pointer px-3 py-2 text-sm text-black dark:text-white`}
          onClick={(e) => {
            // Preventing default click behavior and stopping propagation
            e.preventDefault();
            e.stopPropagation();
            // Triggering the onSelect callback
            onSelect();
          }}
          onMouseEnter={() => onMouseOver(index)}
        >
          {prompt.name}
        </li>
      ))}
    </ul>
  );
};
