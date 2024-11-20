import { useLocalSearchParams, useRouter } from "expo-router";
import { TouchableOpacity, View, ScrollView } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useStyles } from "./ResourceInfoPage.styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const ResourceInfoPage = () => {
  const { resourceInfo } = useLocalSearchParams();
  const { resourceTitle, topic, field, levelOfStudy, numberOfQuestions } =
    JSON.parse(resourceInfo);
  const INFOS = [
    { label: "Topic", value: topic },
    { label: "Field", value: field },
    { label: "Level of Study", value: levelOfStudy },
  ];
  const theme = useTheme();
  const styles = useStyles(theme);
  const router = useRouter();

  const MATERIALS = [
    {
      icon: "file",
      label: "Source",
      pathname: `/library/resourceInfo/source`,
      rightText: "",
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.onSurfacePrimary2,
    },
    {
      icon: "book-open-variant",
      label: "Summary",
      pathname: `/library/resourceInfo/summary`,
      rightText: "",
      borderColor: theme.colors.secondary,
      backgroundColor: theme.colors.onSurfaceSecondary,
    },
    {
      icon: "key",
      label: "Key Concepts",
      pathname: `/library/resourceInfo/keyConcepts`,
      rightText: "",
      borderColor: theme.colors.warning,
      backgroundColor: theme.colors.onSurfaceWarning,
    },
    {
      icon: "cards",
      label: "Quizzes",
      pathname: `/library/resourceInfo/quizzes`,
      rightText: numberOfQuestions,
      borderColor: theme.colors.tertiary,
      backgroundColor: theme.colors.onSurfaceTertiary,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="titleLarge">{resourceTitle}</Text>

      {/* Info */}
      {INFOS.map((info, index) => (
        <View style={styles.infoWrapper} key={index}>
          <Text variant="labelMedium" style={styles.infoTitle}>
            {info.label}
          </Text>
          <Text variant="bodyLarge">{info.value}</Text>
        </View>
      ))}

      {/* Materials */}
      <Text variant="bodyLarge" style={styles.sectionTitle}>
        Materials
      </Text>

      {MATERIALS.map((material, index) => {
        const {
          icon,
          label,
          pathname,
          rightText,
          borderColor,
          backgroundColor,
        } = material;
        return (
          <TouchableOpacity
            key={index}
            onPress={() =>
              router.push({
                pathname,
                params: { resourceInfo },
              })
            }
          >
            <View
              style={[styles.listContainer, { borderColor, backgroundColor }]}
            >
              {/* Left */}
              <View style={styles.listContentWrapper}>
                <MaterialCommunityIcons
                  name={icon}
                  size={24}
                  color={borderColor}
                />
                <Text variant="bodyLarge">{label}</Text>
              </View>

              {/* Right */}
              <View style={styles.listContentWrapper}>
                <Text
                  variant="bodyLarge"
                  style={{ color: theme.colors.textDarkGrey }}
                >
                  {rightText}
                </Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color={theme.colors.textSecondary}
                />
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};
