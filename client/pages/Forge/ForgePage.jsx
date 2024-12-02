import { useEffect, useMemo, useState } from "react";
import { HelperText, Text, useTheme } from "react-native-paper";
import { useStyles } from "./ForgePage.styles";
import { SafeKeyboardScrollView } from "@/components/SafeKeyboardScrollView";
import { FormTextInput } from "@/components/Form/FormTextInput";
import { useForgeForm } from "./hooks/useForgeForm";
import { Button } from "@/components/Button";
import { Pressable, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "expo-router";
import Slider from "@react-native-community/slider";
import { TextInput } from "@/components/TextInput";
import { getDocumentAsync } from "expo-document-picker";
import { Menu } from "@/components/Menu";
import { useExtractTextMutation } from "@/services/api/forge/useExtractTextMutation";
import Toast from "react-native-toast-message";

export const LEVEL_OF_STUDY = ["High School", "Undergraduate", "Graduate"];

export const ForgePage = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
    isLoading,
  } = useForgeForm();
  const [showLevelOfStudy, setShowLevelOfStudy] = useState(false);
  const [fileName, setFileName] = useState("");
  const theme = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation();
  const levelOfStudy = watch("levelOfStudy");
  const numberOfQuestions = watch("numberOfQuestions");
  const sourceType = watch("sourceType");
  const isFileSource = useMemo(() => sourceType === "File", [sourceType]);
  const generatedTextFromFile = watch("generatedTextFromFile");

  const { mutateAsync: extractText } = useExtractTextMutation({
    onError: (error) => {
      Toast.show({ type: "error", text1: error.message });
    },
  });

  const handleChangeLevelOfStudy = (value) => {
    setValue("levelOfStudy", value);
    setShowLevelOfStudy(false);
    if (value !== "") {
      clearErrors("levelOfStudy");
    }
  };

  const handleEndEditingNumberOfQuestions = (event) => {
    let newValue = event.nativeEvent.text;

    // If the value is empty or non-numeric, reset to 10
    if (newValue === "" || isNaN(newValue)) {
      newValue = 10;
    } else {
      newValue = parseInt(newValue);
    }

    // Clamp the value between 10 and 40
    if (newValue < 10) {
      newValue = 10;
    } else if (newValue > 40) {
      newValue = 40;
    }

    setValue("numberOfQuestions", newValue); // Update form value
  };

  const handleSelectFile = async () => {
    try {
      const docRes = await getDocumentAsync({
        type: "application/pdf",
      });

      const assets = docRes.assets;
      if (!assets) return;

      const file = assets[0];

      const fileData = {
        name: file.name,
        uri: file.uri,
        type: file.mimeType,
        size: file.size,
      };

      const form = new FormData();
      form.append("file", fileData);

      // Set file name
      setFileName(file.name);

      //  Conver PDF to text
      const response = await extractText(form);
      const extractedText = response.data.data;

      // Set value
      setValue("generatedTextFromFile", extractedText);
    } catch (error) {
      console.log("Error while selecting file: ", error);
    }
  };

  const handleDeleteFile = () => {
    setFileName("");
    setValue("generatedTextFromFile", "");
  };

  const handleSetIsFileSource = (isFileSource) => {
    if (isFileSource) {
      setValue("sourceType", "File");
      setValue("textSource", "");
    } else {
      setValue("sourceType", "Text");
      setValue("generatedTextFromFile", "");
    }
  };

  const renderSource = () => {
    if (isFileSource) {
      return generatedTextFromFile !== "" ? (
        <View style={styles.fileItem}>
          <View style={styles.fileLeftWrapper}>
            <MaterialCommunityIcons
              name="file"
              size={24}
              color={theme.colors.primary}
            />
            <Text
              variant="titleMedium"
              style={styles.fileLabel}
              numberOfLines={1}
            >
              {fileName}
            </Text>
          </View>

          <TouchableOpacity onPress={handleDeleteFile}>
            <MaterialCommunityIcons
              name="close"
              size={24}
              color={theme.colors.error}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <TouchableOpacity onPress={handleSelectFile} style={styles.button}>
            <MaterialCommunityIcons
              name="file-plus"
              size={24}
              color={theme.colors.primary}
            />
            <Text variant="" style={styles.buttonText}>
              Choose from files
            </Text>
          </TouchableOpacity>
          {errors.generatedTextFromFile?.message && (
            <HelperText type="error">
              {errors.generatedTextFromFile?.message}
            </HelperText>
          )}
        </>
      );
    } else {
      return (
        <FormTextInput
          name="textSource"
          multiline
          placeholder="What would you like to learn?"
          style={styles.sourceTextInput}
          hideHelperTextSpace
          {...{ control }}
        />
      );
    }
  };

  useEffect(() => {
    const focusUnsubscribe = navigation.addListener("focus", () => {
      reset();
    });
    const blurUnsubscribe = navigation.addListener("blur", () => {
      reset();
    });
    return () => {
      focusUnsubscribe();
      blurUnsubscribe();
    };
  }, [navigation, reset]);

  return (
    <SafeKeyboardScrollView ignoreSafeArea>
      <Pressable style={styles.container}>
        <Text variant="headlineSmall">Forge</Text>

        <FormTextInput
          name="title"
          label="Resource Title *"
          placeholder="e.g. Introductory Plant Biology"
          fullWidth
          {...{ control }}
        />

        <FormTextInput
          name="topic"
          label="Topic *"
          placeholder="e.g. Introductory Plant Biology"
          fullWidth
          {...{ control }}
        />

        <FormTextInput
          name="field"
          label="Field *"
          placeholder="e.g. Biology"
          fullWidth
          {...{ control }}
        />

        {/* Level Of Study Picker */}
        <Menu
          title="Level of Study *"
          visible={showLevelOfStudy}
          setVisible={setShowLevelOfStudy}
          items={LEVEL_OF_STUDY}
          selectedItem={levelOfStudy}
          onSelect={handleChangeLevelOfStudy}
          placeholder="Select your level"
          errorMessage={errors.levelOfStudy?.message}
        />

        {/* Number of Quiz Questions Slider */}
        <View style={styles.fieldContainer}>
          <Text variant="titleMedium">Number of Quiz Questions *</Text>

          <View style={styles.sliderWrapper}>
            <Slider
              step={1}
              style={styles.slider}
              value={numberOfQuestions}
              minimumValue={10}
              maximumValue={40}
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor={theme.colors.surfaceVariant}
              onValueChange={(value) => setValue("numberOfQuestions", value)}
            />
            <TextInput
              inputMode="numeric"
              name="numberOfQuestions"
              keyboardType="number-pad"
              hideHelperTextSpace
              value={String(numberOfQuestions)}
              onChangeText={(text) => setValue("numberOfQuestions", text)}
              onEndEditing={handleEndEditingNumberOfQuestions}
              style={styles.sliderInput}
            />
          </View>
        </View>

        {/* Source File / Source Text*/}
        <View style={styles.fieldContainer}>
          <Text variant="titleMedium">Source *</Text>

          <View style={styles.sourceTypeWrapper}>
            <TouchableOpacity
              onPress={() => handleSetIsFileSource(true)}
              style={[
                styles.sourceTypeButton,
                {
                  backgroundColor: isFileSource
                    ? theme.colors.primary
                    : "transparent",
                },
              ]}
            >
              <Text
                variant="titleMedium"
                style={[
                  styles.fileLabel,
                  {
                    color: isFileSource
                      ? theme.colors.inverseOnSurface
                      : theme.colors.textSecondary,
                  },
                ]}
              >
                File
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleSetIsFileSource(false)}
              style={[
                styles.sourceTypeButton,
                {
                  backgroundColor: !isFileSource
                    ? theme.colors.primary
                    : "transparent",
                },
              ]}
            >
              <Text
                variant="titleMedium"
                style={[
                  styles.fileLabel,
                  {
                    color: !isFileSource
                      ? theme.colors.inverseOnSurface
                      : theme.colors.textSecondary,
                  },
                ]}
              >
                Text
              </Text>
            </TouchableOpacity>
          </View>

          {renderSource()}
        </View>

        <Button
          onPress={handleSubmit}
          disabled={isLoading}
          labelStyle={{ color: theme.colors.inverseOnSurface }}
        >
          {isLoading ? "Generating..." : "Forge"}
        </Button>
      </Pressable>
    </SafeKeyboardScrollView>
  );
};
