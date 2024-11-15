import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Profile" }} />
      <Stack.Screen
        name="changePassword"
        options={{ title: "Change Password" }}
      />
      <Stack.Screen name="account" options={{ title: "Account" }} />
    </Stack>
  );
}
