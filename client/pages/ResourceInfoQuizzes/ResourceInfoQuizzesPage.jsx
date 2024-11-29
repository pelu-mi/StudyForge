import { useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "./ResourceInfoQuizzesPage.styles";
import { QuizItem } from "@/components/QuizItem";
import { EmptyList } from "@/components/EmptyList";

export const ResourceInfoQuizzesPage = () => {
  const router = useRouter();
  const { resourceInfo } = useLocalSearchParams();
  const { quiz: quizzes, numberOfQuestions } = JSON.parse(resourceInfo);

  const handlePress = (selectedIndex, id) =>
    router.push({
      pathname: `/(modals)/resourceInfo/quizzes/${id}`,
      params: { selectedIndex, resourceInfo },
    });

  return (
    <FlatList
      ListHeaderComponent={
        <Text variant="titleLarge">{numberOfQuestions} Questions</Text>
      }
      data={quizzes}
      keyExtractor={(item) => item._id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContentContainer}
      renderItem={({ item, index }) => {
        const { _id, question } = item;
        const number = index + 1;

        return (
          <TouchableOpacity onPress={() => handlePress(index, _id)}>
            <QuizItem
              {...{ number, question }}
              status="notAttempt"
              onButtonPress={() => handlePress(index, _id)}
            />
          </TouchableOpacity>
        );
      }}
      ListEmptyComponent={
        <EmptyList
          iconName="cards"
          message="No Quizzes"
          containerStyle={{ marginTop: 100 }}
        />
      }
    />
  );
};
