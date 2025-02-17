/**
 * Import Modules
 */
import { Image, View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "./LoginPage.styles";
import { Button } from "@/components/Button";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";
import { SafeKeyboardScrollView } from "@/components/SafeKeyboardScrollView";
import { FormTextInput } from "@/components/Form/FormTextInput";
import { useLoginForm } from "./hooks/useLoginForm";
import { useColorMode } from "@/context/ColorModeProvider";

/**
 * LoginPage
 * 
 * @returns LodinPage
 */
export const LoginPage = () => {
  const { colorMode } = useColorMode();
  const { control, handleSubmit } = useLoginForm();

  return (
    <SafeKeyboardScrollView edges={["top"]}>
      <View style={styles.container}>
        <Image
          source={
            colorMode === "light"
              ? require("@/assets/images/portrait-logo.png")
              : require("@/assets/images/portrait-logo-dark.png")
          }
          style={styles.logo}
        />

        {/* Email input field */}
        <FormTextInput
          name="email"
          label="Email"
          placeholder="example@mail.com"
          keyboardType="email-address"
          autoCapitalize="none"
          fullWidth
          {...{ control }}
        />

        {/* Password input field */}
        <FormTextInput
          name="password"
          label="Password"
          secureTextEntry
          fullWidth
          {...{ control }}
        />

        {/* Buttons */}
        <View style={styles.buttonWrapper}>
          <Button
            icon={({ color }) => (
              <MaterialCommunityIcons
                name="arrow-right"
                size={24}
                color={color}
              />
            )}
            iconRight
            onPress={handleSubmit}
          >
            Login
          </Button>

          <View style={styles.signUpWrapper}>
            <Text variant="bodyMedium">Don&apos;t have an account?</Text>
            <Button variant="link" labelStyle={styles.signUpLink}>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </View>
        </View>
      </View>
    </SafeKeyboardScrollView>
  );
};
