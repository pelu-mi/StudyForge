import { TextInput as PaperTextInput } from "react-native-paper";
import { styles } from "./TextInput.styles";
import { useState } from "react";

export const TextInput = ({
  style,
  right,
  secureTextEntry,
  theme,
  ...props
}) => {
  const [enableSecureText, setEnableSecureText] = useState(secureTextEntry);

  return (
    <PaperTextInput
      theme={{ roundness: 10, ...theme }}
      style={[style, styles.input]}
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
      {...props}
    />
  );
};
