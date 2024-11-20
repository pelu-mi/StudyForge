import { StyleSheet } from "react-native";

export const useStyles = (theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 24,
      gap: 14,
    },
    infoWrapper: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.outline,
    },
    infoTitle: {
      color: theme.colors.textSecondary,
    },
    sectionTitle: {
      fontWeight: 600,
      marginTop: 32,
    },
    listContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 16,
      borderWidth: 1,
      borderRadius: 10,
    },
    listContentWrapper: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
  });
