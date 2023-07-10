import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import {
  VStack,
  Image,
  Text,
  Center,
  Heading,
  ScrollView,
  useToast,
} from "native-base";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useConfig } from "@hooks/useConfig";

import Logo from "@assets/logo.png";
import Icon from "@assets/icon.png";
import BackgroundImg from "@assets/background.png";

import { AppError } from "@utils/AppError";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useEffect, useState } from "react";
import { ConfigDTO } from "@dtos/ConfigDTO";

type FormData = {
  ip_totem: string;
};

export function Config() {
  const [isLoading, setIsLoading] = useState(false);

  const { config, saveConfig } = useConfig();
  const navigation = useNavigation();
  const toas = useToast();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfigDTO>();

  async function handleSignIn({ ip_totem }: ConfigDTO) {
    try {
      setIsLoading(true);
      saveConfig(ip_totem).then((res) => {
        navigation.navigate("home");
      });
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível entrar. Tente novamente mais tarde.";

      toas.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
      setIsLoading(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: '#002E36' }}
      showsVerticalScrollIndicator={false}
    >
      {/* <Image
        source={BackgroundImg}
        defaultSource={BackgroundImg}
        alt="background"
        resizeMode="cover"
        position="absolute"
        w={"full"}
        h={"full"}
      /> */}
      <VStack flex={1} px={5} pb={16}>
        <Center my={10}>
          <Image
            source={Icon}
            defaultSource={Icon}
            alt="Logo"
            resizeMode="contain"
            height={20}
          />
          {/* <Text color="gray.100" fontSize="sm">
            Bom para escolas, melhor para você!
          </Text> */}
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Configuração
          </Heading>

          <Controller
            control={control}
            name="ip_totem"
            rules={{ required: "Informe o IP/URL Totem" }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="IP/URL Totem"
                keyboardType="default"
                autoCapitalize="none"
                defaultValue={config.ip_totem}
                onChangeText={onChange}
                errorMessage={errors.ip_totem?.message}
              />
            )}
          />

          <Button
            title="Salvar"
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />

          <Button
            title="Cancelar"
            marginTop={2}           
            bg={"danger.700"}
            _pressed={{
              bg: 'danger.500'  
            }}
            onPress={()=>navigation.navigate("home")}
            isLoading={isLoading}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
