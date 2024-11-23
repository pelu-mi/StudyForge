import { LogoHeaderTitle } from "@/components/LogoHeaderTitle";
import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerBackButtonDisplayMode: "minimal" }}>
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
        }}
      />

      {/* Account Screen */}
      <Stack.Screen
        name="changePassword"
        options={{
          title: "Change Password",
        }}
      />

      {/* Study Alerts Screen */}
      <Stack.Screen
        name="studyAlert/index"
        options={{
          title: "Study Alerts",
          headerTitle: () => <LogoHeaderTitle />,
        }}
      />

      {/* Add Study Alert Screen */}
      <Stack.Screen
        name="studyAlert/addStudyAlert"
        options={{
          title: "Add Study Alerts",
        }}
      />

      {/* Add Study Alert Screen */}
      <Stack.Screen
        name="studyAlert/[studyAlertId]"
        options={{
          title: "Edit Study Alerts",
        }}
      />
    </Stack>
  );
}
