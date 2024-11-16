import { StyleSheet } from "react-native";

export const useStyles = (theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 24,
      gap: 24,
    },
    listContentContainer: {
      gap: 20,
      height: "100%",
    },
    fab: {
      width: "auto",
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: 60,
      borderRadius: 50,
      backgroundColor: theme.colors.primary,
    },
  });
