import { FormTextInput } from "@/components/Form/FormTextInput";
import { SafeKeyboardScrollView } from "@/components/SafeKeyboardScrollView";
import { Menu } from "@/components/Menu";
import { Text, useTheme } from "react-native-paper";
import { useStyles } from "./ResourceInfoSettingsPage.styles";
import { useResourceSettingsForm } from "./hooks/useResourceSettingsForm";
import { Button } from "@/components/Button";
import { useState } from "react";
import { LEVEL_OF_STUDY } from "../Forge/ForgePage";
import { Alert, Pressable } from "react-native";
import { useDeleteResourceMutation } from "@/services/api/library/useDeleteResourceMutation";
import { useLocalSearchParams, useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export const ResourceInfoSettingsPage = () => {
  const router = useRouter();
  const { resourceInfo } = useLocalSearchParams();
  const { _id } = JSON.parse(resourceInfo);
  const { control, handleSubmit, watch, setValue } = useResourceSettingsForm();
  const theme = useTheme();
  const styles = useStyles(theme);
  const [showLevelOfStudy, setShowLevelOfStudy] = useState(false);
  const levelOfStudy = watch("levelOfStudy");

  const { mutateAsync: deleteResource } = useDeleteResourceMutation({
    onSuccess: (reponse) => {
      Toast.show({ type: "success", text1: reponse.message });
      router.dismissAll();
      router.replace("/library");
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: error.message });
    },
  });

  const handleChangeLevelOfStudy = (value) => {
    setValue("levelOfStudy", value);
    setShowLevelOfStudy(false);
  };

  const handleDeleteResource = () => {
    Alert.alert("Are you sure you want to delete this resource?", "", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          // Call Delete API
          deleteResource({ id: _id });
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <SafeKeyboardScrollView ignoreSafeArea>
      <Pressable style={styles.container}>
        <FormTextInput
          name="title"
          label="Resource Title *"
          placeholder="e.g. Introductory Plant Biology"
          fullWidth
          {...{ control }}
        />

        <FormTextInput
          name="topic"
          label="Topic"
          placeholder="e.g. Introductory Plant Biology"
          fullWidth
          {...{ control }}
        />

        <FormTextInput
          name="field"
          label="Field"
          placeholder="e.g. Biology"
          fullWidth
          {...{ control }}
        />

        {/* Level Of Study Picker */}
        <Menu
          title="Level of Study"
          visible={showLevelOfStudy}
          setVisible={setShowLevelOfStudy}
          items={LEVEL_OF_STUDY}
          selectedItem={levelOfStudy}
          onSelect={handleChangeLevelOfStudy}
          placeholder="Select your level"
        />

        <Button onPress={handleSubmit}>Update Resource</Button>
      </Pressable>

      <Pressable style={styles.dangerZoneContainer}>
        <Text variant="titleMedium" style={styles.text}>
          Danger Zone
        </Text>
        <Button variant="red-outlined" onPress={handleDeleteResource}>
          Delete Resource
        </Button>
      </Pressable>
    </SafeKeyboardScrollView>
  );
};
