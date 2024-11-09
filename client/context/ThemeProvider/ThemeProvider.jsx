import { useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import {
  PaperProvider,
  Text as PaperText,
  adaptNavigationTheme,
} from "react-native-paper";
import {
  ThemeProvider as ReactNativeThemeProvider,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

import { createCustomTheme } from "./theme";
import merge from "deepmerge";

export const ThemeProvider = ({ children }) => {
  const [fontsLoaded] = useFonts({
    Inter: require("../../assets/fonts/Inter-VariableFont_opsz,wght.ttf"),
  });

  const colorScheme = useColorScheme();
  const paperTheme = createCustomTheme(colorScheme);

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });
  const combinedTheme = merge(
    colorScheme === "dark" ? DarkTheme : LightTheme,
    paperTheme
  );

  if (!fontsLoaded) {
    return <PaperText>Loading...</PaperText>;
  }

  return (
    <PaperProvider theme={combinedTheme}>
      <ReactNativeThemeProvider value={combinedTheme}>
        {children}
      </ReactNativeThemeProvider>
    </PaperProvider>
  );
};
