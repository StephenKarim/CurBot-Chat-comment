// Importing FC (Functional Component) and memo from 'react'
import { FC, memo } from "react";

// Importing the ChatMessage component and its Props interface
import { ChatMessage, Props } from "./ChatMessage";

// Memoized version of the ChatMessage component
export const MemoizedChatMessage: FC<Props> = memo(
    ChatMessage, // The component to memoize
    (prevProps, nextProps) => (
        // Memoization based on the content of the message
        prevProps.message.content === nextProps.message.content
    )
);

