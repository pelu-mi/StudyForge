import PropTypes from "prop-types";
import { View } from "react-native";
import {
  // ProgressBar,
  Text,
  useTheme,
} from "react-native-paper";
import { useStyles } from "./ResourceItem.styles";

export const ResourceItem = ({
  topic,
  title,
  field,
  levelOfStudy,
  isQuizCompleted,
  numberOfQuestions,
  sourceType,
  containerStyle,
}) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  // const progressValue = useMemo(
  //   () => Math.round((completedQuiz / numberOfQuestions) * 100) / 100,
  //   [completedQuiz, numberOfQuestions]
  // );

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.innerContainer, styles.topContainer]}>
        {topic && (
          <Text variant="bodyMedium" style={styles.topicText} numberOfLines={1}>
            {topic}
          </Text>
        )}
        <Text variant="titleMedium" style={styles.titleText} numberOfLines={2}>
          {title}
        </Text>

        <View style={styles.chipWrapper}>
          {sourceType && (
            <Text variant="bodySmall" style={styles.chip}>
              {sourceType} Source
            </Text>
          )}

          {field && (
            <Text variant="bodySmall" style={styles.chip}>
              {field}
            </Text>
          )}

          {levelOfStudy && (
            <Text variant="bodySmall" style={styles.chip}>
              {levelOfStudy}
            </Text>
          )}
        </View>
      </View>

      <View
        style={[
          styles.innerContainer,
          styles.bottomContainer,
          {
            backgroundColor: isQuizCompleted
              ? theme.colors.onSurfaceSuccess
              : theme.colors.onSurfacePrimary,
          },
        ]}
      >
        <View style={styles.quizWrapper}>
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.textSecondary }}
          >
            Quiz ({numberOfQuestions})
          </Text>
          <Text
            variant="bodySmall"
            style={{
              color: isQuizCompleted
                ? theme.colors.success
                : theme.colors.primary,
              fontWeight: 600,
            }}
          >
            {isQuizCompleted ? "Completed" : "Ongoing"}
          </Text>
        </View>

        {/* <ProgressBar
          progress={progressValue}
          color={isQuizCompleted ? theme.colors.success : theme.colors.primary}
          theme={{ colors: { surfaceVariant: theme.colors.progressBarTrack } }}
          style={styles.progressBar}
        /> */}
      </View>
    </View>
  );
};

ResourceItem.propTypes = {
  topic: PropTypes.string,
  title: PropTypes.string.isRequired,
  field: PropTypes.string,
  levelOfStudy: PropTypes.string,
  isQuizCompleted: PropTypes.bool,
  numberOfQuestions: PropTypes.number,
  sourceType: PropTypes.string,
  containerStyle: PropTypes.object,
};
