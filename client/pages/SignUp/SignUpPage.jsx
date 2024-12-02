import { Image, View } from "react-native";
import { Text } from "react-native-paper";
import { styles as loginStyles } from "../Login/LoginPage.styles";
import { styles } from "./SignUpPage.styles";
import { Button } from "@/components/Button";
import { Link } from "expo-router";
import { SafeKeyboardScrollView } from "@/components/SafeKeyboardScrollView";
import { FormTextInput } from "@/components/Form/FormTextInput";
import { useSignUpForm } from "./hooks/useSignUpForm";
import { useColorMode } from "@/context/ColorModeProvider";

export const SignUpPage = () => {
  const { colorMode } = useColorMode();
  const { control, handleSubmit } = useSignUpForm();

  return (
    <SafeKeyboardScrollView>
      <View style={loginStyles.container}>
        <Image
          source={
            colorMode === "light"
              ? require("@/assets/images/landscape-logo.png")
              : require("@/assets/images/landscape-logo-dark.png")
          }
          style={styles.logo}
        />

        <FormTextInput
          name="firstName"
          label="First Name *"
          placeholder="e.g. John"
          fullWidth
          {...{ control }}
        />

        <FormTextInput
          name="lastName"
          label="Last Name *"
          placeholder="e.g. Smith"
          fullWidth
          {...{ control }}
        />

        <FormTextInput
          name="email"
          label="Email *"
          placeholder="email@mail.com"
          keyboardType="email-address"
          autoCapitalize="none"
          fullWidth
          {...{ control }}
        />

        <FormTextInput
          name="password"
          label="Password *"
          secureTextEntry
          fullWidth
          {...{ control }}
        />

        <FormTextInput
          name="confirmPassword"
          label="Confirm Password *"
          secureTextEntry
          fullWidth
          {...{ control }}
        />

        {/* Buttons */}
        <View style={loginStyles.buttonWrapper}>
          <Button onPress={handleSubmit} style={loginStyles.button}>
            Sign Up
          </Button>

          <View style={loginStyles.signUpWrapper}>
            <Text variant="bodyMedium">Already have an account?</Text>
            <Button variant="link" labelStyle={loginStyles.signUpLink}>
              <Link dismissTo href="/login">
                Login
              </Link>
            </Button>
          </View>
        </View>
      </View>
    </SafeKeyboardScrollView>
  );
};
