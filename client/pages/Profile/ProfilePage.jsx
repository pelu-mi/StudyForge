import { Button } from "@/components/Button";
import { useUser } from "@/context/UserProvider";
import { useSettings } from "@/hooks/useSettings";
import { Switch, View } from "react-native";
import { Avatar, List, Text, Divider, useTheme } from "react-native-paper";
import { styles } from "./ProfilePage.styles";

export const ProfilePage = () => {
  const { user, logout } = useUser();
  const { biometricAuth, enableBiometricAuth } = useSettings();
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {/* Header with user avatar and info */}
      <View style={styles.header}>
        <Avatar.Text
          size={48}
          label={`${user.firstName[0]}${user.lastName[0]}`}
          style={{ backgroundColor: theme.colors.primary }}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.firstName}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>

      {/* Profile options */}
      <List.Section>
        <List.Item
          title="Change Password"
          left={() => <List.Icon icon="lock" />}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {}}
        />
        <List.Item
          title="Study Alerts"
          left={() => <List.Icon icon="alarm" />}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {}}
        />
        <List.Item
          title="Achievements & Badges"
          left={() => <List.Icon icon="trophy" />}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {}}
        />
      </List.Section>

      {/* Preferences section */}
      <View style={styles.preferences}>
        <Text style={styles.preferencesTitle}>Preferences</Text>
        <View style={styles.preferenceItem}>
          <Text>Theme</Text>
          <Text>Light</Text>{" "}
          {/* Replace with dynamic theme selection if needed */}
        </View>
        <View style={styles.preferenceItem}>
          <Text>Enable Login with Face ID</Text>
          <Switch
            value={biometricAuth.isFaceIDEnabled}
            onValueChange={() => enableBiometricAuth("FaceID")}
          />
        </View>
      </View>

      <Divider style={styles.divider} />

      {/* Logout button */}
      <Button variant="text" onPress={logout} style={styles.logoutButton}>
        Log out
      </Button>
    </View>
  );
};
