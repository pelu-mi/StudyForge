import { BackButton } from "@/components/BackButton";
import { LogoHeaderTitle } from "@/components/LogoHeaderTitle";
import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      {/* Main Profile Screen */}
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
          headerTitle: () => <LogoHeaderTitle />,
        }}
      />

      {/* Account Screen */}
      <Stack.Screen
        name="account"
        options={{
          title: "Account",
          headerLeft: () => <BackButton />,
        }}
      />

      {/* Account Screen */}
      <Stack.Screen
        name="changePassword"
        options={{
          title: "Change Password",
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack>
  );
}
