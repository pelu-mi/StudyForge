import { useUser } from "@/context/UserProvider";
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import { overviewItemWidth, useStyles } from "./DashboardPage.styles";

import { OverviewItem } from "./units/OverviewItem";
import { ResourceItem } from "@/components/ResourceItem";
import { useRouter } from "expo-router";
import { useRecentListQuery } from "@/services/api/dashboard/useRecentListQuery";
import { StudyAlertItem } from "../StudyAlerts/components/StudyAlertItem";
import { useOverviewQuery } from "@/services/api/dashboard/useOverviewQuery";

export const DashboardPage = () => {
  const { user } = useUser();
  const theme = useTheme();
  const styles = useStyles(theme);
  const router = useRouter();
  const { data } = useOverviewQuery();
  const { recentResources, recentAlerts, refetch, isRefetching } =
    useRecentListQuery();

  console.log("overview data", data);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={() => refetch()} />
      }
    >
      <Pressable style={styles.container}>
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
              value={"3"}
              iconName="book-open-variant"
              backgroundColor={theme.colors.onSurfacePrimary2}
              borderColor={theme.colors.primary}
              style={{ width: overviewItemWidth }}
            />
            <OverviewItem
              label="Study Sessions"
              value={"2"}
              iconName="notebook"
              backgroundColor={theme.colors.onSurfaceSecondary}
              borderColor={theme.colors.secondary}
              style={{ width: overviewItemWidth }}
            />
            <OverviewItem
              label="Ongoing Quizzes"
              value={"2"}
              iconName="lightning-bolt"
              backgroundColor={theme.colors.onSurfaceWarning}
              borderColor={theme.colors.warning}
              style={{ width: overviewItemWidth }}
            />
            <OverviewItem
              label="Completed Quizzes"
              value={"1"}
              iconName="emoticon"
              backgroundColor={theme.colors.onSurfaceSuccess}
              borderColor={theme.colors.success}
              style={{ width: overviewItemWidth }}
            />
          </View>
        </View>

        {recentResources.length > 0 && (
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
              data={recentResources}
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
                    onPress={() => {
                      router.push({
                        pathname: `/(modals)/resourceInfo`,
                        params: { resourceInfo: JSON.stringify(item) },
                      });
                    }}
                    style={styles.card}
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
            />
          </View>
        )}

        {recentAlerts.length > 0 && (
          <View style={styles.section}>
            <Text
              variant="titleMedium"
              style={[styles.text, styles.paddingHorizontal]}
            >
              Recent Study Alerts
            </Text>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={recentAlerts}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: `/(modals)/studyAlerts/${item._id}`,
                      params: { studyAlert: JSON.stringify(item) },
                    })
                  }
                  style={styles.card}
                >
                  <StudyAlertItem
                    studyAlertId={item._id}
                    time={item.time}
                    days={item.day}
                    status={item.status}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.listContentContainer}
            />
          </View>
        )}
      </Pressable>
    </ScrollView>
  );
};
