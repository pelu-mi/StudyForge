/**
 * Import Modules
 */
import { useColorMode } from "@/context/ColorModeProvider";
import { Image } from "react-native";

/**
 * LogoHeaderTitle - Specify LogoHeaderTitle
 * 
 * @returns LogoHeaderTitle
 */
export const LogoHeaderTitle = () => {
  const { colorMode } = useColorMode();

  return (
    <Image
      source={
        colorMode === "light"
          ? require("@/assets/images/landscape-logo.png")
          : require("@/assets/images/landscape-logo-dark.png")
      }
      style={{ width: 124, height: 40, resizeMode: "contain" }}
    />
  );
};
