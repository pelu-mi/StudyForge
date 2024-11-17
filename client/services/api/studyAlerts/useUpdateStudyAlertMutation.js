/**
 * Import Modules
 */
import {
  UPDATE_STUDY_ALERT_API_KEY,
  GET_STUDY_ALERTS_API_KEY,
} from "@/services/constants";
import { apiRequest } from "@/services/helpers/apiRequest";
import { useApiSend } from "@/services/hooks/useApiSend";

const updateStudyAlertRequest = (payload) =>
  apiRequest(UPDATE_STUDY_ALERT_API_KEY, "POST", payload);

export const useUpdateStudyAlertMutation = (options) =>
  useApiSend(updateStudyAlertRequest, [GET_STUDY_ALERTS_API_KEY], options);
