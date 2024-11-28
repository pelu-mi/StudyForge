/**
 * Import Modules
 */
import { useForm } from "@/hooks/useForm";
import { useLocalSearchParams } from "expo-router";
import { object, string } from "yup";

const validationSchema = object({
  title: string().required("Resource title is required"),
  topic: string(),
  field: string(),
  levelOfStudy: string(),
});

export const useResourceSettingsForm = () => {
  const { resourceInfo } = useLocalSearchParams();
  const { title, topic, field, levelOfStudy } = JSON.parse(resourceInfo);

  const defaultValues = { title, topic, field, levelOfStudy };

  const form = useForm({
    validationSchema,
    defaultValues,
  });

  const onSubmit = async ({ title, topic, field, levelOfStudy }) => {
    const payload = {
      title,
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
