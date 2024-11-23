import { useState } from "react";
import { EmptyList } from "@/components/EmptyList";
import { useRouter } from "expo-router";
import { FlatList, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  FAB,
  Text,
  useTheme,
  TextInput as PaperTextInput,
  Menu,
} from "react-native-paper";
import { useStyles } from "./LibraryPage.styles";
import { TextInput } from "@/components/TextInput";
import { ResourceItem } from "@/components/ResourceItem";

export const LibraryPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const styles = useStyles(theme);
  const [showSortBy, setShowSortBy] = useState(false);
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
  const disabledTools = resources.length === 0;

  const renderHeader = () => (
    <View>
      <Text variant="headlineSmall" style={styles.title}>
        Library
      </Text>

      <View style={styles.toolsWrapper}>
        <TextInput
          containerStyle={styles.searchTextInput}
          left={
            <PaperTextInput.Icon
              icon="magnify"
              color={
                disabledTools ? theme.colors.outline : theme.colors.textDarkGrey
              }
            />
          }
          placeholder="Search by title"
          hideHelperTextSpace
          disabled={disabledTools}
        />
        <Menu
          visible={showSortBy}
          onDismiss={() => setShowSortBy(false)}
          anchorPosition="bottom"
          anchor={
            <TouchableOpacity
              onPress={() => setShowSortBy(true)}
              disabled={disabledTools}
            >
              <View
                style={[
                  styles.menuWrapper,
                  disabledTools && styles.menuWrapperDisabled,
                ]}
              >
                <MaterialCommunityIcons
                  name="sort"
                  size={24}
                  color={theme.colors.textDarkGrey}
                />
                <Text variant="bodyLarge" style={styles.sortText}>
                  Sort by
                </Text>
              </View>
            </TouchableOpacity>
          }
        >
          <Menu.Item onPress={() => {}} title="Title (A-Z)" />
          <Menu.Item onPress={() => {}} title="Title (Z-A)" />
        </Menu>
      </View>
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={renderHeader()}
          data={resources}
          showsVerticalScrollIndicator={false}
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
                onPress={() =>
                  router.push({
                    pathname: `/(modals)/resourceInfo`,
                    params: { resourceInfo: JSON.stringify(item) },
                  })
                }
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
          ListEmptyComponent={
            <EmptyList
              iconName="book-open-variant"
              message="No Resources"
              containerStyle={{ marginTop: 80 }}
            />
          }
        />
      </View>
      <FAB
        icon="plus"
        customSize={56}
        color={theme.colors.inverseOnSurface}
        style={styles.fab}
        onPress={() => router.push("/forge")}
      />
    </>
  );
};
