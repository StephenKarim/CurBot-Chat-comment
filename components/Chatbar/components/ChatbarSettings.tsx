// Importing necessary dependencies and components
import { IconFileExport, IconHome, IconSettings } from '@tabler/icons-react';
import { useContext, useState } from 'react';

import { useTranslation } from 'next-i18next';

import HomeContext from '@/pages/api/home/home.context';

import { SettingDialog } from '@/components/Settings/SettingDialog';

import { Import } from '../../Settings/Import';
import { Key } from '../../Settings/Key';
import { SidebarButton } from '../../Sidebar/SidebarButton';
import ChatbarContext from '../Chatbar.context';
import { ClearConversations } from './ClearConversations';
// import { PluginKeys } from './PluginKeys';

// ChatbarSettings component for rendering chatbar settings
export const ChatbarSettings = () => {
  // Using the translation hook
  const { t } = useTranslation('sidebar');
  // State to manage the visibility of the setting dialog
  const [isSettingDialogOpen, setIsSettingDialog] = useState<boolean>(false);

  // Accessing state and action functions from the global context
  const {
    state: {
      apiKey,
      lightMode,
      serverSideApiKeyIsSet,
      serverSidePluginKeysSet,
      conversations,
    },
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  // Accessing action functions from the chatbar context
  const {
    handleClearConversations,
    handleImportConversations,
    handleExportData,
    handleApiKeyChange,
  } = useContext(ChatbarContext);

  // Function to navigate to the home page
  const goToHome = () => {    
    window.location.href = 'https://curbot.vercel.app/index.html';
  };

  // Rendering the chatbar settings menu
  return (
    <div className="flex flex-col items-center space-y-1 border-t border-white/20 pt-1 text-sm">

      {/* Button to navigate to the home page */}
      <SidebarButton
        text={t('Home Page')}
        icon={<IconHome size={18} />}
        onClick={() => goToHome()}
      />

      {/* Button to clear conversations if there are any */}
      {conversations.length > 0 ? (
        <ClearConversations onClearConversations={handleClearConversations} />
      ) : null}

      {/* Import component for importing conversations */}
      <Import onImport={handleImportConversations} />

      {/* Button to export data */}
      <SidebarButton
        text={t('Export data')}
        icon={<IconFileExport size={18} />}
        onClick={() => handleExportData()}
      />

      {/* Button to open the settings dialog */}
      <SidebarButton
        text={t('Settings')}
        icon={<IconSettings size={18} />}
        onClick={() => setIsSettingDialog(true)}
      />

      {/* Displaying the API key input if server-side API key is not set */}
      {!serverSideApiKeyIsSet ? (
        <Key apiKey={apiKey} onApiKeyChange={handleApiKeyChange} />
      ) : null}

      {/* {!serverSidePluginKeysSet ? <PluginKeys /> : null} */}

      {/* Setting dialog for additional settings */}
      <SettingDialog
        open={isSettingDialogOpen}
        onClose={() => {
          setIsSettingDialog(false);
        }}
      />
    </div>
  );
};
