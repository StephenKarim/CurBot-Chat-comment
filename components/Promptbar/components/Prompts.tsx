// Importing necessary dependencies from React
import { FC } from 'react';

// Importing the Prompt type and the PromptComponent
import { Prompt } from '@/types/prompt';
import { PromptComponent } from './Prompt';

// Interface for the component's props
interface Props {
  prompts: Prompt[];
}

// Functional component for rendering a list of prompts
export const Prompts: FC<Props> = ({ prompts }) => {
  // Rendering the component
  return (
    <div className="flex w-full flex-col gap-1">
      {/* Mapping through the prompts and rendering the PromptComponent for each */}
      {prompts
        .slice()
        .reverse() // Reversing the order of prompts
        .map((prompt, index) => (
          <PromptComponent key={index} prompt={prompt} />
        ))}
    </div>
  );
};
