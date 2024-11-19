import { useEffect, useState } from "react";
import { HelperText, Menu, Text, useTheme } from "react-native-paper";
import { useStyles } from "./ForgePage.styles";
import { SafeKeyboardScrollView } from "@/components/SafeKeyboardScrollView";
import { FormTextInput } from "@/components/Form/FormTextInput";
import { useForgeForm } from "./hooks/useForgeForm";
import { Button } from "@/components/Button";
import { TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "expo-router";
import Slider from "@react-native-community/slider";
import { TextInput } from "@/components/TextInput";
import { getDocumentAsync } from "expo-document-picker";

const LEVEL_OF_STUDY = ["High School", "Undergrad", "Post Grad"];

export const ForgePage = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForgeForm();
  const [showLevelOfStudy, setShowLevelOfStudy] = useState(false);
  const [isFileSource, setIsFileSource] = useState(true);
  const theme = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation();
  const levelOfStudy = watch("levelOfStudy");
  const numberOfQuestions = watch("numberOfQuestions");
  const source = watch("source");

  const handleChangeLevelOfStudy = (value) => {
    setValue("levelOfStudy", value);
    setShowLevelOfStudy(false);
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

      setValue("source", fileData);

      console.log("fileData", fileData);
    } catch (error) {
      console.log("Error while selecting file: ", error);
    }
  };

  const handleDeleteFile = () => {
    setValue("source", null);
  };

  const handleSetIsFileSource = (isFileSource) => {
    if (isFileSource) {
      setValue("source", null);
    } else {
      setValue("source", "");
    }
    setIsFileSource(isFileSource);
  };

  const renderSource = () => {
    if (isFileSource) {
      return source ? (
        <View style={styles.fileItem}>
          <View style={styles.fileLeftWrapper}>
            <MaterialCommunityIcons
              name="file"
              size={24}
              color={theme.colors.primary}
            />
            <Text variant="titleMedium" style={styles.fileLabel}>
              {source.name}
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
          <Button
            variant="tertiary"
            onPress={handleSelectFile}
            icon={({ color }) => (
              <MaterialCommunityIcons
                name="file-plus"
                size={24}
                color={color}
              />
            )}
          >
            Choose from files
          </Button>
          {errors.source?.message && (
            <HelperText type="error">{errors.source?.message}</HelperText>
          )}
        </>
      );
    } else {
      return (
        <FormTextInput
          name="source"
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
    <SafeKeyboardScrollView
      contentContainerStyle={styles.container}
      ignoreSafeArea
    >
      <Text variant="headlineSmall">Forge</Text>

      <FormTextInput
        name="resourceTitle"
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
      <View style={styles.fieldContainer}>
        <Text variant="titleMedium">Level of Study</Text>
        <Menu
          visible={showLevelOfStudy}
          onDismiss={() => setShowLevelOfStudy(false)}
          anchorPosition="bottom"
          anchor={
            <TouchableOpacity onPress={() => setShowLevelOfStudy(true)}>
              <View style={styles.menuWrapper}>
                <Text
                  variant="bodyLarge"
                  style={{
                    color:
                      levelOfStudy !== ""
                        ? theme.colors.text
                        : theme.colors.onSurfaceVariant,
                    textTransform: levelOfStudy !== "" ? "capitalize" : "none",
                  }}
                >
                  {levelOfStudy !== "" ? levelOfStudy : "Select your level"}
                </Text>
                <MaterialCommunityIcons
                  name="unfold-more-horizontal"
                  size={24}
                  color={theme.colors.textSecondary}
                />
              </View>
            </TouchableOpacity>
          }
        >
          {LEVEL_OF_STUDY.map((level, index) => (
            <Menu.Item
              key={index}
              onPress={() => handleChangeLevelOfStudy(level)}
              title={level}
            />
          ))}
        </Menu>
      </View>

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

      <Button onPress={handleSubmit}>Forge</Button>
    </SafeKeyboardScrollView>
  );
};
