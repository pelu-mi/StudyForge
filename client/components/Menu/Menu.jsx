import { TouchableOpacity, View } from "react-native";
import {
  HelperText,
  Menu as NativeMenu,
  Text,
  useTheme,
} from "react-native-paper";
import { useStyles } from "./Menu.styles";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const Menu = ({
  visible,
  setVisible,
  items = [],
  selectedItem,
  onSelect,
  title,
  placeholder = "Select an option",
  errorMessage,
  getItemLabel = (item) =>
    typeof item === "string" ? item : JSON.stringify(item),
}) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  const getItemValueColor = () => {
    if (errorMessage) return theme.colors.error;

    if (selectedItem) {
      return theme.colors.text;
    } else {
      return theme.colors.onSurfaceVariant;
    }
  };

  return (
    <View style={styles.fieldContainer}>
      {title && <Text variant="titleMedium">{title}</Text>}
      <View>
        <NativeMenu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchorPosition="bottom"
          anchor={
            <TouchableOpacity onPress={() => setVisible(true)}>
              <View
                style={[styles.menuWrapper, errorMessage && styles.menuError]}
              >
                <Text
                  variant="bodyLarge"
                  style={{
                    color: getItemValueColor(),
                    textTransform: selectedItem ? "capitalize" : "none",
                  }}
                >
                  {selectedItem ? getItemLabel(selectedItem) : placeholder}
                </Text>
                <MaterialCommunityIcons
                  name="unfold-more-horizontal"
                  size={24}
                  color={theme.colors.textSecondary}
                />
              </View>
            </TouchableOpacity>
          }
        >
          {items.map((item, index) => (
            <NativeMenu.Item
              key={index}
              onPress={() => {
                onSelect(item);
                setVisible(false);
              }}
              title={getItemLabel(item)}
            />
          ))}
        </NativeMenu>
        {errorMessage && (
          <HelperText type="error" style={{ lineHeight: 16 }}>
            {errorMessage}
          </HelperText>
        )}
      </View>
    </View>
  );
};

Menu.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  items: PropTypes.array,
  selectedItem: PropTypes.any,
  onSelect: PropTypes.func.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  getItemLabel: PropTypes.func,
};
