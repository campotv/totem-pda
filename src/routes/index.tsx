import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useConfig } from "@hooks/useConfig";
import { Loading } from "@components/Loading";
import { AppRoutes } from "./app.routes";
import { Box } from "native-base";

export function Routes() {
  const { config, isLoadingUserStorageData } = useConfig();

  if (isLoadingUserStorageData) {
    return <Loading />;
  }
  return (
    <Box flex={1}  bg="gray.700">
      <NavigationContainer>
        {/* {config.ip_totem ? <AppRoutes /> : <AuthRoutes />} */}
        <AppRoutes />
      </NavigationContainer>
    </Box>
  );
}
