import { GET_RESOURCES_API_KEY } from "@/services/constants";
import { useApiGet } from "@/services/hooks/useApiGet";

export const useResourcesQuery = (options) => {
  const { data, ...rest } = useApiGet([GET_RESOURCES_API_KEY], options);

  return {
    ...rest,
    resources: data?.data ?? [],
  };
};
