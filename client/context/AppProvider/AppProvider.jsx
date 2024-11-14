import { KeyboardDismiss } from "@/components/KeyboardDismiss";
import { QueryClientProvider } from "../QueryClientProvider";
import { ThemeProvider } from "../ThemeProvider";
import { UserProvider } from "../UserProvider";
import { ToastProvider } from "../ToastProvider";
import PropTypes from "prop-types";

export const AppProvider = ({ children }) => {
  return (
    <QueryClientProvider>
      <ThemeProvider>
        <UserProvider>
          <KeyboardDismiss>
            <ToastProvider>{children}</ToastProvider>
          </KeyboardDismiss>
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node,
};
