import { Colors } from "@/constants/Colors";
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  icon?: any;
  disabled?: boolean;
  isLoading?: boolean;
}

const CustomNegativeButton = ({
  title,
  onPress,
  icon,
  disabled,
  isLoading,
}: Props) => {
  return (
    <Pressable onPress={disabled ? () => {} : onPress}>
      <View style={disabled ? styles.buttonDisabled : styles.button}>
        <View style={{ padding: 5 }}>{icon}</View>
        <View style={{ padding: 5 }}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.title}>{title}</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.error,
    padding: 10,
    borderRadius: 5,
  },
  buttonDisabled: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c2c3c4",
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 8,
  },
});

export default CustomNegativeButton;
