import { useForm } from "@/hooks/useForm";
import { useAddStudyAlertMutation } from "@/services/api/studyAlerts/useAddStudyAlertMutation";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { object, string, array } from "yup";

const validationSchema = object({
  day: array().of(string()),
  time: string(),
});

export const useStudyAlertForm = ({ studyAlertId, defaultValues }) => {
  const router = useRouter();

  const form = useForm({
    validationSchema,
    defaultValues: defaultValues || {
      day: ["Monday"],
      time: new Date().toISOString(),
    },
  });

  const { mutateAsync: addStudyAlert } = useAddStudyAlertMutation({
    onSuccess: (reponse) => {
      Toast.show({ type: "success", text1: reponse.message });
      router.back();
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: error.message });
    },
  });

  const onSubmit = async ({ day, time }) => {
    const payload = { day, time };

    if (studyAlertId) {
      // update the study alert
    } else {
      // add the study alert
      await addStudyAlert(payload);
    }
  };

  return {
    ...form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
