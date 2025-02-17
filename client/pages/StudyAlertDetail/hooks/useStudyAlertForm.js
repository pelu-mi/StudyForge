/**
 * Import Modules
 */
import { useForm } from "@/hooks/useForm";
import { useAddStudyAlertMutation } from "@/services/api/studyAlerts/useAddStudyAlertMutation";
import { useUpdateStudyAlertMutation } from "@/services/api/studyAlerts/useUpdateStudyAlertMutation";
import { useLocalSearchParams, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { object, string, array } from "yup";

export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const validationSchema = object({
  day: array().of(string()),
  time: string(),
});

/**
 * useStudyAlertForm
 * 
 * @returns useStudyAlertForm
 */
export const useStudyAlertForm = () => {
  const router = useRouter();
  const { studyAlertId, studyAlert } = useLocalSearchParams();

  let defaultValues = { day: ["Monday"], time: new Date().toISOString() };

  if (studyAlert) {
    try {
      const parsedAlert = JSON.parse(studyAlert);
      const { day, time } = parsedAlert;
      defaultValues = {
        day: day || ["Monday"],
        time: time ? new Date(time).toISOString() : new Date().toISOString(),
      };
    } catch (error) {
      console.error("Failed to parse studyAlert:", error);
    }
  }

  const form = useForm({
    validationSchema,
    defaultValues,
  });

  // Add Study Alert mutation
  const { mutateAsync: addStudyAlert } = useAddStudyAlertMutation({
    onSuccess: (reponse) => {
      Toast.show({ type: "success", text1: reponse.message });
      router.back();
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: error.message });
    },
  });

  // Update Study Alert mutation
  const { mutateAsync: updateStudyAlert } = useUpdateStudyAlertMutation({
    onSuccess: (response) => {
      Toast.show({ type: "success", text1: response.message });
      router.back();
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: error.message });
    },
  });

  const onSubmit = async ({ day, time }) => {
    const sortedDays = day.sort((a, b) => DAYS.indexOf(a) - DAYS.indexOf(b));

    console.log("sortedDays", sortedDays);

    let payload = { day: sortedDays, time };

    if (studyAlertId) {
      // update the study alert
      await updateStudyAlert({ id: studyAlertId, ...payload });
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
