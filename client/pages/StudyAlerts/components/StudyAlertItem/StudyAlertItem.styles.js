import { StyleSheet } from "react-native";

export const useStyles = (theme) =>
  StyleSheet.create({
    alertContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 20,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      gap: 12,
    },
    leftWrapper: {
      gap: 18,
      flex: 1,
      alignSelf: "flex-start",
    },
    repeatWrapper: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    chip: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      fontWeight: 700,
      borderRadius: 50,
    },
    chipContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
  });
