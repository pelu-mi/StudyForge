/**
 * Import Modules
 */
import { object, ref, string } from "yup";
import { useForm } from "@/hooks/useForm";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useChangePasswordMutation } from "@/services/api/user/useChangePasswordMutation";

/**
 * Validation for reset password form
 */
const validationSchema = object({
  currentPassword: string().required("Current Password is required"),
  newPassword: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: string()
    .required("Confirm password is required")
    .min(8, "Password must be at least 8 characters")
    .oneOf([ref("newPassword"), undefined], "Passwords must match"),
});

/**
 * useChangePasswordForm - Custom hook to manage Change password form
 *
 * @param {string} email - Email address of user that wants to reset password
 */
export const useChangePasswordForm = () => {
  const router = useRouter();
  const form = useForm({ validationSchema });

  // Handle success and error
  const { mutateAsync: changePassword } = useChangePasswordMutation({
    onSuccess: async (data) => {
      Toast.show({ type: "success", text1: data.message });
      router.back();
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: error.message });
    },
  });

  const onSubmit = async ({ newPassword }) => {
    const payload = { newPassword };
    console.log("payload", payload);

    await changePassword(payload);
  };

  return {
    ...form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
