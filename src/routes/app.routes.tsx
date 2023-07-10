import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignIn } from "@screens/SignIn";
import { Home } from "@screens/Home";
import { Config } from "@screens/Config";
import { useConfig } from "@hooks/useConfig";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  const { config } = useConfig();
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="home"
    >
      <Screen name="config" component={Config} />
      <Screen name="home" component={Home} />
    </Navigator>
  );
}
