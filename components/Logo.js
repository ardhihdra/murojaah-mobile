import { mainColor, mainShadow } from "@styles/Main.styles";
import { Text } from "react-native";

export default function Logo({

}) {
  return (
    <Text
      style={{
        textAlign: 'center',
        color: mainColor.primary,
        fontFamily: 'open-sans-extra-bold-italic',
        fontSize: 32,
        ...mainShadow,
      	shadowRadius: 1,
        shadowColor: mainColor.blue,
      }}
    >
      MUROJAAH
    </Text>
  )
}