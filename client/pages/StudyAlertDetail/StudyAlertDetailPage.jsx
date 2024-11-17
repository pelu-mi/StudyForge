import { Button } from "@/components/Button";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useStyles } from "./StudyAlertDetailPage.styles";
import { useMemo } from "react";
import { useStudyAlertForm } from "./hooks/useStudyAlertForm";
import { useLocalSearchParams } from "expo-router";
import { FormTimePicker } from "@/components/Form/FormTimePicker/FormTimePicker";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const StudyAlertDetailPage = () => {
  const { studyAlertId } = useLocalSearchParams();
  const theme = useTheme();
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
          <Button variant="red-outlined">Delete Study Alert</Button>
        </View>
      )}
    </ScrollView>
  );
};
