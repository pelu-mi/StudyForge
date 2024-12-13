/**
 * Import Module
 */
import { StyleSheet } from "react-native";

/**
 * Specify styles to use
 */
export const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 26,
    paddingBottom: 32,
    justifyContent: "space-between",
    height: "100%",
  },
  mainList: {
    gap: 10,
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderWidth: 1,
    borderRadius: 10,
  },
  leftWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  preferences: {
    marginBottom: 16,
    marginTop: 40,
    gap: 10,
  },
  preferencesText: {
    fontWeight: 600,
    marginBottom: 4,
  },
  menuWrapper: {
    flexDirection: "row",
    gap: 6,
  },
  themeText: {
    textTransform: "capitalize",
    width: 50,
    display: "flex",
    textAlign: "right",
  },
});
