/**
 * Import Module
 */
import { StyleSheet } from "react-native";

/**
 * useStyles - Specify styles to use
 * 
 * @param {*} theme 
 * @returns 
 */
export const useStyles = (theme) =>
  StyleSheet.create({
    container: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.colors.outline,
    },
    topWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
    },
    numberText: {
      fontWeight: 600,
    },
    status: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    middleWrapper: {
      paddingHorizontal: 16,
      paddingVertical: 20,
      gap: 20,
      borderBottomColor: theme.colors.outline,
      borderBottomWidth: 1,
    },
    chip: {
      alignSelf: "flex-start",
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
    },
    actionButton: {
      justifyContent: "center",
      alignItems: "center",
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 14,
    },
  });
