import * as SecureStore from 'expo-secure-store';

const storagePrefix = 'ppz_';

export const setToken = async (token: string): Promise<void> => {
  await SecureStore.setItemAsync(`${storagePrefix}token`, token);
}

export const getToken = async (): Promise<string | null> => {
  const token = await SecureStore.getItemAsync(`${storagePrefix}token`);
  return token;
}

export const clearToken = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(`${storagePrefix}token`);
}