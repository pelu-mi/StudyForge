import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { PaperProvider, Text, adaptNavigationTheme } from "react-native-paper";
import {
  ThemeProvider as ReactNativeThemeProvider,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

import { createCustomTheme } from "./theme";
import merge from "deepmerge";
import PropTypes from "prop-types";
import { useColorMode } from "../ColorModeProvider";

export const ThemeProvider = ({ children }) => {
  const [fontsLoaded] = useFonts({
    Inter: require("../../assets/fonts/Inter-VariableFont_opsz,wght.ttf"),
  });
  const { colorMode } = useColorMode();
  const paperTheme = createCustomTheme(colorMode);

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });
  const combinedTheme = merge(
    colorMode === "dark" ? DarkTheme : LightTheme,
    paperTheme
  );

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <PaperProvider theme={combinedTheme}>
      <ReactNativeThemeProvider value={combinedTheme}>
        <StatusBar
          barStyle={colorMode === "dark" ? "light-content" : "dark-content"}
        />
        {children}
      </ReactNativeThemeProvider>
    </PaperProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
