import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

export const StudyAlertsPage = () => {
  const router = useRouter();
  return (
    <View>
      <TouchableOpacity
        onPress={() => router.push("/profile/studyAlert/addStudyAlert")}
      >
        <Text>Study Alert Page</Text>
      </TouchableOpacity>
    </View>
  );
};
