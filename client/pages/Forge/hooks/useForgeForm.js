/**
 * Import Modules
 */
import { useForm } from "@/hooks/useForm";
import { useGenerateResourceMutation } from "@/services/api/forge/useGenerateResourceMutation";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { number, object, string } from "yup";

const validationSchema = object({
  title: string().required("Resource title is required"),
  topic: string(),
  field: string(),
  levelOfStudy: string(),
  numberOfQuestions: number().positive().integer().min(10).max(40),
  sourceType: string(),
  textSource: string(),
  generatedTextFromFile: string(),
})
  .test(
    "either-textSource-or-generatedTextFromFile",
    "Source is required",
    function (value) {
      if (!value.textSource && !value.generatedTextFromFile) {
        return this.createError({
          message: "Source is required",
          path: "textSource",
        });
      }
      return true;
    }
  )
  .test(
    "either-textSource-or-generatedTextFromFile",
    "Source is required",
    function (value) {
      if (!value.textSource && !value.generatedTextFromFile) {
        return this.createError({
          message: "Source is required",
          path: "generatedTextFromFile",
        });
      }
      return true;
    }
  );

export const useForgeForm = () => {
  const router = useRouter();
  const form = useForm({
    validationSchema,
    defaultValues: {
      title: "",
      topic: "",
      field: "",
      levelOfStudy: "",
      numberOfQuestions: 10,
      sourceType: "File",
      textSource: "",
      generatedTextFromFile: "",
    },
  });

  const { mutateAsync: generateResource } = useGenerateResourceMutation({
    onSuccess: (reponse) => {
      Toast.show({ type: "success", text1: reponse.message });
      router.push("/library");
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: error.message });
    },
  });

  const onSubmit = async ({
    title,
    topic,
    field,
    levelOfStudy,
    numberOfQuestions,
    textSource,
    generatedTextFromFile,
  }) => {
    const payload = {
      title,
      topic,
      field,
      levelOfStudy,
      numberOfQuestions,
      sourceType: "Text",
      textSource,
      generatedTextFromFile,
    };

    console.log("payload", payload);
    // call api
    await generateResource(payload);
  };

  return {
    ...form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
