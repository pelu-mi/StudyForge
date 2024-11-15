import { FormTextInput } from "@/components/Form/FormTextInput";
import { useEditProfileForm } from "./hooks/useEditProfileForm";
import { SafeKeyboardScrollView } from "@/components/SafeKeyboardScrollView";
import { styles } from "./AccountPage.styles";
import { Button } from "@/components/Button";
import { Avatar, useTheme } from "react-native-paper";
import { useUser } from "@/context/UserProvider";
import { TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export const AccountPage = () => {
  const { user } = useUser();
  const theme = useTheme();
  const { control, handleSubmit } = useEditProfileForm();

  return (
    <SafeKeyboardScrollView
      ignoreSafeArea
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity onPress={() => {}} style={styles.avatarContainer}>
        <Avatar.Text
          size={80}
          label={`${user.firstName[0]}${user.lastName[0]}`}
          style={{ backgroundColor: theme.colors.primary }}
        />

        <View
          style={[
            styles.iconContainer,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <MaterialCommunityIcons
            name="plus-circle"
            size={24}
            color={theme.colors.textSecondary}
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>

      <FormTextInput
        name="firstName"
        label="First Name *"
        placeholder="e.g. John"
        {...{ control }}
      />

      <FormTextInput
        name="lastName"
        label="Last Name *"
        placeholder="e.g. Smith"
        {...{ control }}
      />

      <FormTextInput
        name="email"
        label="Email *"
        placeholder="email@mail.com"
        keyboardType="email-address"
        autoCapitalize="none"
        {...{ control }}
      />

      <Button onPress={handleSubmit}>Update Account</Button>
    </SafeKeyboardScrollView>
  );
};
