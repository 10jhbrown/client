import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Save feed data to AsyncStorage if there's a difference between the new data and the stored data.
 * @param {string} key - The key under which the feed data is stored in AsyncStorage.
 * @param {Array} newFeed - The new feed data to be stored.
 */
export const saveFeedToAsyncStorage = async (key, newFeed) => {
  try {
    const storedFeed = await AsyncStorage.getItem(key);
    const parsedStoredFeed = storedFeed ? JSON.parse(storedFeed) : [];

    if (JSON.stringify(parsedStoredFeed) !== JSON.stringify(newFeed)) {
      await AsyncStorage.setItem(key, JSON.stringify(newFeed));
    }
  } catch (e) {
    console.error("Error saving feed data to AsyncStorage:", e);
  }
};

/**
 * Load feed data from AsyncStorage.
 * @param {string} key - The key under which the feed data is stored in AsyncStorage.
 * @returns {Promise<Array>} - The feed data stored in AsyncStorage.
 */
export const loadFeedFromAsyncStorage = async (key) => {
  try {
    const storedFeed = await AsyncStorage.getItem(key);
    return storedFeed ? JSON.parse(storedFeed) : [];
  } catch (e) {
    console.error("Error loading feed data from AsyncStorage:", e);
    return [];
  }
};
