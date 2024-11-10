import { Image, useColorScheme, View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "./LoginPage.styles";
import { useState } from "react";
import { TextInput } from "@/components/TextInput";
import { TextInput as NativeTextInput } from "react-native-paper";
import { Button } from "@/components/Button";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { FaceIDIcon } from "@/components/Icons";

export const LoginPage = () => {
  const colorScheme = useColorScheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Image
        source={
          colorScheme === "light"
            ? require("@/assets/images/portrait-logo.png")
            : require("@/assets/images/portrait-logo-dark.png")
        }
        style={styles.logo}
      />

      {/* Email input field */}
      <TextInput
        label="Email"
        placeHolder="email@mail.com"
        mode="outlined"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password input field */}
      <TextInput
        label="Password"
        mode="outlined"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        // right={<NativeTextInput.Icon icon="eye" />}
      />

      {/* Buttons */}
      <Button
        icon={({ color }) => (
          <MaterialCommunityIcons name="arrow-right" size={24} color={color} />
        )}
        iconRight
        onPress={() => console.log("Login pressed")}
        style={styles.button}
      >
        Login
      </Button>

      <Button
        variant="secondary"
        icon={({ color }) => <FaceIDIcon fill={color} />}
        iconRight
        onPress={() => console.log("Login with Face ID pressed")}
      >
        Login with Face ID
      </Button>

      <View style={styles.signUpWrapper}>
        <Text variant="bodyMedium">Don't have an account?</Text>
        <Button
          variant="link"
          onPress={() => console.log("Sign Up pressed")}
          labelStyle={styles.signUpLink}
        >
          Sign Up
        </Button>
      </View>
    </View>
  );
};
