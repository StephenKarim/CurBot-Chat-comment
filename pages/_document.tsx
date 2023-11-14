// Import necessary components and types from Next.js
import { DocumentProps, Head, Html, Main, NextScript } from 'next/document';

// Import i18n configuration
import i18nextConfig from '../next-i18next.config';

// Define the custom document props
type Props = DocumentProps & {
  // add custom document props
};

// Define the custom Document component
export default function Document(props: Props) {
  // Get the current locale from the Next.js data or use the default locale from i18n config
  const currentLocale =
    props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale;
  // Render the HTML structure for the document
  return (
    <Html lang={currentLocale}>
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="CurBot"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
