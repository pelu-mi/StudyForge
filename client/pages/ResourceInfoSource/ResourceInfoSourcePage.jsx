import { useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "./ResourceInfoSourcePage.styles";

export const ResourceInfoSourcePage = () => {
  const { resourceInfo } = useLocalSearchParams();
  const { textSource, generatedTextFromFile } = JSON.parse(resourceInfo);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable>
        <Text variant="bodyLarge">{textSource || generatedTextFromFile}</Text>
      </Pressable>
    </ScrollView>
  );
};
