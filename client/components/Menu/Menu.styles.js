import { StyleSheet } from "react-native";

export const useStyles = (theme) =>
  StyleSheet.create({
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
    menuError: {
      borderWidth: 2,
      borderColor: theme.colors.error,
    },
  });
