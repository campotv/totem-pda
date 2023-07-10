import { TravelDTO } from "@dtos/TravelDTO";
import { api } from "@services/api";
import dayjs from "dayjs";
import { View, Text, Image, StyleSheet } from "react-native";
function Travel({
  serie,
  name,
  imagem,
  estimatedDurationText,
  arrivad,
}: TravelDTO) {

  const parsedDate = dayjs(estimatedDurationText);
  const Hours = parsedDate.format('HH:MM:ss');


  return (
    <View className="flex flex-row h-[84px] w-[100%] mb-[5px] rounded-lg justify-between">
      <View
        className={`flex flex-row h-[84px] w-[5px] rounded-l-lg ${
          arrivad ? "bg-green-800" : "bg-red-800"
        }`}
      ></View>
      <View
        className={`flex-1 flex-row h-[84px] w-[100%]  rounded-r-lg ${
          arrivad ? "bg-green-600" : "bg-white"
        }`}
      >
        <View className="flex flex-row w-[100%] items-center gap-1 justify-between p-1">
          {arrivad ? (
            <Text
              className={`uppercase text-lg font-bold  ${
                arrivad ? "text-white" : "text-gray-800"
              }`}
            >
              {serie}
            </Text>
          ) : (
            <View>
              <Text className={`uppercase text-lg font-bold text-gray-800`}>
              {serie}
              </Text>
              <Text className={`uppercase text-[8px] font-bold text-gray-800`}>
                Previsão
              </Text>
              <Text className={`uppercase text-xs font-bold text-gray-800`}>
               {estimatedDurationText && Hours}
              </Text>
            </View>
          )}

          <Image
            source={{uri: `${api.defaults.baseURL}/api/v1/auth/photo/${imagem}`}}
            style={styles.profile}
          />
          <View className="items-center">
            <Text
              className={`uppercase text-xs font-bold  ${
                arrivad ? "text-white" : "text-gray-800"
              }`}
            >
              {name}
            </Text>
            {/* <Text
              className={`uppercase text-xs font-bold  ${
                arrivad ? "text-white" : "text-gray-800"
              }`}
            >
              Antonio
            </Text> */}
          </View>
        </View>
      </View>
    </View>
  );
}

export { Travel };

const styles = StyleSheet.create({
  profile: {
    height: 60,
    width: 60,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
});
