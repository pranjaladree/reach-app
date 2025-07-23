import { View, Text, StyleSheet } from "react-native";
import CustomInput from "../utils/CustomInput";
import CustomButton from "../utils/CustomButton";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  onBook: () => void;
  frameModel: string;
  onChangeText: (val: string) => void;
  isLoading: boolean;
}

const BookSpectacle = ({
  frameModel,
  onChangeText,
  onBook,
  isLoading,
}: Props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Book Spectacle</Text>
      </View>
      <View style={styles.divider}></View>
      <View style={styles.box}>
        <CustomInput
          id="frame"
          label="Frame Model"
          value={frameModel}
          onChangeText={onChangeText}
        />
      </View>
      <View style={styles.action}>
        <CustomButton
          title="Book Now"
          onPress={onBook}
          isLoading={isLoading}
          icon={
            <Ionicons name="checkmark-circle-outline" size={20} color="white" />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 22,
    color: Colors.primary,
    textTransform: "uppercase",
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    borderWidth: 0.3,
    borderColor: Colors.primary,
  },
  box: {
    marginTop: 40,
  },
  action: {
    marginTop: 20,
  },
});

export default BookSpectacle;
