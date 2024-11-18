import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get("window").width;
const horizontalPadding = 16;
const totalHorizontalPadding = horizontalPadding * 2;
const gapBetweenItems = 24;

const sliderWidth =
  0.8 * windowWidth - (gapBetweenItems + totalHorizontalPadding);

export const useStyles = (theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 40,
      gap: 12,
    },
    fieldContainer: {
      gap: 8,
      paddingBottom: 20,
    },
    menuWrapper: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      gap: 6,
    },
    sliderWrapper: {
      alignItems: "center",
      flexDirection: "row",
      gap: gapBetweenItems,
    },
    slider: {
      width: sliderWidth,
    },
    sliderInput: {
      textAlign: "right",
    },
    sourceTypeWrapper: {
      flexDirection: "row",
      padding: 4,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      gap: 4,
    },
    sourceTypeButton: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 6,
      borderRadius: 50,
    },
    fileItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.outline,
    },
    fileLeftWrapper: {
      flexDirection: "row",
      gap: 10,
    },
    fileLabel: {
      fontWeight: 600,
    },
    sourceTextInput: {
      minHeight: 100,
      maxHeight: 300,
    },
  });
