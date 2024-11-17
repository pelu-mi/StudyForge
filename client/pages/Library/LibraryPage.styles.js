import { StyleSheet } from "react-native";

export const useStyles = (theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      height: "100%",
    },
    listContentContainer: {
      gap: 20,
      paddingTop: 20,
      paddingBottom: 100,
    },
    fab: {
      width: "auto",
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: 4,
      borderRadius: 50,
      backgroundColor: theme.colors.primary,
    },
  });
