import { StyleSheet } from "react-native";

export const useStyles = (theme) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderRadius: 20,
      borderColor: theme.colors.outline,
    },
    innerContainer: {
      padding: 20,
      gap: 16,
    },
    bottomContainer: {
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    topicText: {
      color: theme.colors.textSecondary,
    },
    titleText: {
      fontSize: 18,
    },
    chipWrapper: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    chip: {
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
    },
    quizWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    progressBar: {
      borderRadius: 20,
    },
  });
