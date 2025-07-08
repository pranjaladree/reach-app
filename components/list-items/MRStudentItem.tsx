import { getScreeningByIdFromDB } from "@/database/database";
import { StudentModel } from "@/models/school/StudentModel";
import { setScreeningItem } from "@/store/slices/student-slice";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface Props {
  item: any;
  onPress: () => void;
}

const MRStudentItem = ({ item, onPress }: Props) => {
  const router = useRouter();
  const db = useSQLiteContext();
  const dispatch = useDispatch();

  let itemStyle = styles.notDone;
  if (item.mrNo) {
    itemStyle = styles.refer;
  } else {
    itemStyle = styles.notDone;
  }

  return (
    <Pressable onPress={onPress} style={styles.item}>
      <View style={styles.card}>
        <View>
          <Text style={[itemStyle, styles.name]}>{`${item.firstName}  ${
            item.middleName ? item.middleName : ""
          }  ${item.lastName ? item.lastName : ""}`}</Text>
          <Text style={itemStyle}>{item.contactNo}</Text>
        </View>
        <View>
          <Text>
            {item.title} / {item.section}
          </Text>
          <Text>
            {item.gender} / {item.age}
          </Text>
        </View>
        <View>
          <Text style={item.mrNo == "REFER" ? styles.refer : styles.notDone}>
            {item.mrNo}
          </Text>
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
  name: {
    textTransform: "uppercase",
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
    borderWidth: 1,
    borderColor: Colors.primary,
  },
});

export default MRStudentItem;
