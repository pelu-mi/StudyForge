import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import merge from "deepmerge";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider as ReactNativeThemeProvider,
} from "@react-navigation/native";

const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark };
const customLightTheme = { ...MD3LightTheme, colors: Colors.light };

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const combinedLightTheme = merge(LightTheme, customLightTheme);
const combinedDarkTheme = merge(DarkTheme, customDarkTheme);

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const paperTheme =
    colorScheme === "dark" ? combinedDarkTheme : combinedLightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <ReactNativeThemeProvider value={paperTheme}>
        {children}
      </ReactNativeThemeProvider>
    </PaperProvider>
  );
};
