/**
 * Import Modules
 */
import {
  ADD_STUDY_ALERT_API_KEY,
  GET_STUDY_ALERTS_API_KEY,
} from "@/services/constants";
import { apiRequest } from "@/services/helpers/apiRequest";
import { useApiSend } from "@/services/hooks/useApiSend";

const addStudyAlertRequest = (payload) =>
  apiRequest(ADD_STUDY_ALERT_API_KEY, "POST", payload);

export const useAddStudyAlertMutation = (options) =>
  useApiSend(addStudyAlertRequest, [GET_STUDY_ALERTS_API_KEY], options);
