import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";

interface Props {
  item: any;
  onPress: () => void;
}

const SpecStudentItem = ({ item, onPress }: Props) => {
  const router = useRouter();
  const db = useSQLiteContext();
  const dispatch = useDispatch();
  console.log("SSSSS", item);

  let itemStyle = styles.notBooked;
  if (item.bookingDate) {
    itemStyle = styles.booked;
  } else {
    itemStyle = styles.notBooked;
  }

  return (
    <Pressable onPress={onPress} style={styles.item}>
      <View style={styles.card}>
        <View style={styles.section}>
          <Text style={itemStyle}>{item.firstName}</Text>
          <Text style={itemStyle}>{item.contactNo}</Text>
        </View>
        <View style={styles.section}>
          <Text style={itemStyle}>
            {item.title} / {item.section}
          </Text>
          <Text style={itemStyle}>
            {item.gender} / {item.age}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={itemStyle}>{item.studentId}</Text>
        </View>
        <View style={styles.sectionIcon}>
          {!item.bookingDate ? (
            <Ionicons name="close-circle" size={40} style={itemStyle} />
          ) : (
            <Ionicons
              name="checkmark-done-outline"
              size={40}
              style={itemStyle}
            />
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    width: "100%",
    flexDirection: "row",
  },
  booked: {
    color: Colors.primary,
  },
  notBooked: {
    color: "black",
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
    margin: 5,
    flexDirection: "row",
    borderRadius: 5,
    elevation: 5,
    justifyContent: "space-between",
  },
  section: {
    width: "30%",
  },
  sectionIcon: {
    width: "10%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
});

export default SpecStudentItem;
