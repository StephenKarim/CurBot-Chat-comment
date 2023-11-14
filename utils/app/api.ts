// Function to get the API endpoint based on the provided plugin
import { Plugin, PluginID } from '@/types/plugin';

export const getEndpoint = (plugin: Plugin | null) => {
  // If no plugin is provided, use the default chat API endpoint
  if (!plugin) {
    return 'api/chat';
  }

  // If the plugin is Google Search, use the Google API endpoint
  if (plugin.id === PluginID.GOOGLE_SEARCH) {
    return 'api/google';
  }

  // Use the default chat API endpoint for other plugins
  return 'api/chat';
};
