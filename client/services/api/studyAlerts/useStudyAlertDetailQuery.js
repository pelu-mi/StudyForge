import { GET_STUDY_ALERT_DETAIL_API_KEY } from "@/services/constants";
import { useApiGet } from "@/services/hooks/useApiGet";

export const useStudyAlertDetailQuery = (studyAlertId, options) => {
  const { data, ...rest } = useApiGet(
    [`${GET_STUDY_ALERT_DETAIL_API_KEY}/${studyAlertId}`],
    options
  );

  return {
    ...rest,
    studyAlert: data?.data ?? {},
  };
};
