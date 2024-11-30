import { useRouter } from "expo-router";
import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import { FAB, Text, useTheme } from "react-native-paper";
import { useStyles } from "./StudyAlertsPage.styles";
import { StudyAlertItem } from "./components/StudyAlertItem";
import { useStudyAlertsQuery } from "@/services/api/studyAlerts/useStudyAlertsQuery";
import { EmptyList } from "@/components/EmptyList";

export const StudyAlertsPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const styles = useStyles(theme);
  const { studyAlerts, isFetching, refetch, isRefetching } =
    useStudyAlertsQuery();

  return (
    <>
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={
            <Text variant="headlineSmall">Study Alerts</Text>
          }
          data={studyAlerts}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={() => refetch()}
            />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: `/(modals)/studyAlerts/${item._id}`,
                  params: { studyAlert: JSON.stringify(item) },
                })
              }
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
          ListEmptyComponent={
            <EmptyList
              iconName="alarm"
              message="No Study Alerts"
              containerStyle={{ marginTop: 100 }}
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
        onPress={() => router.push("/(modals)/studyAlerts/addStudyAlert")}
      />
    </>
  );
};
