import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { MaterialIcons } from '@expo/vector-icons';
import colors, { black } from "tailwindcss/colors";
import React, { useEffect, useState } from "react";
import { Icon } from "native-base";
import { useConfig } from "@hooks/useConfig";
let widthScreen = 0;
export function Header() {
  const { user, signOut } = useConfig();
  const { width, height } = useWindowDimensions();
  widthScreen = width;
  const [actualTime, setActualTime] = useState(getActualTime());

  function getActualTime() {
    const date = new Date();
    const hour = date.getHours();
    const minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

    return hour + ":" + minutes;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setActualTime(getActualTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={{
        height: 120,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <ImageBackground
        source={require("../../../assets/header-background.png")}
        resizeMode="stretch"
        style={styles.background}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/logo.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.timerContainer}>
            <Text style={styles.textTimer}>{actualTime}</Text>
          </View>
          <TouchableOpacity onPress={signOut}>
            <Icon as={MaterialIcons} name="logout" color="gray.800" size={7} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: widthScreen <= 900 ? 70 : 90,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -1.5,
  },
  image: {
    width: widthScreen <= 900 ? 100 : 140,
    height: widthScreen <= 900 ? 15 : 20,
    marginBottom: 15,
  },
  logoContainer: {
    padding: 8,
    marginTop: widthScreen <= 450 ? -5 : -25,
  },
  nameSchool: {
    fontSize: widthScreen <= 900 ? 10 : 12,
    fontWeight: "bold",
  },
  rightContainer: {
    display: "flex",
    flexDirection: "row",
    marginRight: 2.5,
    justifyContent: "space-between",
    gap: 3
  },
  timerContainer: {
    paddingHorizontal: widthScreen <= 900 ? 4 : 8,
    paddingVertical: widthScreen <= 900 ? 2 : 4,
    borderWidth: 2,
    borderStyle: "dotted",
    borderRadius: 8,
  },
  textTimer: {
    fontSize: widthScreen <= 900 ? 16 : 20,
    fontWeight: "bold",
  },
});
