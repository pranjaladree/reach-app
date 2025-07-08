import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import {
  SQLiteProvider,
  useSQLiteContext,
  type SQLiteDatabase,
} from "expo-sqlite";
import { Provider } from "react-redux";

import { useColorScheme } from "@/hooks/useColorScheme";
import { store } from "@/store/store";
import { migrateDbIfNeeded } from "@/database/database";
import { PaperProvider } from "react-native-paper";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SQLiteProvider databaseName="reachlite.db" onInit={migrateDbIfNeeded}>
      <Provider store={store}>
        <PaperProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen
                name="(auth)/login"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
              <Stack.Screen
                name="(other)/add-student"
                options={{
                  headerTitle: "Add New Student",
                }}
              />
              <Stack.Screen
                name="(other)/update-student"
                options={{
                  headerTitle: "Update Student",
                }}
              />
              <Stack.Screen
                name="(other)/screening-list"
                options={{
                  headerTitle: "Primary Screening",
                }}
              />
              <Stack.Screen
                name="(other)/reason-for-referral"
                options={{
                  headerTitle: "Referral Form",
                }}
              />
              <Stack.Screen
                name="(other)/screening-detail"
                options={{
                  headerTitle: "Primary Screening",
                }}
              />
              <Stack.Screen
                name="(other)/mr-tag-list"
                options={{
                  headerTitle: "Detailed Evaluation",
                }}
              />
              <Stack.Screen
                name="(other)/mr-tag-detail"
                options={{
                  headerTitle: "Detailed Evaluation",
                }}
              />
              <Stack.Screen
                name="(other)/qr-list"
                options={{
                  headerTitle: "View QR Code",
                }}
              />
              <Stack.Screen
                name="(other)/spectacle-list"
                options={{
                  headerTitle: "Spectacle Booking",
                }}
              />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </PaperProvider>
      </Provider>
    </SQLiteProvider>
  );
}
