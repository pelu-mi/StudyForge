import { useState } from "react";
import { EmptyList } from "@/components/EmptyList";
import { useRouter } from "expo-router";
import { FlatList, TouchableOpacity, View } from "react-native";
import { FAB, Text, useTheme } from "react-native-paper";
import { useStyles } from "./LibraryPage.styles";

export const LibraryPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const styles = useStyles(theme);
  const [resources] = useState([]);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={<Text variant="headlineSmall">Library</Text>}
          data={resources}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: `/profile/studyAlert/${item._id}`,
                  params: { studyAlert: JSON.stringify(item) },
                })
              }
            >
              <Text>Test</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContentContainer}
          ListEmptyComponent={
            <EmptyList
              iconName="book-open-variant"
              message="No Resources"
              containerStyle={{ marginTop: 100 }}
            />
          }
        />
      </View>
      <FAB
        icon="plus"
        customSize={56}
        color={theme.colors.inverseOnSurface}
        style={styles.fab}
        onPress={() => router.push("/forge")}
      />
    </>
  );
};
