import { Back, QueryProvider, Text } from "@components";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLoadI18n } from "@hooks";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LogBox, useColorScheme } from "react-native";
import "react-native-reanimated";

LogBox.ignoreLogs(["Require cycle"]);

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

SplashScreen.preventAutoHideAsync().catch(console.error);

export default function RootLayout() {
  const [fontLoaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    PreloSlab: require("../assets/fonts/PreloSlab-Bold.ttf"),
    ...AntDesign.font,
  });
  const { i18nLoaded, error: i18Error } = useLoadI18n();

  const areAssetsLoading = !fontLoaded || !i18nLoaded;

  useEffect(() => {
    if (error) throw error;
    if (i18Error) throw i18Error;
  }, [error, i18Error]);

  useEffect(() => {
    if (!areAssetsLoading) {
      SplashScreen.hideAsync().catch(console.error);
    }
  }, [areAssetsLoading]);

  if (areAssetsLoading) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerTitle: () => <Text variant="title">{t("home.title")}</Text>,
            }}
          />
          <Stack.Screen
            name="details/[id]"
            options={{
              headerTitle: () => (
                <Text variant="title">{t("details.title")}</Text>
              ),
              headerBackVisible: false,
              headerLeft: () => <Back />,
            }}
          />
          <Stack.Screen
            name="forms/financialProductForm"
            options={{
              headerTitle: () => <Text variant="title">{t("form.title")}</Text>,
              headerBackVisible: false,
              headerLeft: () => <Back />,
            }}
          />
          <Stack.Screen
            name="utils/success"
            options={{
              headerTitle: () => (
                <Text variant="title">{t("success.title")}</Text>
              ),
              headerBackVisible: false,
              headerLeft: () => <Back />,
            }}
          />
        </Stack>
      </QueryProvider>
    </ThemeProvider>
  );
}
