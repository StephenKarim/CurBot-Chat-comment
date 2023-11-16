// Importing necessary dependencies from external libraries
import { FC, useEffect, useRef } from 'react';

// Importing translation hook from Next.js i18next integration
import { useTranslation } from 'next-i18next';

// Importing types for plugin-related data
import { Plugin, PluginList } from '@/types/plugin';

// Props interface for PluginSelect component
interface Props {
  plugin: Plugin | null;
  onPluginChange: (plugin: Plugin) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLSelectElement>) => void;
}

// PluginSelect component for selecting plugins
export const PluginSelect: FC<Props> = ({
  plugin,
  onPluginChange,
  onKeyDown,
}) => {
  // Using the translation hook
  const { t } = useTranslation('chat');

  // Creating a reference for the select element
  const selectRef = useRef<HTMLSelectElement>(null);

  // Handling keydown events for plugin selection
  const handleKeyDown = (e: React.KeyboardEvent<HTMLSelectElement>) => {
    // Extracting the select element and option count
    const selectElement = selectRef.current;
    const optionCount = selectElement?.options.length || 0;

    // Handling key combinations to navigate through options
    if (e.key === '/' && e.metaKey) {
      e.preventDefault();
      if (selectElement) {
        selectElement.selectedIndex =
          (selectElement.selectedIndex + 1) % optionCount;
        selectElement.dispatchEvent(new Event('change'));
      }
    } else if (e.key === '/' && e.shiftKey && e.metaKey) {
      e.preventDefault();
      if (selectElement) {
        selectElement.selectedIndex =
          (selectElement.selectedIndex - 1 + optionCount) % optionCount;
        selectElement.dispatchEvent(new Event('change'));
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectElement) {
        selectElement.dispatchEvent(new Event('change'));
      }

      // Updating the selected plugin based on the selected option
      onPluginChange(
        PluginList.find(
          (plugin) =>
            plugin.name === selectElement?.selectedOptions[0].innerText,
        ) as Plugin,
      );
    } else {
      // Handling other keydown events
      onKeyDown(e);
    }
  };

  // Focusing on the select element when the component mounts
  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  }, []);

  // Rendering the PluginSelect component
  return (
    <div className="flex flex-col">
      {/* Container for the plugin selection dropdown */}
      <div className="mb-1 w-full rounded border border-neutral-200 bg-transparent pr-2 text-neutral-900 dark:border-neutral-600 dark:text-white">
        {/* Select element for choosing a plugin */}
        <select
          ref={selectRef}
          className="w-full cursor-pointer bg-transparent p-2"
          placeholder={t('Select a plugin') || ''}
          value={plugin?.id || ''}
          onChange={(e) => {
            onPluginChange(
              PluginList.find(
                (plugin) => plugin.id === e.target.value,
              ) as Plugin,
            );
          }}
          onKeyDown={(e) => {
            handleKeyDown(e);
          }}
        >
          {/* Default option for ChatGPT */}
          <option
            key="chatgpt"
            value="chatgpt"
            className="dark:bg-[#343541] dark:text-white"
          >
            ChatGPT
          </option>

          {/* Mapping over available plugins to generate dropdown options */}
          {PluginList.map((plugin) => (
            <option
              key={plugin.id}
              value={plugin.id}
              className="dark:bg-[#343541] dark:text-white"
            >
              {plugin.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

