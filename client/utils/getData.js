import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    console.log('value from storage', value)
    return value !== null ? value : null;
  } catch (error) {
    // error reading value
    console.log("Get data error: " + error);
  }
};
