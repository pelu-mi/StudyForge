/**
 * Import Modules
 */
import {
  DELETE_STUDY_ALERT_API_KEY,
  GET_STUDY_ALERTS_API_KEY,
} from "@/services/constants";
import { apiRequest } from "@/services/helpers/apiRequest";
import { useApiSend } from "@/services/hooks/useApiSend";

const deleteStudyAlertRequest = (payload) =>
  apiRequest(DELETE_STUDY_ALERT_API_KEY, "POST", payload);

export const useDeleteStudyAlertMutation = (options) =>
  useApiSend(deleteStudyAlertRequest, [GET_STUDY_ALERTS_API_KEY], options);
