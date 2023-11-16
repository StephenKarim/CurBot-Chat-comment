// Importing the IconCircleX component from @tabler/icons-react library
import { IconCircleX } from '@tabler/icons-react';

// Importing React and FC (Functional Component) from 'react'
import { FC } from 'react';

// Importing the ErrorMessage type from '@/types/error'
import { ErrorMessage } from '@/types/error';

// Props interface for the ErrorMessageDiv component
interface Props {
  error: ErrorMessage;
}

// Functional component for displaying error messages
export const ErrorMessageDiv: FC<Props> = ({ error }) => {
  return (
    <div className="mx-6 flex h-full flex-col items-center justify-center text-red-500">
      {/* Icon representation for error */}
      <div className="mb-5">
        <IconCircleX size={36} />
      </div>
      {/* Displaying the error title with styling */}
      <div className="mb-3 text-2xl font-medium">{error.title}</div>
      {/* Mapping over messageLines and displaying each line with styling */}
      {error.messageLines.map((line, index) => (
        <div key={index} className="text-center">
          {' '}
          {line}{' '}
        </div>
      ))}
      {/* Displaying additional information (code) with styling if available */}
      <div className="mt-4 text-xs opacity-50 dark:text-red-400">
        {error.code ? <i>Code: {error.code}</i> : ''}
      </div>
    </div>
  );
};

