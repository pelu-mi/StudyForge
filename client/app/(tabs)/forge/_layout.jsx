import { LogoHeaderTitle } from "@/components/LogoHeaderTitle";
import { Stack } from "expo-router";

export default function ForgeLayout() {
  return (
    <Stack screenOptions={{ headerBackButtonDisplayMode: "minimal" }}>
      <Stack.Screen
        name="index"
        options={{ title: "Forge", headerTitle: () => <LogoHeaderTitle /> }}
      />
    </Stack>
  );
}
