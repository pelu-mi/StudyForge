/**
 * Import Modules
 */
import {
  UPDATE_QUIZ_ANSWER_API_KEY,
  GET_RESOURCES_API_KEY,
} from "@/services/constants";
import { apiRequest } from "@/services/helpers/apiRequest";
import { useApiSend } from "@/services/hooks/useApiSend";

const updateQuizAnswerRequest = (payload) =>
  apiRequest(UPDATE_QUIZ_ANSWER_API_KEY, "POST", payload);

export const useUpdateQuizAnswerMutation = (options) =>
  useApiSend(updateQuizAnswerRequest, [GET_RESOURCES_API_KEY], options);
