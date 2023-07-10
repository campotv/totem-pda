import { createContext, ReactNode, useEffect, useState } from "react";
import {
  storageGet,
  storageRemove,
  storageSave,
} from "@storage/storageConfiguration";

import { ConfigDTO } from "@dtos/ConfigDTO";

export type AuthContextDataProps = {
  config: ConfigDTO;
  saveConfig: (ip_totem: string) => Promise<void>;
  isLoadingUserStorageData: boolean;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const ConfigContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [config, setConfig] = useState<ConfigDTO>({} as ConfigDTO);

  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);

  async function storageConfigSave(config: ConfigDTO) {
    try {
      setIsLoadingUserStorageData(true);
      await storageSave(config);
      setConfig(config);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function saveConfig(ip_totem: string) {
    try {
      storageConfigSave({
        ip_totem,
      });

    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function loadConfigData() {
    try {
      setIsLoadingUserStorageData(true);

      const configLogged = await storageGet();

      if (configLogged) {
        storageConfigSave(configLogged);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    loadConfigData();
  }, []);

  return (
    <ConfigContext.Provider
      value={{
        config,
        saveConfig,
        isLoadingUserStorageData,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}
