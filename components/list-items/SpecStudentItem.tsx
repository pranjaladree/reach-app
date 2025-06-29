import { Entypo, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";

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
    // <Pressable onPress={onPress} style={styles.item}>
    //   <View style={styles.card}>
    //     <View>
    //       <Text style={item.bookingDate ? styles.refer : styles.notDone}>
    //         {item.firstName}
    //       </Text>
    //       <Text>{item.contactPersonMobileNo}</Text>
    //     </View>
    //     <View>
    //       <Text style={item.mrNo == "REFER" ? styles.refer : styles.notDone}>
    //         {item.mrNo}
    //       </Text>
    //       <Text>
    //         {item.classId} / {item.section}
    //       </Text>
    //       <Text>
    //         {item.gender} / {item.age}
    //       </Text>
    //     </View>
    //     <View>
    //       <Ionicons name="close-circle" size={32} color="grey" />
    //     </View>
    //   </View>
    // </Pressable>

    <Pressable
      onPress={onPress}
      style={[
        styles.studentCard,
        { borderColor: item.mrNo == "REFER" ? "#007AFF" : "#ccc" },
      ]}
    >
      <View style={styles.cardRow}>
        {/* Column 1 */}
        <View style={styles.col1}>
          <Text style={styles.studentName}>{item?.firstName}</Text>
          <Text style={styles.studentPhone}>{item?.contactPersonMobileNo}</Text>
          <Text style={styles.studentPhone}> {item.gender} / {item.age}</Text>

        </View>

        {/* Column 2 */}
        <View style={styles.col2}>
          <Text style={styles.classText}> {item.classId}</Text>
          <Text style={styles.sectionText}>{item.section}</Text>
        </View>

        {/* Column 3 */}
        <TouchableOpacity
          style={styles.col3}
          // onPressIn={() => handleStudentPress(item)}
          // onPress={()=>navigationHandler(item)}
        >
          <Text style={styles.statusIcon}>
            {item.mrNo == "REFER" ? (
              <Feather name="check-circle" size={33} color="#004aad" />
            ) : (
              <Entypo name="circle-with-cross" size={33} color="#afaaaa" />
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

// const styles = StyleSheet.create({
//   item: {
//     width: "100%",
//     flexDirection: "row",
//   },
//   notDone: {
//     color: "black",
//   },
//   refer: {
//     color: "red",
//   },
//   advice: {
//     color: "blue",
//   },
//   card: {
//     flex: 1,
//     backgroundColor: "white",
//     padding: 15,
//     margin: 5,
//     flexDirection: "row",
//     borderRadius: 5,
//     elevation: 5,
//     justifyContent: "space-between",
//   },
// });

export default SpecStudentItem;

const styles = StyleSheet.create({
  count: {
    fontWeight: "bold",
    fontSize: 16,
  },

  // Search
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#004aad",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 13,
    backgroundColor: "#fff",
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
    color: "#888",
  },
  searchInputField: {
    flex: 1,
    height: 40,
  },

  // Card Design
  studentCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1.5,
    padding: 12,
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  col1: {
    flex: 1,
    gap: 5,
  },
  col2: {
    flex: 1.2,
    alignItems: "center",
    gap: 5,
  },
  col3: {
    flex: 0.8,
    alignItems: "flex-end",
  },
  studentName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  studentPhone: {
    fontSize: 13,
    color: "#555",
  },
  classText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222",
  },
  sectionText: {
    fontSize: 13,
    color: "#444",
  },
  statusIcon: {
    fontSize: 28,
  },

  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "90%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#0047AB",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 40,
  },
  searchButton: {
    width: "50%",
    marginTop: 16,
    borderRadius: 6,
    height: 50,
    paddingVertical: 10,
    backgroundColor: "#0047AB",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
});
