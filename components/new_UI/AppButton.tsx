import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Button } from "react-native-paper";

type AppButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  loading = false,
  style,
  disabled = false,
}) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      style={[
        { width: "100%", backgroundColor: Colors.primary, borderRadius: 5 },
        style,
      ]} // outer button container
      contentStyle={{
        paddingVertical: 5, // internal padding (no press flicker)
      }}
      labelStyle={{
        fontSize: 16,
        fontWeight: "600",
      }}
    >
      {title}
    </Button>
  );
};

export default AppButton;
