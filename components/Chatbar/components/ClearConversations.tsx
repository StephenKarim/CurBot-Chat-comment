// Importing necessary dependencies and components
import { IconCheck, IconTrash, IconX } from '@tabler/icons-react';
import { FC, useState } from 'react';

import { useTranslation } from 'next-i18next';

import { SidebarButton } from '@/components/Sidebar/SidebarButton';

// Props interface for ClearConversations component
interface Props {
  onClearConversations: () => void;
}

// ClearConversations functional component
export const ClearConversations: FC<Props> = ({ onClearConversations }) => {
  // State to manage the confirmation dialog
  const [isConfirming, setIsConfirming] = useState<boolean>(false);

  // Translation hook
  const { t } = useTranslation('sidebar');

  // Function to handle the clear conversations action
  const handleClearConversations = () => {
    onClearConversations();
    setIsConfirming(false);
  };

  // Rendering the confirmation dialog or clear conversations button
  return isConfirming ? (
    // Confirmation dialog
    <div className="flex w-full cursor-pointer items-center rounded-lg py-3 px-3 hover:bg-gray-500/10">
      
      
      <IconTrash size={18} />

      <div className="ml-3 flex-1 text-left text-[12.5px] leading-3 text-white">
        {t('Are you sure?')}
      </div>

      <div className="flex w-[40px]">
        {/* Check icon to confirm the action */}
        <IconCheck
          className="ml-auto mr-1 min-w-[20px] text-neutral-400 hover:text-neutral-100"
          size={18}
          onClick={(e) => {
            e.stopPropagation();
            handleClearConversations();
          }}
        />

        {/* Close icon to cancel the action */}
        <IconX
          className="ml-auto min-w-[20px] text-neutral-400 hover:text-neutral-100"
          size={18}
          onClick={(e) => {
            e.stopPropagation();
            setIsConfirming(false);
          }}
        />
      </div>
    </div>
  ) : (
    // Clear conversations button
    <SidebarButton
      text={t('Clear conversations')}
      icon={<IconTrash size={18} />}
      onClick={() => setIsConfirming(true)}
    />
  );
};
