import { FC, memo } from 'react'; // Importing React and necessary libraries
import ReactMarkdown, { Options } from 'react-markdown';

// Memoized version of ReactMarkdown component
export const MemoizedReactMarkdown: FC<Options> = memo(
    ReactMarkdown,
    // Memoization with custom equality check based on children prop
    (prevProps, nextProps) => (
        prevProps.children === nextProps.children
    )
);
