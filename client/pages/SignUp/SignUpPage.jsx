import { useState } from "react";
import { Image, useColorScheme, View } from "react-native";
import { Text } from "react-native-paper";
import { styles as loginStyles } from "../Login/LoginPage.styles";
import { styles } from "./SignUpPage.styles";
import { TextInput } from "@/components/TextInput";
import { Button } from "@/components/Button";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";
import { SafeKeyboardScrollView } from "@/components/SafeKeyboardScrollView";

export const SignUpPage = () => {
  const colorScheme = useColorScheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeKeyboardScrollView>
      <View style={loginStyles.container}>
        <Image
          source={
            colorScheme === "light"
              ? require("@/assets/images/landscape-logo.png")
              : require("@/assets/images/landscape-logo-dark.png")
          }
          style={styles.logo}
        />

        <TextInput
          label="First Name *"
          placeholder="e.g. John"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          label="Last Name *"
          placeholder="e.g. Smith"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          label="Email *"
          placeholder="email@mail.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          label="Password *"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <TextInput
          label="Confirm Password *"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        {/* Buttons */}
        <View style={loginStyles.buttonWrapper}>
          <Button
            onPress={() => console.log("Login pressed")}
            style={loginStyles.button}
          >
            Sign Up
          </Button>

          <View style={loginStyles.signUpWrapper}>
            <Text variant="bodyMedium">Already have an account?</Text>
            <Button variant="link" labelStyle={loginStyles.signUpLink}>
              <Link href="/login">Login</Link>
            </Button>
          </View>
        </View>
      </View>
    </SafeKeyboardScrollView>
  );
};
