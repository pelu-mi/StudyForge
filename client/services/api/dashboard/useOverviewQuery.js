import { GET_OVERVIEW_API_KEY } from "@/services/constants";
import { useApiGet } from "@/services/hooks/useApiGet";

export const useOverviewQuery = (options) => {
  const { data, ...rest } = useApiGet([GET_OVERVIEW_API_KEY], options);

  return {
    ...rest,
    overview: data?.data ?? {},
  };
};
