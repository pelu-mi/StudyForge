import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useStyles } from "./ResourceInfoQuizDetailPage.styles";
import { Button } from "@/components/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "@/components/SafeAreaView";
import { useUpdateQuizAnswerMutation } from "@/services/api/quiz/useUpdateQuizAnswerMutation";
import Toast from "react-native-toast-message";

export const ResourceInfoQuizDetailPage = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const router = useRouter();
  const navigation = useNavigation();

  const { quizId, selectedIndex, resourceInfo } = useLocalSearchParams();
  const [resourceInfoState, setResourceInfoState] = useState(
    JSON.parse(resourceInfo)
  );
  const { _id, quiz: quizzes, numberOfQuestions } = resourceInfoState;
  const parsedSelectedIndex = JSON.parse(selectedIndex);
  const [selectedOption, setSelectedOption] = useState("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [isCheckedAnswer, setIsCheckedAnswer] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const quiz = useMemo(
    () => quizzes.find((quiz) => quiz._id === quizId),
    [quizzes, quizId]
  );
  const { option_A, option_B, option_C, option_D } = quiz;
  const OPTIONS = [
    { key: "A", value: option_A },
    { key: "B", value: option_B },
    { key: "C", value: option_C },
    { key: "D", value: option_D },
  ];

  useEffect(() => {
    navigation.setOptions({
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
                onPress: handleClose,
              },
            ]);
          }}
        >
          <MaterialCommunityIcons name="close" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [handleClose, resourceInfoState, router, navigation, theme]);

  useEffect(() => {
    if (quiz.isAnsweredCorrectly === "correct") {
      setSelectedOption(quiz.correct_option);
      setIsAnswerCorrect(true);
      setIsCheckedAnswer(true);
    }
  }, [quiz, setSelectedOption, setIsAnswerCorrect, setIsCheckedAnswer]);

  const isLastQuestion = useMemo(
    () => parsedSelectedIndex === quizzes.length - 1,
    [quizzes.length, parsedSelectedIndex]
  );

  const getOptionColor = (key) => {
    if (isCheckedAnswer) {
      // Show correct option in green
      if (showCorrectAnswer && key === quiz.correct_option) {
        return styles.correctOption;
      }
      // Selected correct option
      if (selectedOption === key && key === quiz.correct_option) {
        return styles.correctOption;
      }
      // Selected incorrect option
      if (selectedOption === key && key !== quiz.correct_option) {
        return styles.wrongOption;
      }
      // Other options remain default
      return styles.option;
    } else {
      // Highlight selected option in blue
      return selectedOption === key ? styles.selectedOption : styles.option;
    }
  };

  const resetStates = () => {
    setSelectedOption("");
    setIsAnswerCorrect(false);
    setIsCheckedAnswer(false);
    setShowCorrectAnswer(false);
  };

  const handleSelectOption = (key) => {
    if (!isCheckedAnswer) {
      setSelectedOption((prev) => (prev !== key ? key : ""));
    }
  };

  const { mutateAsync: updateQuizAnswer } = useUpdateQuizAnswerMutation({
    onSuccess: async (response) => {
      setResourceInfoState((prev) => ({ ...prev, quiz: response.data.quiz }));
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: error.message });
    },
  });

  const handleCheckAnswer = async () => {
    let questionStatus;

    setIsCheckedAnswer(true);
    setIsAnswerCorrect(selectedOption === quiz.correct_option);

    if (selectedOption === quiz.correct_option) {
      questionStatus = "correct";
    } else {
      questionStatus = "wrong";
    }

    const payload = { resourceID: _id, quizID: quizId, data: questionStatus };
    await updateQuizAnswer(payload);
  };

  const handleShowCorrectAnswer = () => {
    setShowCorrectAnswer(!showCorrectAnswer);
  };

  const handlePrev = () => {
    const previousIndex = parsedSelectedIndex - 1;
    const previousQuiz = quizzes[previousIndex];
    resetStates();

    router.push({
      pathname: `/(modals)/resourceInfo/quizzes/${previousQuiz._id}`,
      params: {
        selectedIndex: previousIndex,
        resourceInfo: JSON.stringify(resourceInfoState),
      },
    });
  };

  const handleNext = () => {
    const nextIndex = parsedSelectedIndex + 1;
    const nextQuiz = quizzes[nextIndex];
    resetStates();

    router.push({
      pathname: `/(modals)/resourceInfo/quizzes/${nextQuiz._id}`,
      params: {
        selectedIndex: nextIndex,
        resourceInfo: JSON.stringify(resourceInfoState),
      },
    });
  };

  const handleClose = () => {
    console.log("resourceInfoState", resourceInfoState);
    router.dismissTo({
      pathname: "/(modals)/resourceInfo/quizzes",
      params: { resourceInfo: JSON.stringify(resourceInfoState) },
    });
  };

  const renderPrimaryButton = () => {
    if (!isCheckedAnswer) {
      return (
        <TouchableOpacity
          onPress={handleCheckAnswer}
          disabled={selectedOption === ""}
          style={[
            styles.button,
            {
              backgroundColor:
                selectedOption === ""
                  ? theme.colors.outline
                  : theme.colors.primary,
            },
          ]}
        >
          <Text variant="titleMedium" style={styles.buttonLabel}>
            Check Answer
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <Button
        onPress={isLastQuestion ? handleClose : handleNext}
        iconRight
        icon={({ color }) =>
          !isLastQuestion && (
            <MaterialCommunityIcons
              name="arrow-right"
              size={24}
              color={color}
            />
          )
        }
        style={{ flex: 1 }}
      >
        {isLastQuestion ? "Close Quiz" : "Next"}
      </Button>
    );
  };

  return (
    <SafeAreaView>
      {/* Top */}
      <View
        style={[
          styles.top,
          isCheckedAnswer && {
            backgroundColor: isAnswerCorrect
              ? theme.colors.onSurfaceSuccess
              : theme.colors.onSurfaceSecondary,
          },
        ]}
      >
        <View style={styles.numberWrapper}>
          <Text variant="titleLarge" style={{ fontSize: 20 }}>
            # {parsedSelectedIndex + 1}
          </Text>
          <Text
            variant="bodyMedium"
            style={{ color: theme.colors.textDarkGrey }}
          >
            {" "}
            / {numberOfQuestions}
          </Text>
        </View>

        {isCheckedAnswer && (
          <View style={styles.stateWrapper}>
            <MaterialCommunityIcons
              name={isAnswerCorrect ? "check-circle" : "close-circle"}
              size={24}
              color={
                isAnswerCorrect ? theme.colors.success : theme.colors.secondary
              }
            />
            <Text variant="labelLarge">
              {isAnswerCorrect ? "Correct" : "Wrong"}
            </Text>
          </View>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Content */}
        <Text variant="titleMedium">{quiz.question}</Text>

        <View style={styles.questionsContainer}>
          {OPTIONS.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelectOption(option.key)}
              disabled={isCheckedAnswer}
            >
              <View style={[styles.optionBase, getOptionColor(option.key)]}>
                <Text variant="titleMedium">{option.key}.</Text>
                <Text variant="bodyLarge">{option.value}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Show Correct Answer Button */}
        {isCheckedAnswer && !isAnswerCorrect && (
          <Button
            onPress={handleShowCorrectAnswer}
            variant="text"
            icon={({ color }) => (
              <MaterialCommunityIcons
                name={showCorrectAnswer ? "eye-off" : "eye"}
                color={color}
                size={24}
              />
            )}
          >
            {showCorrectAnswer ? "Hide Answer" : "Show Answer"}
          </Button>
        )}
      </ScrollView>

      <View style={styles.buttonWrapper}>
        {parsedSelectedIndex !== 0 && (
          <Button
            onPress={handlePrev}
            variant="black-outlined"
            icon={({ color }) => (
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color={color}
              />
            )}
            style={{ flex: 1 }}
          >
            Previous
          </Button>
        )}

        {renderPrimaryButton()}
      </View>
    </SafeAreaView>
  );
};
