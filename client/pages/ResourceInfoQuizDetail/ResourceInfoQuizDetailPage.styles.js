import { StyleSheet } from "react-native";

export const useStyles = (theme) =>
  StyleSheet.create({
    top: {
      paddingHorizontal: 16,
      paddingVertical: 14,
      backgroundColor: theme.colors.inverseOnSurface,
      borderTopWidth: 1,
      borderColor: theme.colors.outlineVariant,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    numberWrapper: {
      flexDirection: "row",
      alignItems: "baseline",
    },
    stateWrapper: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    container: {
      paddingHorizontal: 16,
      paddingVertical: 32,
      gap: 32,
    },
    questionsContainer: {
      gap: 14,
    },
    optionBase: {
      flexDirection: "row",
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderRadius: 10,
      borderWidth: 1,
      gap: 14,
    },
    option: {
      borderColor: theme.colors.outline,
    },
    selectedOption: {
      backgroundColor: theme.colors.onSurfacePrimary,
      borderColor: theme.colors.primary,
    },
    correctOption: {
      backgroundColor: theme.colors.onSurfaceSuccess,
      borderColor: theme.colors.success,
    },
    wrongOption: {
      backgroundColor: theme.colors.onSurfaceSecondary,
      borderColor: theme.colors.secondary,
    },
    buttonWrapper: {
      flexDirection: "row",
      padding: 16,
      gap: 16,
    },
    button: {
      flex: 1,
      backgroundColor: theme.colors.primary,
      justifyContent: "center",
      alignContent: "center",
      borderRadius: 10,
      paddingVertical: 8,
    },
    buttonLabel: {
      textAlign: "center",
      fontWeight: 600,
      color: theme.colors.inverseOnSurface,
    },
  });
