import { Button } from "@/components/Button";
import { useUser } from "@/context/UserProvider";
import { useSettings } from "@/hooks/useSettings";
import {
  Alert,
  ScrollView,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Text, useTheme, Menu } from "react-native-paper";
import { styles } from "./ProfilePage.styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import { useColorMode } from "@/context/ColorModeProvider";
import { useRouter } from "expo-router";

export const ProfilePage = () => {
  const { user, logout } = useUser();
  const { biometricAuth, enableBiometricAuth, isBiometricSupported } =
    useSettings();
  const theme = useTheme();
  const { colorMode, changeColorMode } = useColorMode();
  const router = useRouter();

  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const handleChangeTheme = async (selectedTheme) => {
    await changeColorMode(selectedTheme);
    setShowThemeMenu(false);
  };

  const handleLogout = () => {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log out", onPress: logout, style: "destructive" },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with user avatar and info */}
      <View style={styles.mainList}>
        <TouchableOpacity onPress={() => router.push("/profile/account")}>
          <View
            style={[
              styles.listContainer,
              { borderColor: theme.colors.outline },
            ]}
          >
            <View style={styles.leftWrapper}>
              <Avatar.Text
                size={48}
                label={`${user.firstName[0]}${user.lastName[0]}`}
                style={{ backgroundColor: theme.colors.primary }}
              />
              <View>
                <Text variant="titleLarge">
                  {user.firstName} {user.lastName}
                </Text>
                <Text
                  variant="bodyMedium"
                  style={{ color: theme.colors.textDarkGrey }}
                >
                  {user.email}
                </Text>
              </View>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={theme.colors.textSecondary}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/profile/changePassword")}
        >
          <View
            style={[
              styles.listContainer,
              { borderColor: theme.colors.outline },
            ]}
          >
            <View style={styles.leftWrapper}>
              <MaterialCommunityIcons
                name="lock"
                size={24}
                color={theme.colors.tertiary}
              />
              <Text variant="bodyLarge">Change Password</Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={theme.colors.textSecondary}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/profile/studyAlert")}>
          <View
            style={[
              styles.listContainer,
              { borderColor: theme.colors.outline },
            ]}
          >
            <View style={styles.leftWrapper}>
              <MaterialCommunityIcons
                name="alarm"
                size={24}
                color={theme.colors.secondary}
              />
              <Text variant="bodyLarge">Study Alerts</Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={theme.colors.textSecondary}
            />
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => {}}>
          <View
            style={[
              styles.listContainer,
              { borderColor: theme.colors.outline },
            ]}
          >
            <View style={styles.leftWrapper}>
              <MaterialCommunityIcons
                name="trophy"
                size={24}
                color={theme.colors.warning}
              />
              <Text variant="bodyLarge">Achievements & Badges</Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={theme.colors.textSecondary}
            />
          </View>
        </TouchableOpacity> */}

        {/* Preferences section */}
        <View style={styles.preferences}>
          <Text variant="titleMedium" style={styles.preferencesText}>
            Preferences
          </Text>
          <View
            style={[
              styles.listContainer,
              { borderColor: theme.colors.outline },
            ]}
          >
            <Text variant="bodyLarge">Theme</Text>
            <Menu
              visible={showThemeMenu}
              onDismiss={() => setShowThemeMenu(false)}
              anchor={
                <TouchableOpacity onPress={() => setShowThemeMenu(true)}>
                  <View style={styles.menuWrapper}>
                    <Text
                      variant="bodyLarge"
                      style={[
                        styles.themeText,
                        { color: theme.colors.textDarkGrey },
                      ]}
                    >
                      {colorMode}
                    </Text>
                    <MaterialCommunityIcons
                      name="unfold-more-horizontal"
                      size={24}
                      color={theme.colors.textSecondary}
                    />
                  </View>
                </TouchableOpacity>
              }
            >
              <Menu.Item
                onPress={() => handleChangeTheme("light")}
                title="Light"
              />
              <Menu.Item
                onPress={() => handleChangeTheme("dark")}
                title="Dark"
              />
            </Menu>
          </View>
          {isBiometricSupported && (
            <View
              style={[
                styles.listContainer,
                { paddingVertical: 12, borderColor: theme.colors.outline },
              ]}
            >
              <Text variant="bodyLarge">Enable Login with Face ID</Text>
              <Switch
                value={biometricAuth.isFaceIDEnabled}
                onValueChange={() => enableBiometricAuth("FaceID")}
              />
            </View>
          )}
        </View>
      </View>

      {/* Logout button */}
      <TouchableOpacity onPress={handleLogout}>
        <Button
          variant="red-outlined"
          icon={({ color }) => (
            <Feather name="log-out" size={24} color={color} />
          )}
          iconRight
        >
          Log out
        </Button>
      </TouchableOpacity>
    </ScrollView>
  );
};
