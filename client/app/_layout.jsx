import { KeyboardDismiss } from "@/components/KeyboardDismiss";
import { QueryClientProvider } from "@/context/QueryClientProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { UserProvider } from "@/context/UserProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <QueryClientProvider>
      <ThemeProvider>
        <UserProvider>
          <KeyboardDismiss>
            <Stack>
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="signup" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </KeyboardDismiss>
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
