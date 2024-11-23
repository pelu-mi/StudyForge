import { BackButton } from "@/components/BackButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Alert, TouchableOpacity } from "react-native";

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
        options={({ navigation }) => ({
          title: "Quiz",
          presentation: "fullScreenModal",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                Alert.alert("Are you sure you want to leave the quiz?", "", [
                  {
                    text: "Stay",
                    style: "cancel",
                  },
                  {
                    text: "Leave",
                    style: "destructive",
                    onPress: () => navigation.goBack(),
                  },
                ]);
              }}
            >
              <MaterialCommunityIcons name="close" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack>
  );
}
