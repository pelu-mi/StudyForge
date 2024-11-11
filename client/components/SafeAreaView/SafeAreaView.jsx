import { SafeAreaView as ReactSafeAreaView } from "react-native";
import { styles } from "./SafeAreaView.styles";

export const SafeAreaView = ({ children, style, ...rest }) => {
  return (
    <ReactSafeAreaView style={[styles.AndroidSafeArea, style]} {...rest}>
      {children}
    </ReactSafeAreaView>
  );
};
