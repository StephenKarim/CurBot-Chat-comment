import { Settings } from '@/types/settings';

// Storage key for settings in local storage
const STORAGE_KEY = 'settings';

// Function to get user settings from local storage
export const getSettings = (): Settings => {
  let settings: Settings = { // Default settings with a dark theme
    theme: 'dark',
  };
  // Retrieve saved settings from local storage
  const settingsJson = localStorage.getItem(STORAGE_KEY);
   // If saved settings are found, try to parse and merge them with default settings
  if (settingsJson) {
    try {
      let savedSettings = JSON.parse(settingsJson) as Settings;
      settings = Object.assign(settings, savedSettings);
    } catch (e) {
      console.error(e); // Log an error if parsing fails
    }
  }
  // Return the merged settings
  return settings;
};

// Function to save user settings to local storage
export const saveSettings = (settings: Settings) => {
  // Save the settings as a JSON string in local storage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};
