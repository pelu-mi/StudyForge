import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "./ResourceInfoSourcePage.styles";

export const ResourceInfoSourcePage = () => {
  const { resourceInfo } = useLocalSearchParams();
  const { source } = JSON.parse(resourceInfo);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="bodyLarge">{source}</Text>
    </ScrollView>
  );
};
