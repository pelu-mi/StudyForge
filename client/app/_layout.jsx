import { KeyboardDismiss } from "@/components/KeyboardDismiss";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <KeyboardDismiss>
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </KeyboardDismiss>
    </ThemeProvider>
  );
}
