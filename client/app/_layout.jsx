/**
 * Import Modules
 */
import { AppProvider } from "@/context/AppProvider";
import { Stack } from "expo-router";

/**
 * App Layout
 * 
 * @returns App's root layout
 */
export default function RootLayout() {
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(modals)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </AppProvider>
  );
}
