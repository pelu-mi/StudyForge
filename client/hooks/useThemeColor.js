/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

/**
 * Import Modules
 */
import { useColorScheme } from "react-native";

import { Colors } from "@/constants/Colors";

/**
 * useThemeColor
 * 
 * @param {*} props 
 * @param {*} colorName 
 * @returns useThemeColor
 */
export function useThemeColor(props, colorName) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
