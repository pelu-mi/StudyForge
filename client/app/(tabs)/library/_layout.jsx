import { Stack } from "expo-router";

export default function LibraryLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Library" }} />

      {/* Resource Info Screen */}
      <Stack.Screen
        name="resourceInfo/index"
        options={{
          title: "Resource Info",
          headerBackButtonDisplayMode: "minimal",
        }}
      />

      {/* Source Screen */}
      <Stack.Screen
        name="resourceInfo/source"
        options={{
          title: "Source",
          headerBackButtonDisplayMode: "minimal",
        }}
      />

      {/* Summary Screen */}
      <Stack.Screen
        name="resourceInfo/summary"
        options={{
          title: "Summary",
          headerBackButtonDisplayMode: "minimal",
        }}
      />

      {/* Key Concepts Screen */}
      <Stack.Screen
        name="resourceInfo/keyConcepts"
        options={{
          title: "Key Concepts",
          headerBackButtonDisplayMode: "minimal",
        }}
      />

      {/* Quizzes Screen */}
      <Stack.Screen
        name="resourceInfo/quizzes/index"
        options={{
          title: "Quizzes",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
}
