// Importing necessary dependencies from React
import { IconRefresh } from '@tabler/icons-react';
import { FC } from 'react';

// Importing translation hook from next-i18next
import { useTranslation } from 'next-i18next';

// Props interface for the Regenerate component
interface Props {
  // Callback function to handle regeneration
  onRegenerate: () => void;
}

// Regenerate component for displaying an error message and regeneration button
export const Regenerate: FC<Props> = ({ onRegenerate }) => {
  // Using the translation hook for localization
  const { t } = useTranslation('chat');

  // Rendering the Regenerate component
  return (
    <div className="fixed bottom-4 left-0 right-0 ml-auto mr-auto w-full px-2 sm:absolute sm:bottom-8 sm:left-[280px] sm:w-1/2 lg:left-[200px]">
      {/* Error message */}
      <div className="mb-4 text-center text-red-500">
        {t('Sorry, there was an error.')}
      </div>
      {/* Regenerate button */}
      <button
        className="flex h-12 gap-2 w-full items-center justify-center rounded-lg border border-b-neutral-300 bg-neutral-100 text-sm font-semibold text-neutral-500 dark:border-none dark:bg-[#444654] dark:text-neutral-200"
        onClick={onRegenerate}
      >
        <IconRefresh />
        <div>{t('Regenerate response')}</div>
      </button>
    </div>
  );
};
