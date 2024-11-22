import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Alert, TouchableOpacity } from "react-native";

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

      {/* Quiz Screen */}
      <Stack.Screen
        name="resourceInfo/quizzes/[quizId]"
        options={({ navigation }) => ({
          title: "Quiz",
          headerBackButtonDisplayMode: "minimal",
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
