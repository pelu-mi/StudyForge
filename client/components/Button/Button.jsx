import { Button as PaperButton, useTheme } from "react-native-paper";

export const Button = ({
  variant = "primary",
  mode = "contained",
  iconRight = false,
  labelStyle,
  contentStyle,
  style,
  theme,
  ...props
}) => {
  const themeContext = useTheme();

  const getMode = (variant) => {
    switch (variant) {
      case "primary":
        return "contained";

      case "secondary":
        return "outlined";

      case "tertiary":
        return "contained-tonal";

      case "black-outlined":
        return "outlined";

      case "text":
        return "text";

      case "link":
        return "text";

      default:
        return "contained";
    }
  };

  const getLabelStyle = (variant) => {
    switch (variant) {
      case "link":
        return { textDecorationLine: "underline" };

      default:
        return {};
    }
  };

  const getTheme = (variant) => {
    switch (variant) {
      case "primary":
        return { colors: { onSurfaceDisabled: "white" } };

      case "secondary":
        return { colors: { outline: themeContext.colors.primary } };

      case "tertiary":
        return {
          colors: {
            secondaryContainer: themeContext.colors.primaryContainer,
            onSecondaryContainer: themeContext.colors.primary,
          },
        };

      case "black-outlined":
        return {
          colors: { primary: themeContext.colors.text },
        };

      default:
        return {};
    }
  };

  return (
    <PaperButton
      mode={variant ? getMode(variant) : mode}
      labelStyle={[
        {
          fontSize: 16,
          fontWeight: "600",
        },
        getLabelStyle(variant),
        labelStyle,
      ]}
      contentStyle={[
        iconRight && { flexDirection: "row-reverse" },
        contentStyle,
      ]}
      style={[variant !== "link" && { width: "100%" }, style]}
      theme={{ roundness: 2, ...getTheme(variant), ...theme }}
      {...props}
    />
  );
};
