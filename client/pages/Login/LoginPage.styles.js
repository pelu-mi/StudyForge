import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    gap: 12,
  },
  logo: {
    width: 220,
    height: 184,
    marginBottom: 60,
    objectFit: "contain",
  },
  buttonWrapper: {
    width: "100%",
    marginTop: 28,
    gap: 24,
  },
  signUpWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpLink: {
    fontSize: 14,
  },
});
