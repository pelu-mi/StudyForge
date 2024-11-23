import { View } from "react-native";
import { styles } from "./OverviewItem.styles";
import { Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";

export const OverviewItem = ({ style }) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.overviewContainer,
        style,
        {
          backgroundColor: theme.colors.onSurfacePrimary,
          borderColor: theme.colors.primary,
        },
      ]}
    >
      <MaterialCommunityIcons
        name="book-open-variant"
        size={24}
        color={theme.colors.primary}
      />
      <View>
        <Text variant="titleMedium" style={styles.text}>
          3
        </Text>
        <Text variant="bodySmall">Study Resources</Text>
      </View>
    </View>
  );
};

OverviewItem.propTypes = {
  style: PropTypes.object,
};
