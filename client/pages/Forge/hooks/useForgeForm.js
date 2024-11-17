/**
 * Import Modules
 */
import { useForm } from "@/hooks/useForm";
import { mixed, number, object, string } from "yup";

const validationSchema = object({
  resourceTitle: string().required("Resource title is required"),
  topic: string(),
  field: string(),
  levelOfStudy: string(),
  numberOfQuestions: number().positive().integer().min(10).max(40),
  source: mixed()
    .test(
      "is-object-or-string",
      "Source is required and must be a file or text",
      (value) =>
        typeof value === "object" ||
        (typeof value === "string" && value.trim() !== "")
    )
    .required("Source is required"),
});

export const useForgeForm = () => {
  const form = useForm({
    validationSchema,
    defaultValues: {
      resourceTitle: "",
      topic: "",
      field: "",
      levelOfStudy: "",
      numberOfQuestions: 10,
      source: null,
    },
  });

  const onSubmit = async ({
    resourceTitle,
    topic,
    field,
    levelOfStudy,
    numberOfQuestions,
    source,
  }) => {
    const payload = {
      resourceTitle,
      topic,
      field,
      levelOfStudy,
      numberOfQuestions,
      source,
    };

    console.log("payload", payload);
    // call api
  };

  return {
    ...form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
