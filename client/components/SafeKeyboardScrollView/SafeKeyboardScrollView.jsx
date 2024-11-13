import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "../SafeAreaView";
import PropTypes from "prop-types";

export const SafeKeyboardScrollView = ({
  children,
  showsVerticalScrollIndicator = false,
  safeAreaStyle,
  contentContainerStyle,
  style,
  ignoreSafeArea = false,
  edges = ["right", "left", "top", "bottom"],
  ...props
}) => {
  return (
    <SafeAreaView edges={ignoreSafeArea ? [] : edges} style={safeAreaStyle}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          {...{
            ...props,
            style,
            contentContainerStyle,
            showsVerticalScrollIndicator,
          }}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

SafeKeyboardScrollView.propTypes = {
  children: PropTypes.node,
  showsVerticalScrollIndicator: PropTypes.bool,
  safeAreaStyle: PropTypes.object,
  contentContainerStyle: PropTypes.object,
  style: PropTypes.object,
  ignoreSafeArea: PropTypes.bool,
  edges: PropTypes.arrayOf(PropTypes.oneOf(["right", "left", "top", "bottom"])),
};
