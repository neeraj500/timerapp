import AsyncStorage from '@react-native-async-storage/async-storage';

const TIMERS_KEY = 'timers';

export const loadTimersFromStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(TIMERS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error loading timers from storage:', error);
    return [];
  }
};

export const saveTimersToStorage = async timers => {
  try {
    const jsonValue = JSON.stringify(timers);
    await AsyncStorage.setItem(TIMERS_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving timers to storage:', error);
  }
};
