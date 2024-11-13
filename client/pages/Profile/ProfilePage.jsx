import { Button } from "@/components/Button";
import { useUser } from "@/context/UserProvider";
import { View } from "react-native";
import { Text } from "react-native-paper";

export const ProfilePage = () => {
  const { logout } = useUser();

  return (
    <View>
      <Text>Profile View</Text>
      <Button variant="text" onPress={logout}>
        Log out
      </Button>
    </View>
  );
};
