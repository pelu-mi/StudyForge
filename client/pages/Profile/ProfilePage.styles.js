import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  userInfo: {
    marginLeft: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
    color: "gray",
  },
  preferences: {
    marginTop: 16,
  },
  preferencesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  preferenceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  logoutButton: {
    marginTop: 16,
    alignSelf: "center",
    color: "#FF3B30", // Red color for log out
  },
});
