import { useState } from "react";
import { View } from "react-native";
import { HelperText, TextInput as PaperTextInput } from "react-native-paper";
import { styles } from "./TextInput.styles";

export const TextInput = ({
  mode = "outlined",
  containerStyle,
  helperTextStyle,
  style,
  right,
  secureTextEntry,
  theme,
  error,
  helperText,
  hideHelperTextSpace = false,
  ...props
}) => {
  const [enableSecureText, setEnableSecureText] = useState(secureTextEntry);

  return (
    <View style={[styles.input, containerStyle]}>
      <PaperTextInput
        theme={{ roundness: 10, ...theme }}
        style={style}
        secureTextEntry={enableSecureText}
        right={
          !right &&
          secureTextEntry && (
            <PaperTextInput.Icon
              icon={enableSecureText ? "eye" : "eye-off"}
              onPress={() => setEnableSecureText((prev) => !prev)}
            />
          )
        }
        {...{ ...props, mode, error }}
      />
      {(!hideHelperTextSpace || helperText) && (
        <HelperText
          type={error ? "error" : "info"}
          visible={helperText}
          style={{ paddingVertical: 0, paddingTop: 2 }}
        >
          {helperText}
        </HelperText>
      )}
    </View>
  );
};
