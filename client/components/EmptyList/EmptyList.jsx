import PropTypes from "prop-types";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useStyles } from "./EmptyList.styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export const EmptyList = ({ containerStyle, iconName, icon, message }) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  return (
    <View style={[styles.container, containerStyle]}>
      {icon ? (
        icon
      ) : (
        <MaterialCommunityIcons
          name={iconName}
          size={120}
          color={theme.colors.textSecondary}
        />
      )}
      <Text variant="titleLarge" style={styles.text}>
        {message}
      </Text>
    </View>
  );
};

EmptyList.propTypes = {
  containerStyle: PropTypes.object,
  iconName: PropTypes.string,
  icon: PropTypes.node,
  message: PropTypes.string,
};
