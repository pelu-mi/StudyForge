import { useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "./ResourceInfoKeyConceptsPage.styles";

export const ResourceInfoKeyConceptsPage = () => {
  const { resourceInfo } = useLocalSearchParams();
  const { keyConcepts } = JSON.parse(resourceInfo);

  return (
    <ScrollView>
      <Pressable style={styles.container}>
        {keyConcepts.map((keyConcept, index) => (
          <View key={index} style={styles.conceptWrapper}>
            <Text variant="titleLarge">{keyConcept.concept}</Text>
            <Text variant="bodyLarge">{keyConcept.concept_summary}</Text>
          </View>
        ))}
      </Pressable>
    </ScrollView>
  );
};
