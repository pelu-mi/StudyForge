/**
 * Import Modules
 */
import { useForm } from "@/hooks/useForm";
import { useLocalSearchParams } from "expo-router";
import { object, string } from "yup";

const validationSchema = object({
  resourceTitle: string().required("Resource title is required"),
  topic: string(),
  field: string(),
  levelOfStudy: string(),
});

export const useResourceSettingsForm = () => {
  const { resourceInfo } = useLocalSearchParams();
  const { resourceTitle, topic, field, levelOfStudy } =
    JSON.parse(resourceInfo);

  const defaultValues = { resourceTitle, topic, field, levelOfStudy };

  const form = useForm({
    validationSchema,
    defaultValues,
  });

  const onSubmit = async ({ resourceTitle, topic, field, levelOfStudy }) => {
    const payload = {
      resourceTitle,
      topic,
      field,
      levelOfStudy,
    };

    console.log("payload", payload);
    // call api
  };

  return {
    ...form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
