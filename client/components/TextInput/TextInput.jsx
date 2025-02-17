/**
 * Import Modules
 */
import { useState } from "react";
import { View } from "react-native";
import { HelperText, TextInput as PaperTextInput } from "react-native-paper";
import { styles } from "./TextInput.styles";
import PropTypes from "prop-types";

/**
 * TextInput
 * 
 * @param {*} props 
 * @returns TextInput
 */
export const TextInput = ({
  mode = "outlined",
  containerStyle,
  helperTextStyle,
  style,
  left,
  right,
  secureTextEntry,
  theme,
  error,
  helperText,
  hideHelperTextSpace = false,
  fullWidth,
  ...props
}) => {
  const [enableSecureText, setEnableSecureText] = useState(secureTextEntry);

  return (
    <View
      style={[styles.input, containerStyle, { width: fullWidth && "100%" }]}
    >
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
        {...{ ...props, left, mode, error }}
      />
      {(!hideHelperTextSpace || helperText) && (
        <HelperText
          type={error ? "error" : "info"}
          visible={helperText}
          style={[{ paddingVertical: 0, paddingTop: 2 }, helperTextStyle]}
        >
          {helperText}
        </HelperText>
      )}
    </View>
  );
};

// Specify types of props to be received by TextInput
TextInput.propTypes = {
  mode: PropTypes.oneOf(["flat", "outlined"]),
  containerStyle: PropTypes.object,
  helperTextStyle: PropTypes.object,
  style: PropTypes.object,
  left: PropTypes.node,
  right: PropTypes.node,
  secureTextEntry: PropTypes.bool,
  theme: PropTypes.object,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  hideHelperTextSpace: PropTypes.bool,
  fullWidth: PropTypes.bool,
};
