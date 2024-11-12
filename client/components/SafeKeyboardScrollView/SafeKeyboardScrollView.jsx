import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "../SafeAreaView";

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
