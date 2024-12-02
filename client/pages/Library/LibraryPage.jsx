import { useCallback, useEffect, useMemo, useState } from "react";
import { EmptyList } from "@/components/EmptyList";
import { useNavigation, useRouter } from "expo-router";
import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
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
import { useResourcesQuery } from "@/services/api/library/useResourcesQuery";
import { useColorMode } from "@/context/ColorModeProvider";

export const LibraryPage = () => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const navigation = useNavigation();
  const theme = useTheme();
  const styles = useStyles(theme);
  const [showSortBy, setShowSortBy] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const [sortLabel, setSortLabel] = useState("Sort by");
  const { resources, isFetching, refetch, isRefetching } = useResourcesQuery();
  const disabledTools = useMemo(() => resources.length === 0, [resources]);

  const filteredResources = useMemo(() => {
    let filteredData = resources.filter((resource) =>
      resource.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort by title based on the selected sort order
    if (sortOrder === "asc") {
      filteredData = filteredData.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else {
      filteredData = filteredData.sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    }

    return filteredData;
  }, [resources, searchQuery, sortOrder]);

  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleSortChange = (order) => {
    if (sortOrder === order) {
      setSortOrder(null);
      setSortLabel("Sort by"); // Reset to default
    } else {
      setSortOrder(order);
      setSortLabel(order === "asc" ? "Title (A-Z)" : "Title (Z-A)");
    }
    setShowSortBy(false);
  };

  useEffect(() => {
    const blurUnsubscribe = navigation.addListener("blur", () => {
      setSearchQuery("");
      setSortOrder(null);
      setSortLabel("Sort by");
    });
    return () => {
      blurUnsubscribe();
    };
  }, [navigation, setSearchQuery, setSortOrder, setSortLabel]);

  const renderHeader = () => (
    <View>
      <Text variant="headlineSmall" style={styles.title}>
        Library
      </Text>

      <View style={styles.toolsWrapper}>
        <TextInput
          containerStyle={styles.searchTextInputContainer}
          style={
            disabledTools && colorMode === "dark"
              ? styles.searchDisabledTextInput
              : {}
          }
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
          value={searchQuery}
          onChangeText={handleSearchChange}
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
                  {sortLabel}
                </Text>
              </View>
            </TouchableOpacity>
          }
        >
          <Menu.Item
            onPress={() => handleSortChange("asc")}
            title="Title (A-Z)"
            style={
              sortOrder === "asc"
                ? { backgroundColor: theme.colors.surfaceVariant }
                : {}
            }
          />
          <Menu.Item
            onPress={() => handleSortChange("desc")}
            title="Title (Z-A)"
            style={
              sortOrder === "desc"
                ? { backgroundColor: theme.colors.surfaceVariant }
                : {}
            }
          />
        </Menu>
      </View>
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={renderHeader()}
          data={filteredResources}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={() => refetch()}
            />
          }
          renderItem={({ item }) => {
            const {
              topic,
              title,
              field,
              levelOfStudy,
              isQuizCompleted,
              numberOfQuestions,
              sourceType,
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
                    title,
                    field,
                    levelOfStudy,
                    isQuizCompleted,
                    numberOfQuestions,
                    sourceType,
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
              isLoading={isFetching}
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
