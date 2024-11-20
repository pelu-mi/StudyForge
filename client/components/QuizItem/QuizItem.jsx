import { TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useStyles } from "./QuizItem.styles";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const QuizItem = ({ number, status, question, onButtonPress }) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  const getIconName = () => {
    switch (status) {
      case "correct":
        return "check-circle";
      case "wrong":
        return "close-circle";
      default:
        return;
    }
  };

  const getIconColor = () => {
    switch (status) {
      case "correct":
        return theme.colors.success;
      case "wrong":
        return theme.colors.secondary;
      default:
        return;
    }
  };

  const getBackgroundColor = () => {
    switch (status) {
      case "correct":
        return theme.colors.onSurfaceSuccess;
      case "wrong":
        return theme.colors.onSurfaceSecondary;
      default:
        return theme.colors.inverseOnSurface;
    }
  };

  const getButtonText = () => {
    switch (status) {
      case "correct":
        return "See Answer";
      case "wrong":
        return "Retry";
      default:
        return "Answer";
    }
  };

  return (
    <View style={styles.container}>
      {/* Top */}
      <View
        style={[styles.topWrapper, { backgroundColor: getBackgroundColor() }]}
      >
        <Text variant="titleSmall" style={styles.numberText}>
          # {number}
        </Text>
        {status !== "notAttempt" && (
          <View style={styles.status}>
            <MaterialCommunityIcons
              name={getIconName()}
              size={24}
              color={getIconColor()}
            />
            <Text variant="labelLarge">Correct</Text>
          </View>
        )}
      </View>

      {/* Middle */}
      <View style={styles.middleWrapper}>
        <Text variant="titleMedium">{question}</Text>

        <Text variant="bodySmall" style={styles.chip}>
          Multiple Choices
        </Text>
      </View>

      {/* Button */}
      <TouchableOpacity onPress={onButtonPress} style={styles.actionButton}>
        <Text variant="labelLarge">{getButtonText()}</Text>
      </TouchableOpacity>
    </View>
  );
};

QuizItem.propTypes = {
  number: PropTypes.number.isRequired,
  status: PropTypes.oneOf(["correct", "wrong", "notAttempt"]),
  question: PropTypes.string.isRequired,
  onButtonPress: PropTypes.func,
};
