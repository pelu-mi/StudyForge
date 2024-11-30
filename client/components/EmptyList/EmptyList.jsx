import PropTypes from "prop-types";
import { View } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { useStyles } from "./EmptyList.styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export const EmptyList = ({
  containerStyle,
  iconName,
  icon,
  iconSize = 120,
  message,
  isLoading = false,
}) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color={theme.colors.primary} />;
    }

    return (
      <>
        {icon ? (
          icon
        ) : (
          <MaterialCommunityIcons
            name={iconName}
            size={iconSize}
            color={theme.colors.textSecondary}
          />
        )}
        <Text variant="titleLarge" style={styles.text}>
          {message}
        </Text>
      </>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>{renderContent()}</View>
  );
};

EmptyList.propTypes = {
  containerStyle: PropTypes.object,
  iconName: PropTypes.string,
  icon: PropTypes.node,
  iconSize: PropTypes.number,
  message: PropTypes.string,
  isLoading: PropTypes.bool,
};
