import React from "react";
import { View, Image } from "react-native";

const AuthLogo = () => {
  return (
    <View className="items-center mt-4 mb-6">
      <View className="w-20 h-20 rounded-2xl items-center justify-center">
        <Image
          source={require("../../assets/images/donedash_logo.png")}
          resizeMode="contain"
          style={{
            width: 48,
            height: 48,
          }}
        />
      </View>
    </View>
  );
};

export default React.memo(AuthLogo);
