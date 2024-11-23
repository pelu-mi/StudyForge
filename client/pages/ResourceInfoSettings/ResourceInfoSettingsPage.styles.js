import { StyleSheet } from "react-native";

export const useStyles = (theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingTop: 32,
      paddingBottom: 40,
      gap: 12,
    },
    text: {
      fontWeight: 600,
      marginVertical: 20,
    },
    dangerZoneContainer: {
      height: "100%",
      marginTop: 16,
      paddingTop: 12,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.dangerZoneBackground,
    },
  });
