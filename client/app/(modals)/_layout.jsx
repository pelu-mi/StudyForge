import { BackButton } from "@/components/BackButton";
import { Stack } from "expo-router";

export default function ModalsLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: "minimal",
        headerLeft: () => <BackButton />,
      }}
    >
      {/* Resource Info Screen */}
      <Stack.Screen
        name="resourceInfo/index"
        options={{
          title: "Resource Info",
        }}
      />

      {/* Resource Settings Screen */}
      <Stack.Screen
        name="resourceInfo/settings"
        options={{
          title: "Resource Settings",
        }}
      />

      {/* Source Screen */}
      <Stack.Screen
        name="resourceInfo/source"
        options={{
          title: "Source",
        }}
      />

      {/* Summary Screen */}
      <Stack.Screen
        name="resourceInfo/summary"
        options={{
          title: "Summary",
        }}
      />

      {/* Key Concepts Screen */}
      <Stack.Screen
        name="resourceInfo/keyConcepts"
        options={{
          title: "Key Concepts",
        }}
      />

      {/* Quizzes Screen */}
      <Stack.Screen
        name="resourceInfo/quizzes/index"
        options={{
          title: "Quizzes",
        }}
      />

      {/* Quiz Screen */}
      <Stack.Screen
        name="resourceInfo/quizzes/[quizId]"
        options={{
          title: "Quiz",
          presentation: "fullScreenModal",
        }}
      />
    </Stack>
  );
}
