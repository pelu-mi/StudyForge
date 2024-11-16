import { useRouter } from "expo-router";
import { FlatList, TouchableOpacity, View } from "react-native";
import { FAB, Text, useTheme } from "react-native-paper";
import { useStyles } from "./StudyAlertsPage.styles";
import { StudyAlertItem } from "./components/StudyAlertItem";
import { useStudyAlertsQuery } from "@/services/api/studyAlerts/useStudyAlertsQuery";
import { EmptyList } from "@/components/EmptyList";

export const StudyAlertsPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const styles = useStyles(theme);
  const { studyAlerts } = useStudyAlertsQuery();
  console.log("studyAlerts", studyAlerts);

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall">Study Alerts</Text>
      <FlatList
        data={studyAlerts}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push("/profile/studyAlert/editStudyAlert")}
          >
            <StudyAlertItem time={item.time} days={item.day} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={
          <EmptyList
            iconName="alarm"
            message="No Study Alerts"
            containerStyle={{ marginTop: 100 }}
          />
        }
      />
      <FAB
        icon="plus"
        customSize={56}
        color={theme.colors.inverseOnSurface}
        style={styles.fab}
        onPress={() => router.push("/profile/studyAlert/addStudyAlert")}
      />
    </View>
  );
};
