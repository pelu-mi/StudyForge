/**
 * Import Modules
 */
import { useLoading } from "@/context/LoadingProvider";
import { useForm } from "@/hooks/useForm";
import { useGenerateResourceMutation } from "@/services/api/forge/useGenerateResourceMutation";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { number, object, string } from "yup";

const validationSchema = object({
  title: string().required("Resource title is required"),
  topic: string().required("Topic is required"),
  field: string().required("Field is required"),
  levelOfStudy: string().required("Level of study is required"),
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

/**
 * useForgeForm
 * 
 * @returns useForgeForm
 */
export const useForgeForm = () => {
  const router = useRouter();
  const { isLoading, setIsLoading } = useLoading();
  const [showAlert, setShowAlert] = useState(false);

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

  const { mutateAsync: generateResource, isPending } =
    useGenerateResourceMutation({
      onSuccess: (reponse) => {
        Toast.show({ type: "success", text1: reponse.message });
        if (isLoading) {
          setIsLoading(false);
          setShowAlert(false);
          router.push("/library");
        }
      },
      onError: (error) => {
        setIsLoading(false);
        setShowAlert(false);
        Toast.show({ type: "error", text1: error.message });
      },
    });

  useEffect(() => {
    let timeoutId;
    if (isPending) {
      setIsLoading(isPending);
      timeoutId = setTimeout(() => {
        setShowAlert(true);
      }, 5000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isPending, setIsLoading, setShowAlert]);

  useEffect(() => {
    if (showAlert) {
      Alert.alert("Generating a resource may take few minutes.", "", [
        {
          text: "Go to Library",
          onPress: handleAlert,
        },
        {
          text: "Continue Waiting",
          style: "cancel",
          onPress: () => setShowAlert(false),
        },
      ]);
    }
  }, [showAlert, router]);

  const handleAlert = () => {
    form.reset();
    setIsLoading(false);
    router.push("/library");
  };

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

    // call api
    await generateResource(payload);
  };

  return {
    ...form,
    handleSubmit: form.handleSubmit(onSubmit),
    isLoading,
  };
};
