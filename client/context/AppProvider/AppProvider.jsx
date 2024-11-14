import { KeyboardDismiss } from "@/components/KeyboardDismiss";
import { QueryClientProvider } from "../QueryClientProvider";
import { ThemeProvider } from "../ThemeProvider";
import { UserProvider } from "../UserProvider";
import { ToastProvider } from "../ToastProvider";
import PropTypes from "prop-types";
import { ColorModeProvider } from "../ColorModeProvider";

export const AppProvider = ({ children }) => {
  return (
    <QueryClientProvider>
      <ColorModeProvider>
        <ThemeProvider>
          <UserProvider>
            <KeyboardDismiss>
              <ToastProvider>{children}</ToastProvider>
            </KeyboardDismiss>
          </UserProvider>
        </ThemeProvider>
      </ColorModeProvider>
    </QueryClientProvider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node,
};
