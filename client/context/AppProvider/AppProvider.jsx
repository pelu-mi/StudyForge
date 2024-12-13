/**
 * Import Modules
 */
import { KeyboardDismiss } from "@/components/KeyboardDismiss";
import { QueryClientProvider } from "../QueryClientProvider";
import { ThemeProvider } from "../ThemeProvider";
import { UserProvider } from "../UserProvider";
import { ToastProvider } from "../ToastProvider";
import PropTypes from "prop-types";
import { ColorModeProvider } from "../ColorModeProvider";
import { LoadingProvider } from "../LoadingProvider";

/**
 * AppProvider
 * 
 * @param {*} props 
 * @returns AppProvider
 */
export const AppProvider = ({ children }) => {
  return (
    <QueryClientProvider>
      <ColorModeProvider>
        <ThemeProvider>
          <UserProvider>
            <LoadingProvider>
              <KeyboardDismiss>
                <ToastProvider>{children}</ToastProvider>
              </KeyboardDismiss>
            </LoadingProvider>
          </UserProvider>
        </ThemeProvider>
      </ColorModeProvider>
    </QueryClientProvider>
  );
};

// Specify types of props to be received by AppProvider
AppProvider.propTypes = {
  children: PropTypes.node,
};
