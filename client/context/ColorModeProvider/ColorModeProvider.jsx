import { getData } from "@/utils/getData";
import { storeData } from "@/utils/storeData";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

export const COLOR_MODE_LOCAL_STORAGE_KEY = "colorMode";

const ColorModeContext = createContext();

export const ColorModeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [colorMode, setColorMode] = useState("light");

  useEffect(() => {
    const storeColorMode = async () => {
      const storedColorMode = await getData(COLOR_MODE_LOCAL_STORAGE_KEY);

      if (!storedColorMode) {
        await storeData(COLOR_MODE_LOCAL_STORAGE_KEY, colorScheme);
        setColorMode(colorScheme);
      } else {
        setColorMode(storedColorMode);
      }
    };

    storeColorMode();
  }, []);

  const changeColorMode = async (newMode) => {
    await storeData(COLOR_MODE_LOCAL_STORAGE_KEY, newMode);
    setColorMode(newMode);
  };
  const contexValue = useMemo(
    () => ({
      colorMode,
      changeColorMode,
    }),
    [colorMode, setColorMode]
  );

  return (
    <ColorModeContext.Provider value={contexValue}>
      {children}
    </ColorModeContext.Provider>
  );
};

/**
 * Export Function
 */
export const useColorMode = () => useContext(ColorModeContext);

ColorModeProvider.propTypes = {
  children: PropTypes.node,
};
