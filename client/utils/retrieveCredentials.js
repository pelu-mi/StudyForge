import { getGenericPassword } from "react-native-keychain";

export const retrieveCredentials = async () => {
  try {
    const credentials = await getGenericPassword();
    if (credentials) {
      return credentials;
    }
    return null;
  } catch (error) {
    console.error("Error retrieving credentials:", error);
    return null;
  }
};
