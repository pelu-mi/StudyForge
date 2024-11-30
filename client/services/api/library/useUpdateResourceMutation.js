/**
 * Import Modules
 */
import {
  UPDATE_RESOURCE_API_KEY,
  GET_RESOURCES_API_KEY,
} from "@/services/constants";
import { apiRequest } from "@/services/helpers/apiRequest";
import { useApiSend } from "@/services/hooks/useApiSend";

const updateResourceRequest = (payload) =>
  apiRequest(UPDATE_RESOURCE_API_KEY, "POST", payload);

export const useUpdateResourceMutation = (options) =>
  useApiSend(updateResourceRequest, [GET_RESOURCES_API_KEY], options);
