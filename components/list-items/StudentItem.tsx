import { StudentModel } from "@/models/school/StudentModel";
import { setScreeningItem } from "@/store/slices/student-slice";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  item: StudentModel;
  onPress: () => void;
}

const StudentItem = ({ item, onPress }: Props) => {
  const router = useRouter();
  const db = useSQLiteContext();
  const dispatch = useDispatch();

  return (
    <Pressable onPress={onPress} style={styles.item}>
      <View style={styles.card}>
        <View style={styles.section}>
          <Text>{item.firstName}</Text>
          <Text>{item.contactPersonMobileNo}</Text>
        </View>
        <View style={styles.section}>
          <Text>
            {item.classTitle} / {item.section}
          </Text>
          <Text>
            {item.gender} / {item.age}
          </Text>
        </View>
        <View style={styles.section}>
          <Text>{item.tempId}</Text>
        </View>
        <View style={styles.sectionIcon}>
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

export default StudentItem;
