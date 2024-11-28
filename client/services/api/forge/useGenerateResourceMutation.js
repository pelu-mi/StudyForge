/**
 * Import Modules
 */
import {
  GENERATE_RESOURCE_API_KEY,
  GET_RESOURCES_API_KEY,
} from "@/services/constants";
import { apiRequest } from "@/services/helpers/apiRequest";
import { useApiSend } from "@/services/hooks/useApiSend";

const generateResourceRequest = (payload) =>
  apiRequest(GENERATE_RESOURCE_API_KEY, "POST", payload);

export const useGenerateResourceMutation = (options) =>
  useApiSend(generateResourceRequest, [GET_RESOURCES_API_KEY], options);
