/**
 * Import Modules
 */
import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get("window").width;
const horizontalPadding = 16; // Horizontal padding on each side
const totalHorizontalPadding = horizontalPadding * 2; // Total padding (10 on left and right sides)
const gapBetweenItems = 10; // Space between items in the list
const numVisibleItems = 4; // Number of items visible on the screen
const numGaps = numVisibleItems - 1; // Number of gaps between items

const buttonWidth =
  (windowWidth - totalHorizontalPadding - gapBetweenItems * numGaps) /
  numVisibleItems;

/**
 * useStyles - Specify styles to use
 * 
 * @param {*} theme 
 * @returns useStyles
 */
export const useStyles = (theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingTop: 22,
    },
    timePicker: {
      minWidth: "100%",
    },
    text: {
      fontWeight: 600,
      marginVertical: 20,
    },
    buttonWrapper: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: gapBetweenItems,
      marginBottom: 40,
    },
    button: {
      fontWeight: 600,
      width: buttonWidth,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 10,
      textAlign: "center",
    },
    dangerZoneContainer: {
      height: "100%",
      marginTop: 45,
      paddingTop: 12,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.dangerZoneBackground,
    },
  });
