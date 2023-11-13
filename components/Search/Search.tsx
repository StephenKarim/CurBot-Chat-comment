import { IconX } from '@tabler/icons-react'; // Importing the IconX component from the '@tabler/icons-react' library
import { FC } from 'react'; // Importing the FC (FunctionComponent) type from the 'react' library

import { useTranslation } from 'next-i18next'; // Importing the useTranslation hook from 'next-i18next' for internationalization

// Defining the structure of props expected by the Search component
interface Props {
  placeholder: string;
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
}
// Defining the Search component as a functional component with the specified props
const Search: FC<Props> = ({ placeholder, searchTerm, onSearch }) => {
  const { t } = useTranslation('sidebar'); // Destructuring the 't' function from the useTranslation hook for translation
// Event handler for handling changes in the search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value); // Calling the onSearch prop with the updated search term
  };
  // Event handler for clearing the search term
  const clearSearch = () => {
    onSearch('');// Calling the onSearch prop with an empty string to clear the search term
  };
// JSX rendering for the Search component
  return (
    <div className="relative flex items-center">
       {/* Input element for entering the search term */}
      <input
        className="w-full flex-1 rounded-md border border-neutral-600 bg-[#202123] px-4 py-3 pr-10 text-[14px] leading-3 text-white"
        type="text"
        placeholder={t(placeholder) || ''}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {/* Render the clear search icon (IconX) if there is a search term */}
      {searchTerm && (
        <IconX
          className="absolute right-4 cursor-pointer text-neutral-300 hover:text-neutral-400"
          size={18}
          onClick={clearSearch}
        />
      )}
    </div>
  );
};

export default Search; // Exporting the Search component as the default export
