import { View } from "react-native";
import { styles } from "./OverviewItem.styles";
import { Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";

export const OverviewItem = ({
  label,
  value,
  iconName,
  backgroundColor,
  borderColor,
  style,
}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.overviewContainer,
        style,
        { backgroundColor, borderColor },
      ]}
    >
      <MaterialCommunityIcons name={iconName} size={24} color={borderColor} />
      <View>
        <Text variant="titleMedium" style={styles.text}>
          {value}
        </Text>
        <Text variant="bodySmall" style={{ color: theme.colors.textDarkGrey }}>
          {label}
        </Text>
      </View>
    </View>
  );
};

OverviewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  iconName: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  style: PropTypes.object,
};
