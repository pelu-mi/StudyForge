/**
 * Import Modules
 */
import { object, string } from "yup";
import { useForm } from "@/hooks/useForm";
import { useUser } from "@/context/UserProvider";
import { useSettings } from "@/hooks/useSettings";
import { setItemAsync } from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";

// import { useUser } from "context";

// Validation for Login page form
const validationSchema = object({
  email: string()
    .lowercase()
    .email("Email must be a valid email address")
    .required("Email is required"),
  password: string().required("Password is required"),
});

/**
 * useLoginForm - Custom hook to manage Login form
 */
export const useLoginForm = () => {
  const { login } = useUser();
  // const { biometricAuth, enableBiometricAuth, availableBiometrics } =
  // useSettings();
  const form = useForm({ validationSchema });

  // const isBiometricEnabled =
  //   biometricAuth.isFaceIDEnabled || biometricAuth.isTouchIDEnabled;

  // const isFaceIDAvailable = availableBiometrics.includes(
  //   LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
  // );

  // const handleStoreCredentials = async (email, password) => {
  //   try {
  //     await setItemAsync("userEmail", email);
  //     await setItemAsync("userPassword", password);
  //   } catch (error) {
  //     console.log("Error saving credentials to SecureStore", error);
  //   }
  // };

  // const handleEnableBiometricAuth = async (biometricType, email, password) => {
  //   // Optionally store email and password for biometric login
  //   if (isBiometricEnabled) {
  //     handleStoreCredentials(email, password);
  //   } else if (!isBiometricEnabled && isFaceIDAvailable) {
  //     Alert.alert(
  //       "Face ID",
  //       "Would you like to enable Face ID authentication for the next time?",
  //       [
  //         {
  //           text: "Yes",
  //           onPress: () => {
  //             handleStoreCredentials(email, password);
  //             enableBiometricAuth(biometricType);
  //           },
  //         },
  //         { text: "Later", style: "cancel" },
  //       ]
  //     );
  //   }
  // };

  const onSubmit = async (formValues) => {
    // const { email, password } = formValues;
    await login(formValues, {
      // onSuccess: () => {
      //   handleEnableBiometricAuth("FaceID", email, password);
      // },
      onError: () => {
        form.setError("email");
        form.setError("password", {
          message: "Email or password is incorrect!",
        });
      },
    });
  };

  return {
    ...form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
