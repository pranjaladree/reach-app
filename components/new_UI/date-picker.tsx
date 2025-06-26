import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { DateType } from "react-native-ui-datepicker";

type Props = {
  selected: DateType;
  onOpen: () => void;
};

export const DateSelector: React.FC<Props> = ({ selected, onOpen }) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.datePicker} onPress={onOpen}>
        <MaterialIcons name="calendar-today" size={20} color="#555" />
        <Text style={styles.dateText}>
          {dayjs(selected).format("DD-MM-YYYY")}
        </Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 30,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
});
