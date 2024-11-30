import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { FlatList, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "./ResourceInfoQuizzesPage.styles";
import { QuizItem } from "@/components/QuizItem";
import { EmptyList } from "@/components/EmptyList";
import { useEffect } from "react";
import { BackButton } from "@/components/BackButton";

export const ResourceInfoQuizzesPage = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { resourceInfo } = useLocalSearchParams();
  const { quiz: quizzes, numberOfQuestions } = JSON.parse(resourceInfo);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          onPress={() => {
            router.dismissTo({
              pathname: "/(modals)/resourceInfo",
              params: { resourceInfo },
            });
          }}
        />
      ),
    });
  }, [navigation, router, resourceInfo]);

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
        const { _id, question, isAnsweredCorrectly } = item;
        const number = index + 1;

        return (
          <TouchableOpacity onPress={() => handlePress(index, _id)}>
            <QuizItem
              {...{ number, question }}
              status={isAnsweredCorrectly}
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
