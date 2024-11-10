import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

export const KeyboardDismiss = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>{children}</View>
    </TouchableWithoutFeedback>
  );
};
