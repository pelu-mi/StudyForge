import { LogoHeaderTitle } from "@/components/LogoHeaderTitle";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerBackButtonDisplayMode: "minimal" }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: () => <LogoHeaderTitle />,
        }}
      />
    </Stack>
  );
}
