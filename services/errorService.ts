// Importing the useMemo hook from React for memoization
import { useMemo } from 'react';

// Importing the useTranslation hook from 'next-i18next' for language translation
import { useTranslation } from 'next-i18next';

// Importing the ErrorMessage type for defining error messages
import { ErrorMessage } from '@/types/error';

// Custom hook for handling error-related services
const useErrorService = () => {
  // Initializing the translation function from the useTranslation hook for the 'chat' namespace
  const { t } = useTranslation('chat');

  // Returning an object with a memoized function to handle models-related errors
  return {
    // Memoizing the getModelsError function to avoid unnecessary re-computation
    getModelsError: useMemo(
      // Defining the getModelsError function, which takes an error object as a parameter
      () => (error: any) => {
        // Checking if there is no error, in which case returning null
        return !error
          ? null
          : ({
              // Constructing an ErrorMessage object with a title, code, and messageLines
              title: t('Error fetching models.'),
              code: error.status || 'unknown',
              messageLines: error.statusText
                ? [error.statusText]
                : [
                    t(
                      'Make sure your OpenAI API key is set in the bottom left of the sidebar.',
                    ),
                    t(
                      'If you completed this step, OpenAI may be experiencing issues.',
                    ),
                  ],
            } as ErrorMessage);
      },
      // Memoization dependency: including the translation function
      [t],
    ),
  };
};

// Exporting the useErrorService hook as the default export
export default useErrorService;
