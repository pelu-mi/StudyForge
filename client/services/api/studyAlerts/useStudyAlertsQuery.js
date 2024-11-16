import { GET_STUDY_ALERTS_API_KEY } from "@/services/constants";
import { useApiGet } from "@/services/hooks/useApiGet";

export const useStudyAlertsQuery = (options) => {
  const { data, ...rest } = useApiGet([GET_STUDY_ALERTS_API_KEY], options);

  return {
    ...rest,
    studyAlerts: data?.data ?? [],
  };
};
