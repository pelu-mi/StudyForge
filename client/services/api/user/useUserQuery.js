/**
 * Import Modules
 */
import { GET_USER_API_KEY } from "@/services/constants";
import { useApiGet } from "@/services/hooks/useApiGet";

export const useUserQuery = (options) => {
  const { data, ...rest } = useApiGet([GET_USER_API_KEY], options);

  return {
    ...rest,
    user: data?.data ?? {},
  };
};
