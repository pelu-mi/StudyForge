import { TextInput } from "@/components/TextInput";
import { Controller } from "react-hook-form";

export const FormTextInput = ({
  control,
  name,
  placeholder,
  error: hasError,
  helperText,
  ...props
}) => {
  return (
    <Controller
      {...{ name, control }}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { invalid, error },
      }) => (
        <TextInput
          {...{ ...props, onBlur, placeholder }}
          onChangeText={onChange}
          value={value || ""}
          error={invalid || hasError}
          helperText={helperText || error?.message}
        />
      )}
    />
  );
};
