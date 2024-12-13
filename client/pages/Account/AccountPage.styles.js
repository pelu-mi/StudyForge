import { StyleSheet } from "react-native";

/**
 * Specify styles to use
 */
export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 28,
    gap: 12,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 24,
  },
  iconContainer: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 26,
    height: 26,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
});
