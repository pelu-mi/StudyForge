/**
 * Import Modules
 */
import PropTypes from "prop-types";
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
    },
  },
});

/**
 * Query Client Provider
 */
export const QueryClientProvider = ({ children }) => {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
};

// Specify types of props to be received by QueryClientProvider
QueryClientProvider.propTypes = {
  children: PropTypes.node,
};
