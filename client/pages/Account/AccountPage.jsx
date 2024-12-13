/**
 * Import Modules
 */
import { FormTextInput } from "@/components/Form/FormTextInput";
import { useEditProfileForm } from "./hooks/useEditProfileForm";
import { SafeKeyboardScrollView } from "@/components/SafeKeyboardScrollView";
import { styles } from "./AccountPage.styles";
import { Button } from "@/components/Button";
import { Avatar, useTheme } from "react-native-paper";
import { useUser } from "@/context/UserProvider";
import { View } from "react-native";

/**
 * AccountPage
 * 
 * @returns AccountPage
 */
export const AccountPage = () => {
  const { user } = useUser();
  const theme = useTheme();
  const { control, handleSubmit } = useEditProfileForm();

  return (
    <SafeKeyboardScrollView
      ignoreSafeArea
      contentContainerStyle={styles.container}
    >
      <View style={styles.avatarContainer}>
        <Avatar.Text
          size={80}
          label={`${user.firstName[0]}${user.lastName[0]}`}
          style={{ backgroundColor: theme.colors.primary }}
        />
      </View>

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

      <Button onPress={handleSubmit}>Update Account</Button>
    </SafeKeyboardScrollView>
  );
};
