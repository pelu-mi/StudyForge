/**
 * Import Modules
 */
import { useForm } from "@/hooks/useForm";
import { useUpdateResourceMutation } from "@/services/api/library/useUpdateResourceMutation";
import { useLocalSearchParams, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { object, string } from "yup";

const validationSchema = object({
  title: string().required("Resource title is required"),
  topic: string(),
  field: string(),
  levelOfStudy: string(),
});

export const useResourceSettingsForm = () => {
  const router = useRouter();
  const { resourceInfo } = useLocalSearchParams();
  const parsedResourceInfo = JSON.parse(resourceInfo);
  const { _id, title, topic, field, levelOfStudy } = parsedResourceInfo;

  const defaultValues = { title, topic, field, levelOfStudy };

  const form = useForm({
    validationSchema,
    defaultValues,
  });

  const { mutateAsync: updateResource } = useUpdateResourceMutation({
    onSuccess: async (response) => {
      Toast.show({
        type: "success",
        text1: response.message,
      });
      router.dismissTo({
        pathname: "/(modals)/resourceInfo",
        params: {
          resourceInfo: JSON.stringify({
            ...parsedResourceInfo,
            ...response.data,
          }),
        },
      });
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: error.message });
    },
  });

  const onSubmit = async ({ title, topic, field, levelOfStudy }) => {
    const payload = {
      resourceID: _id,
      title,
      topic,
      field,
      levelOfStudy,
    };

    // call api
    updateResource(payload);
  };

  return {
    ...form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
