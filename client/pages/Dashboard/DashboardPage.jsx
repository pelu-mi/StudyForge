import { useUser } from "@/context/UserProvider";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import { overviewItemWidth, useStyles } from "./DashboardPage.styles";

import { OverviewItem } from "./units/OverviewItem";
import { useState } from "react";
import { ResourceItem } from "@/components/ResourceItem";
import { useRouter } from "expo-router";

export const DashboardPage = () => {
  const { user } = useUser();
  const theme = useTheme();
  const styles = useStyles(theme);
  const router = useRouter();
  const { width } = useWindowDimensions();

  const [resources] = useState([
    {
      _id: "1",
      resourceTitle: "Introduction to React Native",
      topic: "Function Components",
      field: "Computer Science",
      levelOfStudy: "Undergrad",
      completedQuiz: 25,
      isQuizCompleted: false,
      numberOfQuestions: 40,
      source: "Lorem ipsum dolor sit amet, consectetur",
      summary: "Lorem ipsum dolor sit amet, consectetur",
      keyConcepts: [
        {
          concept: "Concept Title",
          concept_summary: "Lorem ipsum dolor sit amet",
        },
        {
          concept: "Concept Title",
          concept_summary: "Lorem ipsum dolor sit amet",
        },
      ],
      quiz: [
        {
          question: "Who created the Linux operating system?",
          option_A: "Steve Jobs",
          option_B: "Bill Gates",
          option_C: "Linus Torvalds",
          option_D: "Mark Zuckerberg",
          correct_option: "C",
          _id: "673d0e1ca3d93df4424407e2",
        },
        {
          question:
            "What is a key feature of Linux that allows it to be modified and distributed freely?",
          option_A: "Proprietary license",
          option_B: "Open-source nature",
          option_C: "Closed ecosystem",
          option_D: "Subscription model",
          correct_option: "B",
          _id: "673d0e1ca3d93df4424407e3",
        },
        {
          question: "Which of the following is NOT a Linux distribution?",
          option_A: "Ubuntu",
          option_B: "Fedora",
          option_C: "Debian",
          option_D: "Windows",
          correct_option: "D",
          _id: "673d0e1ca3d93df4424407e4",
        },
      ],
    },
    {
      _id: "2",
      resourceTitle: "Introduction to C++",
      topic: "For Loop",
      field: "Computer Science",
      levelOfStudy: "Undergrad",
      completedQuiz: 0,
      isQuizCompleted: false,
      numberOfQuestions: 30,
      source: "Lorem ipsum dolor sit amet, consectetur",
      summary: "Lorem ipsum dolor sit amet, consectetur",
      keyConcepts: [
        {
          concept: "Concept Title",
          concept_summary: "Lorem ipsum dolor sit amet",
        },
        {
          concept: "Concept Title",
          concept_summary: "Lorem ipsum dolor sit amet",
        },
      ],
      quiz: [
        {
          question: "Who created the Linux operating system?",
          option_A: "Steve Jobs",
          option_B: "Bill Gates",
          option_C: "Linus Torvalds",
          option_D: "Mark Zuckerberg",
          correct_option: "C",
          _id: "673d0e1ca3d93df4424407e2",
        },
        {
          question:
            "What is a key feature of Linux that allows it to be modified and distributed freely?",
          option_A: "Proprietary license",
          option_B: "Open-source nature",
          option_C: "Closed ecosystem",
          option_D: "Subscription model",
          correct_option: "B",
          _id: "673d0e1ca3d93df4424407e3",
        },
        {
          question: "Which of the following is NOT a Linux distribution?",
          option_A: "Ubuntu",
          option_B: "Fedora",
          option_C: "Debian",
          option_D: "Windows",
          correct_option: "D",
          _id: "673d0e1ca3d93df4424407e4",
        },
      ],
    },
    {
      _id: "3",
      resourceTitle: "Object Oriented for Programming",
      topic: "Class structure",
      field: "Computer Science",
      levelOfStudy: "Undergrad",
      completedQuiz: 10,
      isQuizCompleted: true,
      numberOfQuestions: 10,
      source: "Lorem ipsum dolor sit amet, consectetur",
      summary: "Lorem ipsum dolor sit amet, consectetur",
      keyConcepts: [
        {
          concept: "Concept Title",
          concept_summary: "Lorem ipsum dolor sit amet",
        },
        {
          concept: "Concept Title",
          concept_summary: "Lorem ipsum dolor sit amet",
        },
      ],
      quiz: [
        {
          question: "Who created the Linux operating system?",
          option_A: "Steve Jobs",
          option_B: "Bill Gates",
          option_C: "Linus Torvalds",
          option_D: "Mark Zuckerberg",
          correct_option: "C",
          _id: "673d0e1ca3d93df4424407e2",
        },
        {
          question:
            "What is a key feature of Linux that allows it to be modified and distributed freely?",
          option_A: "Proprietary license",
          option_B: "Open-source nature",
          option_C: "Closed ecosystem",
          option_D: "Subscription model",
          correct_option: "B",
          _id: "673d0e1ca3d93df4424407e3",
        },
        {
          question: "Which of the following is NOT a Linux distribution?",
          option_A: "Ubuntu",
          option_B: "Fedora",
          option_C: "Debian",
          option_D: "Windows",
          correct_option: "D",
          _id: "673d0e1ca3d93df4424407e4",
        },
      ],
    },
  ]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Greeting */}
      <View style={[styles.greetingWrapper, styles.paddingHorizontal]}>
        <Text variant="headlineLarge">Hello</Text>
        <Text variant="headlineLarge" style={{ color: theme.colors.primary }}>
          {user.firstName}! 😃
        </Text>
      </View>

      <View style={[styles.section, styles.paddingHorizontal]}>
        <Text variant="titleMedium" style={styles.text}>
          Overview
        </Text>

        <View style={styles.overviewItemWrapper}>
          <OverviewItem
            label="Study Resources"
            value={3}
            iconName="book-open-variant"
            backgroundColor={theme.colors.onSurfacePrimary}
            borderColor={theme.colors.primary}
            style={{ width: overviewItemWidth }}
          />
          <OverviewItem
            label="Study Sessions"
            value={2}
            iconName="notebook"
            backgroundColor={theme.colors.onSurfaceSecondary}
            borderColor={theme.colors.secondary}
            style={{ width: overviewItemWidth }}
          />
          <OverviewItem
            label="Ongoing Quizzes"
            value={2}
            iconName="lightning-bolt"
            backgroundColor={theme.colors.onSurfaceWarning}
            borderColor={theme.colors.warning}
            style={{ width: overviewItemWidth }}
          />
          <OverviewItem
            label="Completed Quizzes"
            value={1}
            iconName="emoticon"
            backgroundColor={theme.colors.onSurfaceSuccess}
            borderColor={theme.colors.success}
            style={{ width: overviewItemWidth }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text
          variant="titleMedium"
          style={[styles.text, styles.paddingHorizontal]}
        >
          Recent Resources
        </Text>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={resources}
          renderItem={({ item }) => {
            const {
              topic,
              resourceTitle,
              field,
              levelOfStudy,
              // completedQuiz,
              isQuizCompleted,
              numberOfQuestions,
              source,
            } = item;
            return (
              <TouchableOpacity
                onPress={() => {
                  router.push({
                    pathname: `/(modals)/resourceInfo`,
                    params: { resourceInfo: JSON.stringify(item) },
                  });
                }}
                style={{ width: width * 0.82 }}
              >
                <ResourceItem
                  {...{
                    topic,
                    resourceTitle,
                    field,
                    levelOfStudy,
                    isQuizCompleted,
                    numberOfQuestions,
                    source,
                  }}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContentContainer}
        />
      </View>
    </ScrollView>
  );
};
