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
      numberOfQuestions: 40,
      source: {
        name: "sample.pdf",
        size: 18810,
        type: "application/pdf",
        uri: "uri",
      },
    },
    {
      _id: "2",
      resourceTitle: "Introduction to C++",
      topic: "For Loop",
      field: "Computer Science",
      levelOfStudy: "Undergrad",
      completedQuiz: 0,
      numberOfQuestions: 30,
      source: {
        name: "React_For_Loop.pdf",
        size: 18810,
        type: "application/pdf",
        uri: "uri",
      },
    },
    {
      _id: "3",
      resourceTitle: "Object Oriented for Programming",
      topic: "Class structure",
      field: "Computer Science",
      levelOfStudy: "Undergrad",
      completedQuiz: 10,
      numberOfQuestions: 10,
      source: "Lorem ipsum dolor sit amet, consectetur",
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
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={
                () => {}
                // router.push({
                //   pathname: `/profile/studyAlert/${item._id}`,
                //   params: { studyAlert: JSON.stringify(item) },
                // })
              }
            >
              <ResourceItem {...item} />
            </TouchableOpacity>
          )}
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
