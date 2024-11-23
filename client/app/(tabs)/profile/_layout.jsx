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

      {/* Study Alerts Screen */}
      <Stack.Screen
        name="studyAlert/index"
        options={{
          title: "Study Alerts",
          headerTitle: () => <LogoHeaderTitle />,
          headerLeft: () => <BackButton />,
        }}
      />

      {/* Add Study Alert Screen */}
      <Stack.Screen
        name="studyAlert/addStudyAlert"
        options={{
          title: "Add Study Alerts",
          headerLeft: () => <BackButton />,
        }}
      />

      {/* Add Study Alert Screen */}
      <Stack.Screen
        name="studyAlert/[studyAlertId]"
        options={{
          title: "Edit Study Alerts",
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack>
  );
}
