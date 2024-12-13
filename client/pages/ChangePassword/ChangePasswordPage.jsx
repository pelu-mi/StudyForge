/**
 * Import Modules
 */
import { FormTextInput } from "@/components/Form/FormTextInput";
import { SafeKeyboardScrollView } from "@/components/SafeKeyboardScrollView";
import { useChangePasswordForm } from "./hooks/useChangePasswordForm";
import { styles } from "./ChangePasswordPage.styles";
import { Button } from "@/components/Button";
import { Pressable } from "react-native";

/**
 * ChangePasswordPage
 * 
 * @returns ChangePasswordPage
 */
export const ChangePasswordPage = () => {
  const { control, handleSubmit } = useChangePasswordForm();

  return (
    <SafeKeyboardScrollView ignoreSafeArea>
      <Pressable style={styles.container}>
        <FormTextInput
          name="currentPassword"
          label="Current Password *"
          secureTextEntry
          fullWidth
          {...{ control }}
        />

        <FormTextInput
          name="newPassword"
          label="New Password *"
          secureTextEntry
          fullWidth
          {...{ control }}
        />

        <FormTextInput
          name="confirmPassword"
          label="Confirm New Password *"
          secureTextEntry
          fullWidth
          {...{ control }}
        />

        <Button onPress={handleSubmit}>Change Password</Button>
      </Pressable>
    </SafeKeyboardScrollView>
  );
};
