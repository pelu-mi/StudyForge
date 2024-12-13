import { StyleSheet } from "react-native";

/**
 * useStyles - Styles to use
 * 
 * @param {*} theme 
 * @returns useStyles
 */
export const useStyles = (theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      height: "100%",
    },
    listContentContainer: {
      gap: 20,
      paddingTop: 20,
      paddingBottom: 120,
    },
    fab: {
      width: "auto",
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: 32,
      borderRadius: 50,
      backgroundColor: theme.colors.primary,
    },
  });
