// Importing necessary dependencies from React
import { FC, useContext, useState } from 'react';

// Importing translation hook from next-i18next
import { useTranslation } from 'next-i18next';

// Importing constant for default temperature
import { DEFAULT_TEMPERATURE } from '@/utils/app/const';

// Importing HomeContext for accessing global state
import HomeContext from '@/pages/api/home/home.context';

// Props interface for the TemperatureSlider component
interface Props {
  // Label for the temperature slider
  label: string;
  // Callback function to handle temperature changes
  onChangeTemperature: (temperature: number) => void;
}

// TemperatureSlider component for adjusting temperature in the chat
export const TemperatureSlider: FC<Props> = ({
  label,
  onChangeTemperature,
}) => {
  // Accessing conversations from the global state
  const {
    state: { conversations },
  } = useContext(HomeContext);

  // Getting the last conversation to set initial temperature
  const lastConversation = conversations[conversations.length - 1];

  // State variable for controlling temperature
  const [temperature, setTemperature] = useState(
    lastConversation?.temperature ?? DEFAULT_TEMPERATURE,
  );

  // Translation hook for localization
  const { t } = useTranslation('chat');

  // Event handler for changing temperature
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Parsing and setting the new temperature value
    const newValue = parseFloat(event.target.value);
    setTemperature(newValue);
    // Triggering the parent component's onChangeTemperature callback
    onChangeTemperature(newValue);
  };

  // Rendering the temperature slider component
  return (
    <div className="flex flex-col">
      {/* Label for the temperature slider */}
      <label className="mb-2 text-left text-neutral-700 dark:text-neutral-400">
        {label}
      </label>

      {/* Information about temperature effects */}
      <span className="text-[12px] text-black/50 dark:text-white/50 text-sm">
        {t(
          'Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.',
        )}
      </span>

      {/* Displaying the current temperature value */}
      <span className="mt-2 mb-1 text-center text-neutral-900 dark:text-neutral-100">
        {temperature.toFixed(1)}
      </span>

      {/* Temperature slider input element */}
      <input
        className="cursor-pointer"
        type="range"
        min={0}
        max={1}
        step={0.1}
        value={temperature}
        onChange={handleChange}
      />

      {/* Tick marks and labels for temperature range */}
      <ul className="w mt-2 pb-8 flex justify-between px-[24px] text-neutral-900 dark:text-neutral-100">
        <li className="flex justify-center">
          <span className="absolute">{t('Precise')}</span>
        </li>
        <li className="flex justify-center">
          <span className="absolute">{t('Neutral')}</span>
        </li>
        <li className="flex justify-center">
          <span className="absolute">{t('Creative')}</span>
        </li>
      </ul>
    </div>
  );
};
