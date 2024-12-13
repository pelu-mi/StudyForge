/**
 * Import Modules
 */
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { TouchableOpacity, View, ScrollView, Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useStyles } from "./ResourceInfoPage.styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect } from "react";

/**
 * ResourceInfoPage
 * 
 * @returns ResourceInfoPage
 */
export const ResourceInfoPage = () => {
  const { resourceInfo } = useLocalSearchParams();
  const { title, topic, field, levelOfStudy, numberOfQuestions } =
    JSON.parse(resourceInfo);

  const INFOS = [
    { label: "Topic", value: topic },
    { label: "Field", value: field },
    { label: "Level of Study", value: levelOfStudy },
  ];
  const theme = useTheme();
  const styles = useStyles(theme);
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(modals)/resourceInfo/settings",
              params: { resourceInfo },
            })
          }
        >
          <MaterialCommunityIcons
            name="cog-outline"
            size={24}
            color={theme.colors.tertiary}
          />
        </TouchableOpacity>
      ),
    });
  }, [resourceInfo, router, navigation, theme]);

  const MATERIALS = [
    {
      icon: "file",
      label: "Source",
      pathname: `/(modals)/resourceInfo/source`,
      rightText: "",
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.onSurfacePrimary2,
    },
    {
      icon: "book-open-variant",
      label: "Summary",
      pathname: `/(modals)/resourceInfo/summary`,
      rightText: "",
      borderColor: theme.colors.secondary,
      backgroundColor: theme.colors.onSurfaceSecondary,
    },
    {
      icon: "key",
      label: "Key Concepts",
      pathname: `/(modals)/resourceInfo/keyConcepts`,
      rightText: "",
      borderColor: theme.colors.warning,
      backgroundColor: theme.colors.onSurfaceWarning,
    },
    {
      icon: "cards",
      label: "Quizzes",
      pathname: `/(modals)/resourceInfo/quizzes`,
      rightText: numberOfQuestions,
      borderColor: theme.colors.tertiary,
      backgroundColor: theme.colors.onSurfaceTertiary,
    },
  ];

  return (
    <ScrollView>
      <Pressable style={styles.container}>
        <Text variant="titleLarge" style={styles.title}>
          {title}
        </Text>

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
      </Pressable>
    </ScrollView>
  );
};
