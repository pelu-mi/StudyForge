import { useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "./ResourceInfoSummaryPage.styles";

export const ResourceInfoSummaryPage = () => {
  const { resourceInfo } = useLocalSearchParams();
  const { summary } = JSON.parse(resourceInfo);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable>
        <Text variant="bodyLarge">{summary}</Text>
      </Pressable>
    </ScrollView>
  );
};
