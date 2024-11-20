import { useLocalSearchParams } from "expo-router";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "./ResourceInfoQuizzesPage.styles";
import { QuizItem } from "@/components/QuizItem";
import { EmptyList } from "@/components/EmptyList";

export const ResourceInfoQuizzesPage = () => {
  const { resourceInfo } = useLocalSearchParams();
  const { quiz: quizzes, numberOfQuestions } = JSON.parse(resourceInfo);

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <Text variant="titleLarge">{numberOfQuestions} Questions</Text>
        }
        data={quizzes}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContentContainer}
        renderItem={({ item, index }) => {
          const { question } = item;

          return (
            <TouchableOpacity
              onPress={
                () => {}
                // router.push({
                //   pathname: `/library/resourceInfo`,
                //   params: { resourceInfo: JSON.stringify(item) },
                // })
              }
            >
              <QuizItem
                number={index + 1}
                status="notAttempt"
                onButtonPress={() => {}}
                {...{ question }}
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
    </View>
  );
};
