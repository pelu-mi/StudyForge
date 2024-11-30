/**
 * Import Modules
 */
import {
  UPDATE_QUIZ_COMPLETION_API_KEY,
  GET_RESOURCES_API_KEY,
} from "@/services/constants";
import { apiRequest } from "@/services/helpers/apiRequest";
import { useApiSend } from "@/services/hooks/useApiSend";

const updateQuizCompletionRequest = (payload) =>
  apiRequest(UPDATE_QUIZ_COMPLETION_API_KEY, "POST", payload);

export const useUpdateQuizCompletionMutation = (options) =>
  useApiSend(updateQuizCompletionRequest, [GET_RESOURCES_API_KEY], options);
