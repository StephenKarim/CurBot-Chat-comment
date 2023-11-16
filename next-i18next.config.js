module.exports = {
  i18n: {
    defaultLocale: 'en', // Default locale when no language is explicitly specified
    locales: [
      "bn", // Bengali
      "de", // German
      "en", // English
      "es", // Spanish
      "fr", // French
      "he", // Hebrew
      "id", // Indonesian
      "it", // Italian
      "ja", // Japanese
      "ko", // Korean
      "pl", // Polish
      "pt", // Portuguese
      "ru", // Russian
      "ro", // Romanian
      "sv", // Swedish
      "te", // Telugu
      "vi", // Vietnamese
      "zh", // Chinese
      "ar", // Arabic
      "tr", // Turkish
      "ca", // Catalan
      "fi", // Finnish
    ],
  },
  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales') // Path to locale files in the server-side
      : '/public/locales', // Path to locale files in the client-side (browser)
};
