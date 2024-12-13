/**
 * Import Modules
 */
import { Button } from "@/components/Button";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useStyles } from "./StudyAlertDetailPage.styles";
import { useMemo } from "react";
import { DAYS, useStudyAlertForm } from "./hooks/useStudyAlertForm";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FormTimePicker } from "@/components/Form/FormTimePicker/FormTimePicker";
import { useDeleteStudyAlertMutation } from "@/services/api/studyAlerts/useDeleteStudyAlertMutation";
import Toast from "react-native-toast-message";

/**
 * StudyAlertDetailPage
 * 
 * @returns StudyAlertDetailPage
 */
export const StudyAlertDetailPage = () => {
  const { studyAlertId } = useLocalSearchParams();
  const theme = useTheme();
  const router = useRouter();
  const styles = useStyles(theme);
  const { handleSubmit, control, watch, setValue } = useStudyAlertForm();

  const isAdd = useMemo(() => !studyAlertId, [studyAlertId]);
  const selectedDays = watch("day");

  const buttonLabel = () => (isAdd ? "Add Study Alert" : "Update Study Alert");

  const handleSetDays = (day) => {
    let newDays;

    if (selectedDays.includes(day)) {
      if (selectedDays.length === 1) return;

      newDays = selectedDays.filter((selectedDay) => selectedDay !== day);
    } else {
      newDays = [...selectedDays, day];
    }

    setValue("day", newDays);
  };

  // Delete Study Alert mutation
  const { mutateAsync: deleteStudyAlert } = useDeleteStudyAlertMutation({
    onSuccess: (reponse) => {
      Toast.show({ type: "success", text1: reponse.message });
      router.back();
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: error.message });
    },
  });

  const handleDeleteStudyAlert = () => {
    Alert.alert("Are you sure you want to delete this study alert?", "", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => deleteStudyAlert({ id: studyAlertId }),
        style: "destructive",
      },
    ]);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Time Picker */}
        <FormTimePicker
          name="time"
          style={styles.timePicker}
          {...{ control }}
        />

        <Text variant="titleMedium" style={styles.text}>
          Repeats every
        </Text>
        <View style={styles.buttonWrapper}>
          {DAYS.map((day, index) => {
            const isSelected = selectedDays.includes(day);

            return (
              <TouchableOpacity key={index} onPress={() => handleSetDays(day)}>
                <Text
                  variant="titleMedium"
                  style={[
                    styles.button,
                    {
                      backgroundColor: isSelected
                        ? theme.colors.primary
                        : theme.colors.inverseOnSurface,
                      color: isSelected
                        ? theme.colors.inverseOnSurface
                        : theme.colors.text,
                    },
                  ]}
                >
                  {day.slice(0, 3)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Button onPress={handleSubmit}>{buttonLabel()}</Button>
      </View>

      {!isAdd && (
        <View style={styles.dangerZoneContainer}>
          <Text variant="titleMedium" style={styles.text}>
            Danger Zone
          </Text>
          <Button variant="red-outlined" onPress={handleDeleteStudyAlert}>
            Delete Study Alert
          </Button>
        </View>
      )}
    </ScrollView>
  );
};
