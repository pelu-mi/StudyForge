import { Stack } from "expo-router";

export default function ForgeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Forge" }} />
    </Stack>
  );
}
