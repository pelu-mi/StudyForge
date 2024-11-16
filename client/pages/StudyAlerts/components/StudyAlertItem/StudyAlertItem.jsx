import dayjs from "dayjs";
import PropTypes from "prop-types";
import { Switch, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useStyles } from "./StudyAlertItem.styles";
import Feather from "@expo/vector-icons/Feather";

export const StudyAlertItem = ({ time, days }) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const formattedTime = dayjs(time).format("h:mm A");

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

      <Switch value={true} onValueChange={() => {}} />
    </View>
  );
};

StudyAlertItem.propTypes = {
  time: PropTypes.string.isRequired,
  days: PropTypes.arrayOf(PropTypes.string).isRequired,
};
