import { createContext, useContext, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { styles } from "./LoadingProvider.styles";
import PropTypes from "prop-types";

const LoadingContext = createContext();
export const LoadingProvider = ({ children }) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}
    </LoadingContext.Provider>
  );
};

/**
 * Export Function
 */
export const useLoading = () => useContext(LoadingContext);

LoadingProvider.propTypes = {
  children: PropTypes.node,
};
