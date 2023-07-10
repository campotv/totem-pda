import "./src/libs/dayjs";
import { THEME } from "./src/theme";
import { Routes } from "./src/routes";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { AuthContextProvider } from "@contexts/ConfigContext";
import { Loading } from "@components/Loading";
import { NativeBaseProvider, StatusBar } from "native-base";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
