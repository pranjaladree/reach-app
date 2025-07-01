import { Colors } from "@/constants/Colors";
import { Pressable, View, Text, StyleSheet } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  icon?: any;
}

const CustomButton = ({ title, onPress, icon }: Props) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.button}>
        <View style={{ padding: 5 }}>{icon}</View>
        <View style={{ padding: 5 }}>
          <Text style={styles.title}>{title}</Text>
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
    backgroundColor: Colors.primary,
    padding: 10,
  },
  title: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 8,
  },
});

export default CustomButton;
