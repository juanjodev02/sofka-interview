import { Button, ScreenContainer, Text, View } from "@components";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useThemeColor } from "@hooks";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

export default function Success() {
  const { t } = useTranslation();
  const params = useLocalSearchParams();
  const router = useRouter();
  const primaryColor = useThemeColor({}, "primary");

  const onPress = () => {
    router.back();
  };

  return (
    <ScreenContainer>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <View>
          <Text variant="heading">{t("utils.successRegister")}</Text>
          <Text variant="body">{t(String(params?.description))}</Text>
        </View>
        <View style={{ flex: 1 }} />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <AntDesign name="checkcircle" size={150} color={primaryColor} />
        </View>
        <View style={{ flex: 1 }} />
        <Button variant="secondary" title="Finalizar" onPress={onPress} />
      </View>
    </ScreenContainer>
  );
}
