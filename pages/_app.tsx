// Import necessary components and libraries
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

// Import i18n related utilities
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

// Import global styles
import '@/styles/globals.css';

// Initialize the Inter font with Latin subset
const inter = Inter({ subsets: ['latin'] });

// Define the main App component
function App({ Component, pageProps }: AppProps<{}>) {
  // Create a new instance of QueryClient for React Query
  const queryClient = new QueryClient();

  // Render the main application structure
  return (
    <div className={inter.className}>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </div>
  );
}

export default appWithTranslation(App); // Enhance the App component with translation capabilities
