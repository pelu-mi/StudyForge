import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get("window").width;
const horizontalPadding = 16;
const totalHorizontalPadding = horizontalPadding * 2;
const gapBetweenItems = 14;
const numVisibleItems = 2;
const numGaps = numVisibleItems - 1;

/**
 * Calculate the width of each tree item based on the window width, padding, and gaps
 */
export const overviewItemWidth =
  (windowWidth - totalHorizontalPadding - gapBetweenItems * numGaps) /
  numVisibleItems;

export const useStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingVertical: 32,
      gap: 32,
    },
    paddingHorizontal: {
      paddingHorizontal: 16,
    },
    greetingWrapper: {
      flexDirection: "row",
      gap: 4,
    },
    text: {
      fontSize: 18,
      fontWeight: 600,
    },
    section: {
      gap: 14,
    },
    overviewItemWrapper: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: gapBetweenItems,
    },
    listContentContainer: {
      paddingHorizontal: 16,
      gap: 20,
    },
  });
