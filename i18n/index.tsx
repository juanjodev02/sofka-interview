import RNLanguageDetector from "@os-team/i18next-react-native-language-detector";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import es from "./es.json";

export const init = async (lng: string): Promise<typeof i18n> => {
  await i18n
    .use(initReactI18next)
    .use(RNLanguageDetector)
    .init({
      compatibilityJSON: "v3",
      lng,
      supportedLngs: ["es", "en"],
      resources: {
        es: {
          translation: es,
        },
        en: {
          translation: en,
        },
      },
      fallbackLng: "es",
      interpolation: {
        escapeValue: false,
      },
    });

  return i18n;
};
