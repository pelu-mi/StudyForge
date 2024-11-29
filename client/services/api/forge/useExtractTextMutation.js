/**
 * Import Modules
 */
import { EXTRACT_TEXT_API_KEY } from "@/services/constants";
import { apiRequest } from "@/services/helpers/apiRequest";
import { useApiSend } from "@/services/hooks/useApiSend";

const extractTextRequest = (payload) =>
  apiRequest(EXTRACT_TEXT_API_KEY, "POST", payload);

export const useExtractTextMutation = (options) =>
  useApiSend(extractTextRequest, [], options);
