import { getScreeningByIdFromDB } from "@/database/database";
import { StudentModel } from "@/models/school/StudentModel";
import { setScreeningItem } from "@/store/slices/student-slice";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  item: any;
  onPress: () => void;
}

const SpecStudentItem = ({ item, onPress }: Props) => {
  const router = useRouter();
  const db = useSQLiteContext();
  const dispatch = useDispatch();
  console.log(item);

  return (
    <Pressable onPress={onPress} style={styles.item}>
      <View style={styles.card}>
        <View>
          <Text style={item.bookingDate ? styles.refer : styles.notDone}>
            {item.firstName}
          </Text>
          <Text>{item.contactPersonMobileNo}</Text>
        </View>
        <View>
          <Text style={item.mrNo == "REFER" ? styles.refer : styles.notDone}>
            {item.mrNo}
          </Text>
          <Text>
            {item.classId} / {item.section}
          </Text>
          <Text>
            {item.gender} / {item.age}
          </Text>
        </View>
        <View>
          <Ionicons name="close-circle" size={32} color="grey" />
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
  notDone: {
    color: "black",
  },
  refer: {
    color: "red",
  },
  advice: {
    color: "blue",
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
});

export default SpecStudentItem;
