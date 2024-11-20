import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "./ResourceInfoSummaryPage.styles";

export const ResourceInfoSummaryPage = () => {
  const { resourceInfo } = useLocalSearchParams();
  const { summary } = JSON.parse(resourceInfo);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="bodyLarge">{summary}</Text>
    </ScrollView>
  );
};
