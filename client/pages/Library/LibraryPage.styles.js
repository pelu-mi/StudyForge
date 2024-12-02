import { StyleSheet } from "react-native";

export const useStyles = (theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      height: "100%",
    },
    title: { marginBottom: 20 },
    listContentContainer: {
      gap: 20,
      paddingTop: 20,
      paddingBottom: 100,
    },
    toolsWrapper: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    searchTextInputContainer: {
      flex: 1,
    },
    searchDisabledTextInput: {
      borderColor: theme.colors.outlineVariant2,
      borderWidth: 1,
      borderRadius: 10,
    },
    sortText: {
      color: theme.colors.onSurfaceVariant,
    },
    menuWrapper: {
      flex: 1,
      flexDirection: "row",
      paddingVertical: 15,
      paddingHorizontal: 16,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      gap: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    menuWrapperDisabled: {
      opacity: 0.5,
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
