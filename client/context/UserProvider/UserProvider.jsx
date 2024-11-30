/**
 * Import Modules
 */

import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useSignUpMutation } from "@/services/api/user/useSignUpMutation";
import { ACCESS_TOKEN_KEY, ACCESS_USER_KEY } from "@/constants/auth";
import { getData } from "@/utils/getData";
import { storeData } from "@/utils/storeData";
import { useRouter } from "expo-router";
import { useLoginMutation } from "@/services/api/user/useLoginMutation";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import Toast from "react-native-toast-message";
import { useSettings } from "@/hooks/useSettings";
import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";

const UserContext = createContext();

/**
 * User Provider
 */
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize as null
  const router = useRouter();
  const {
    biometricAuth,
    setIsBiometricSupported,
    enableBiometricAuth,
    availableBiometrics,
  } = useSettings();

  useEffect(() => {
    const fetchUser = async () => {
      let storedUser = await getData(ACCESS_USER_KEY);
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    fetchUser();
  }, []);

  // Create Account
  const { mutateAsync: signUp, isPending: isSignUpPending } = useSignUpMutation(
    {
      onSuccess: async (response) => {
        Toast.show({
          type: "success",
          text1: response.message,
        });
        console.log("sign up successfully: ", response.message);
        router.dismiss();
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: error.message,
        });
        console.log("sign up error: ", error.message);
      },
    }
  );

  // Handle Set User
  const handleSetUser = async (userResponse) => {
    const { _id, firstName, lastName, email } = userResponse.data;

    const userObject = {
      _id,
      firstName,
      lastName,
      email,
    };

    setUser(userObject);
    await storeData(ACCESS_USER_KEY, JSON.stringify(userObject));
  };

  // const handleStoreCredentials = async (email, password) => {
  //   try {
  //     await setItemAsync("userEmail", email);
  //     await setItemAsync("userPassword", password);
  //   } catch (error) {
  //     console.log("Error saving credentials to SecureStore", error);
  //   }
  // };

  // Handle User Response
  const handleUserResponse = async (userResponse) => {
    const { accessToken, email, password } = userResponse.data;

    await handleSetUser(userResponse);

    await setItemAsync(ACCESS_TOKEN_KEY, accessToken);

    // const isBiometricEnabled =
    //   biometricAuth.isFaceIDEnabled || biometricAuth.isTouchIDEnabled;

    // const isFaceIDAvailable = availableBiometrics.includes(
    //   LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
    // );

    console.log("availableBiometrics", availableBiometrics);

    // const isTouchIDAvailable = availableBiometrics.includes(
    //   LocalAuthentication.AuthenticationType.FINGERPRINT
    // );

    // Optionally store email and password for biometric login
    // if (isBiometricEnabled) {
    //   handleStoreCredentials(email, password);
    // } else if (!isBiometricEnabled && isFaceIDAvailable) {
    //   Alert.alert(
    //     "Face ID",
    //     "Would you like to enable Face ID authentication for the next time?",
    //     [
    //       {
    //         text: "Yes",
    //         onPress: () => {
    //           handleStoreCredentials(email, password);
    //           enableBiometricAuth("FaceID");
    //         },
    //       },
    //       { text: "Cancel", style: "cancel" },
    //     ]
    //   );
    // }

    router.replace("/");
  };

  // Log in
  const { mutateAsync: login, isPending: isLoginPending } = useLoginMutation({
    onSuccess: async (response, variable) => {
      console.log("response", response);
      console.log("variable", variable);
      await handleUserResponse(response);
    },
  });

  const biometricLogin = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Log in with biometrics",
        fallbackLabel: "Enter password",
      });

      if (result.success) {
        // Retrieve stored credentials
        const storedEmail = await getItemAsync("userEmail");
        const storedPassword = await getItemAsync("userPassword");

        if (storedEmail && storedPassword) {
          // Use these credentials to log in
          await login({ email: storedEmail, password: storedPassword });
        } else {
          Toast.show({
            type: "error",
            text1: "No saved credentials found. Please log in manually.",
          });
          setIsBiometricSupported(false);
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Biometric authentication failed.",
        });
        setIsBiometricSupported(false);
      }
    } catch (error) {
      console.log("Biometric authentication error:", error);
      Toast.show({
        type: "error",
        text1: "An error occurred during biometric authentication.",
      });
      setIsBiometricSupported(false);
    }
  };

  // Log out
  const logout = async () => {
    await deleteItemAsync(ACCESS_USER_KEY);
    await deleteItemAsync(ACCESS_TOKEN_KEY);
    setUser(null);
    router.replace("/login");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        signUp,
        login,
        biometricLogin,
        logout,
        loading: isSignUpPending || isLoginPending,
        handleSetUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

/**
 * Export Function
 */
export const useUser = () => useContext(UserContext);

// Specify types of props to be received by UserProvider
UserProvider.propTypes = {
  children: PropTypes.node,
};
