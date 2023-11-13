// Importing necessary icons and libraries
import { IconCheck, IconClipboard, IconDownload } from '@tabler/icons-react';
import { FC, memo, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// Importing translation utility and code generation functions
import { useTranslation } from 'next-i18next';

import {
  generateRandomString,
  programmingLanguages,
} from '@/utils/app/codeblock';

// Define Props interface for the CodeBlock component
interface Props {
  language: string;
  value: string;
}
// CodeBlock component definition
export const CodeBlock: FC<Props> = memo(({ language, value }) => {
  const { t } = useTranslation('markdown'); // Access translation function
  const [isCopied, setIsCopied] = useState<Boolean>(false); // State for tracking copy success

  // Function to copy code to clipboard
  const copyToClipboard = () => {
    // Check if clipboard API is supported
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      return;
    }

    // Write code to clipboard
    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true); // Set copy success state and reset after 2 seconds

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };
  // Function to download code as a file
  const downloadAsFile = () => {
    const fileExtension = programmingLanguages[language] || '.file'; // Determine file extension based on language or default to '.file'
    const suggestedFileName = `file-${generateRandomString( 
      3,
      true,
    )}${fileExtension}`;  // Generate a suggested file name
    const fileName = window.prompt(
      t('Enter file name') || '',
      suggestedFileName,
    ); // Prompt user for file name

    if (!fileName) {
      // Check if user pressed cancel on prompt
      return;
    }

    // Create a Blob containing the code
    const blob = new Blob([value], { type: 'text/plain' });
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    link.style.display = 'none';
    // Append the link to the document, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  // Return the CodeBlock component UI
  return (
    <div className="codeblock relative font-sans text-[16px]">
      <div className="flex items-center justify-between py-1.5 px-4">
        {/* Display the code language */}
        <span className="text-xs lowercase text-white">{language}</span>

        {/* Copy to clipboard and download buttons */}
        <div className="flex items-center">
          <button
            className="flex gap-1.5 items-center rounded bg-none p-1 text-xs text-white"
            onClick={copyToClipboard}
          >
            {isCopied ? <IconCheck size={18} /> : <IconClipboard size={18} />}
            {isCopied ? t('Copied!') : t('Copy code')}
          </button>
          {/* Download as file button */}
          <button
            className="flex items-center rounded bg-none p-1 text-xs text-white"
            onClick={downloadAsFile}
          >
            <IconDownload size={18} />
          </button>
        </div>
      </div>

       {/* Syntax highlighting for the code */}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{ margin: 0 }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
});
CodeBlock.displayName = 'CodeBlock'; // Set display name for the CodeBlock component
