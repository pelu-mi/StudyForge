import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      {/* Main Profile Screen */}
      <Stack.Screen
        name="index"
        options={{ title: "Profile", headerBackButtonDisplayMode: "minimal" }}
      />

      {/* Study Alerts Screen */}
      <Stack.Screen
        name="studyAlert/index"
        options={{
          title: "Study Alerts",
          headerBackButtonDisplayMode: "minimal",
        }}
      />

      {/* Add Study Alert Screen */}
      <Stack.Screen
        name="studyAlert/addStudyAlert"
        options={{
          title: "Add Study Alerts",
          headerBackButtonDisplayMode: "minimal",
        }}
      />

      {/* Add Study Alert Screen */}
      <Stack.Screen
        name="studyAlert/[studyAlertId]"
        options={{
          title: "Edit Study Alerts",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
}
