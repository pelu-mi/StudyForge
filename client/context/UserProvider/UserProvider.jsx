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
import { deleteItemAsync, setItemAsync } from "expo-secure-store";
import Toast from "react-native-toast-message";

const UserContext = createContext();

/**
 * User Provider
 */
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize as null
  const router = useRouter();

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

  // Handle User Response
  const handleUserResponse = async (userResponse) => {
    const { accessToken } = userResponse.data;

    await handleSetUser(userResponse);

    await setItemAsync(ACCESS_TOKEN_KEY, accessToken);
    router.replace("/");
  };

  // Log in
  const { mutateAsync: login, isPending: isLoginPending } = useLoginMutation({
    onSuccess: async (response) => {
      await handleUserResponse(response);
    },
  });

  // Log out
  const logout = async () => {
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
