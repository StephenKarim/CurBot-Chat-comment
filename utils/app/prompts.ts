import { Prompt } from '@/types/prompt';

// Function to update a single prompt and save all prompts
export const updatePrompt = (updatedPrompt: Prompt, allPrompts: Prompt[]) => {
  // Update the specific prompt in the array of all prompts
  const updatedPrompts = allPrompts.map((c) => {
    if (c.id === updatedPrompt.id) {
      return updatedPrompt;
    }

    return c;
  });

  savePrompts(updatedPrompts); // Save the updated prompts to local storage

  // Return the updated prompt and the array of all prompts
  return {
    single: updatedPrompt,
    all: updatedPrompts,
  };
};

// Function to save an array of prompts to local storage
export const savePrompts = (prompts: Prompt[]) => {
  // Save the array of prompts to local storage as a JSON string
  localStorage.setItem('prompts', JSON.stringify(prompts));
};
