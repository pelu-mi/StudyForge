import dayjs from "dayjs";
import PropTypes from "prop-types";
import { Switch, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useStyles } from "./StudyAlertItem.styles";
import Feather from "@expo/vector-icons/Feather";
import { useUpdateStudyAlertMutation } from "@/services/api/studyAlerts/useUpdateStudyAlertMutation";
import Toast from "react-native-toast-message";
import { useState } from "react";

export const StudyAlertItem = ({ studyAlertId, time, days, status }) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const formattedTime = dayjs(time).format("h:mm A");
  const [switchStatus, setSwitchStatus] = useState(status);

  const { mutateAsync: updateStudyAlert } = useUpdateStudyAlertMutation({
    onError: (error) => {
      Toast.show({ type: "error", text1: error.message });
    },
  });

  const handleToggle = async () => {
    if (switchStatus === "active") {
      setSwitchStatus("inactive");
    } else {
      setSwitchStatus("active");
    }

    await updateStudyAlert({
      id: studyAlertId,
      status: status === "active" ? "inactive" : "active",
    });
  };

  return (
    <View style={styles.alertContainer}>
      <View style={styles.leftWrapper}>
        <View style={styles.repeatWrapper}>
          <Feather name="repeat" size={16} color={theme.colors.textSecondary} />
          <Text
            variant="bodyMedium"
            style={{ color: theme.colors.textDarkGrey }}
          >
            Repeats
          </Text>
        </View>

        <Text variant="headlineMedium">{formattedTime}</Text>

        <View style={styles.chipContainer}>
          {days.map((day, index) => (
            <Text
              key={index}
              variant="labelLarge"
              style={[
                styles.chip,
                {
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.inverseOnSurface,
                },
              ]}
            >
              {day.slice(0, 3)}
            </Text>
          ))}
        </View>
      </View>

      <Switch value={switchStatus === "active"} onValueChange={handleToggle} />
    </View>
  );
};

StudyAlertItem.propTypes = {
  studyAlertId: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  days: PropTypes.arrayOf(PropTypes.string).isRequired,
  status: PropTypes.oneOf(["active", "inactive"]).isRequired,
};
