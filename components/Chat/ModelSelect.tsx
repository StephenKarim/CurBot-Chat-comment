// Importing necessary dependencies from external libraries and contexts
import { IconExternalLink } from '@tabler/icons-react';
import { useContext } from 'react';

// Importing translation hook from Next.js i18next integration
import { useTranslation } from 'next-i18next';

// Importing the OpenAIModel type and HomeContext for state management
import { OpenAIModel } from '@/types/openai';
import HomeContext from '@/pages/api/home/home.context';

// ModelSelect component for selecting OpenAI models
export const ModelSelect = () => {
  // Using the translation hook
  const { t } = useTranslation('chat');

  // Destructuring state and dispatch functions from HomeContext
  const {
    state: { selectedConversation, models, defaultModelId },
    handleUpdateConversation,
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  // Handling the change in model selection
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    selectedConversation &&
      handleUpdateConversation(selectedConversation, {
        key: 'model',
        value: models.find(
          (model) => model.id === e.target.value,
        ) as OpenAIModel,
      });
  };

  // Rendering the ModelSelect component
  return (
    <div className="flex flex-col">
      {/* Label for the model selection */}
      <label className="mb-2 text-left text-neutral-700 dark:text-neutral-400">
        {t('Model')}
      </label>
      {/* Dropdown for selecting a model */}
      <div className="w-full rounded-lg border border-neutral-200 bg-transparent pr-2 text-neutral-900 dark:border-neutral-600 dark:text-white">
        <select
          className="w-full bg-transparent p-2"
          placeholder={t('Select a model') || ''}
          value={selectedConversation?.model?.id || defaultModelId}
          onChange={handleChange}
        >
          {/* Mapping over available models to generate dropdown options */}
          {models.map((model) => (
            <option
              key={model.id}
              value={model.id}
              className="dark:bg-[#343541] dark:text-white"
            >
              {/* Displaying default model with its name */}
              {model.id === defaultModelId
                ? `Default (${model.name})`
                : model.name}
            </option>
          ))}
        </select>
      </div>
      {/* Link to view account usage on the OpenAI platform */}
      <div className="w-full mt-3 text-left text-neutral-700 dark:text-neutral-400 flex items-center">
        <a
          href="https://platform.openai.com/account/usage"
          target="_blank"
          className="flex items-center"
        >
          {/* External link icon */}
          <IconExternalLink size={18} className={'inline mr-1'} />
          {/* Translated text for viewing account usage */}
          {t('View Account Usage')}
        </a>
      </div>
    </div>
  );
};

