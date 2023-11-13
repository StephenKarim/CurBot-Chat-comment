import { IconFileImport } from '@tabler/icons-react'; // Importing the 'IconFileImport' component from the '@tabler/icons-react' library
import { FC } from 'react'; // Importing the 'FC' type from the 'react' library

import { useTranslation } from 'next-i18next'; // Importing the 'useTranslation' hook from 'next-i18next' for internationalization

import { SupportedExportFormats } from '@/types/export'; // Importing the 'SupportedExportFormats' type from the 'export' module

import { SidebarButton } from '../Sidebar/SidebarButton'; // Importing the 'SidebarButton' component from the 'SidebarButton' module

// Defining the props interface for the 'Import' component
interface Props {
  onImport: (data: SupportedExportFormats) => void;
}
// Defining the 'Import' component as a functional component
export const Import: FC<Props> = ({ onImport }) => {
  const { t } = useTranslation('sidebar'); / Using the 'useTranslation' hook to get the translation function 't' for the 'sidebar' namespace
  // Returning the JSX elements for the 'Import' component
  return (
    <>
      {/* Input element for file import, hidden from view */}
      <input
        id="import-file"
        className="sr-only"
        tabIndex={-1}
        type="file"
        accept=".json"
        onChange={(e) => {
          // Check if files are selected
          if (!e.target.files?.length) return;
          // Get the selected file
          const file = e.target.files[0];
          const reader = new FileReader();
          // Read the content of the file
          reader.onload = (e) => {
            let json = JSON.parse(e.target?.result as string);
            onImport(json); // Invoke the 'onImport' callback with the parsed JSON data
          };
          // Read the file as text
          reader.readAsText(file);
        }}
      />
      {/* Button to trigger file import */}
      <SidebarButton
        text={t('Import data')}
        icon={<IconFileImport size={18} />}
        onClick={() => {
          // Trigger the click event for the hidden file input element
          const importFile = document.querySelector(
            '#import-file',
          ) as HTMLInputElement;
          if (importFile) {
            importFile.click();
          }
        }}
      />
    </>
  );
};
