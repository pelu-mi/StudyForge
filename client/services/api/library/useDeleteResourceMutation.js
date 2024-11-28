/**
 * Import Modules
 */
import {
  DELETE_RESOURCE_API_KEY,
  GET_RESOURCES_API_KEY,
} from "@/services/constants";
import { apiRequest } from "@/services/helpers/apiRequest";
import { useApiSend } from "@/services/hooks/useApiSend";

const deleteResourceRequest = (payload) =>
  apiRequest(DELETE_RESOURCE_API_KEY, "POST", payload);

export const useDeleteResourceMutation = (options) =>
  useApiSend(deleteResourceRequest, [GET_RESOURCES_API_KEY], options);
