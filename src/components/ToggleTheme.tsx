import { TouchableOpacity, Text, View, Switch } from "react-native";
import { useColorScheme } from "nativewind";
import colors from "tailwindcss/colors";
export function ToggleTheme() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <View className="flex-row items-center">
      <Text className="text-yellow-500">Dark</Text>
      <Switch
        trackColor={{ true: colors.blue[400], false: colors.gray[200] }}
        thumbColor={
          colorScheme === "light" ? colors.blue[900] : colors.gray[200]
        }
        onValueChange={toggleColorScheme}
        value={colorScheme === "light"}
      />
      <Text className="text-blue-400">Light</Text>
    </View>
  );
}
