/**
 * Import Modules
 */
import { CHANGE_PASSWORD_API_KEY } from "@/services/constants";
import { apiRequest } from "@/services/helpers/apiRequest";
import { useApiSend } from "@/services/hooks/useApiSend";

// Update User Request
const changePasswordRequest = (payload) =>
  apiRequest(CHANGE_PASSWORD_API_KEY, "POST", payload);

// Custom Hook to manage Update User request
export const useChangePasswordMutation = (options) =>
  useApiSend(changePasswordRequest, [], options);
