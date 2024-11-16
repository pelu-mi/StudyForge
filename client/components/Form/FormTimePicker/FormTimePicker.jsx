import { useColorMode } from "@/context/ColorModeProvider";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

export const FormTimePicker = ({ control, name, ...props }) => {
  const { colorMode } = useColorMode();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <RNDateTimePicker
            mode="time"
            value={value ? new Date(value) : new Date()} // Default to current time if value is undefined
            display="spinner"
            themeVariant={colorMode === "light" ? "light" : "dark"}
            onChange={(event, selectedDate) => {
              if (event.type === "set" && selectedDate) {
                onChange(selectedDate.toISOString()); // Save as ISO string
              }
            }}
            {...props}
          />
        );
      }}
    />
  );
};

FormTimePicker.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};
