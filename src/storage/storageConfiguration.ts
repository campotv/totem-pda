import AsyncStorage from "@react-native-async-storage/async-storage";

import { ConfigDTO } from '@dtos/ConfigDTO';
import { CONFIG_STORAGE } from '@storage/storageConfig';

export async function storageSave(config: ConfigDTO) {
  await AsyncStorage.setItem(CONFIG_STORAGE, JSON.stringify(config))
}

export async function storageGet() {
  const storage = await AsyncStorage.getItem(CONFIG_STORAGE);

  const config: ConfigDTO = storage ? JSON.parse(storage) : {};

  return config
}

export async function storageRemove() {
  await AsyncStorage.removeItem(CONFIG_STORAGE);
}