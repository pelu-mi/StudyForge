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
      justifyContent: "center",
      alignItems: "center",
      gap: 12,
    },
    text: {
      color: theme.colors.textSecondary,
    },
  });
