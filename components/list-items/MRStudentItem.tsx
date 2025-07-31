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

  return (
    <Pressable onPress={onPress} style={styles.item}>
      <View style={styles.card}>
        <View style={styles.section}>
          <Text style={[styles.refer, styles.name]}>{`${item.firstName}  ${
            item.middleName ? item.middleName : ""
          }  ${item.lastName ? item.lastName : ""}`}</Text>
          <Text style={styles.refer}>{item.contactNo}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.refer}>
            {item.title} / {item.section}
          </Text>
          <Text style={styles.refer}>
            {item.gender} / {item.age}
          </Text>
        </View>
        <View style={styles.sectionIcon}>
          <Text style={styles.refer}>{item.mrNo}</Text>
        </View>
        <View style={styles.sectionIcon}>
          {!item.mrNo ? (
            <Ionicons name="close-circle" size={20} color="grey" />
          ) : (
            <Ionicons name="checkmark-done-outline" size={20} color="red" />
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
  section: {
    width: "30%",
  },
  sectionIcon: {
    width: "10%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
});

export default MRStudentItem;
