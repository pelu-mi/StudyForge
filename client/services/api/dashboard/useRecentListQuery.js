import { GET_RECENT_ALERTS_AND_RESOURCES_API_KEY } from "@/services/constants";
import { useApiGet } from "@/services/hooks/useApiGet";

export const useRecentListQuery = (options) => {
  const { data, ...rest } = useApiGet(
    [GET_RECENT_ALERTS_AND_RESOURCES_API_KEY],
    options
  );

  return {
    ...rest,
    recentResources: data?.data.userRecentResources ?? [],
    recentAlerts: data?.data.userRecentStudyAlerts ?? [],
  };
};
