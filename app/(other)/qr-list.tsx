import QRItem from "@/components/list-items/QRItem";
import ViewQR from "@/components/qr/ViewQR";
import { getMRTagStudentsOneBySchoolId } from "@/database/database";
import { StudentModel } from "@/models/school/StudentModel";
import { RootState } from "@/store/store";
import { EvilIcons, Feather } from "@expo/vector-icons";
import {
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// import { Modal } from "react-native-paper";
import { useSelector } from "react-redux";

const QRList = () => {
  const router = useRouter();
  const db = useSQLiteContext();
  const { schoolId } = useLocalSearchParams();
  const [studentList, setStudentList] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filteredStudents = useSelector(
    (state: RootState) => state.studentSlice.filteredStudents
  );
  console.log("Filter Students", filteredStudents.length);
  const [searchTerm, setSearchTerm] = useState("");

  const searchTermChangeHandler = (val: string) => {
    setSearchTerm(val);
  };

  const [selectedItem, setSelectedItem] = useState<any>();

  const navigationHandler = (item: StudentModel) => {
    router.push({
      pathname: "/mr-tag-detail",
      params: {
        studentId: item.id,
        studentName: item.firstName,
      },
    });
  };

  const openModalHandler = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  const getStudents = async () => {
    console.log("GETTING Students....");
    if (schoolId) {
      const response: any = await getMRTagStudentsOneBySchoolId(
        db,
        schoolId?.toString()
      );
      console.log("RESPONS", response);
      if (response) {
        setStudentList(response);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      getStudents();
      return () => {
        console.log("Screen unfocused");
      };
    }, [])
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "View QR",
          headerShown: true,
        }}
      />
      <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.count}>Total Count : {studentList.length}</Text>

            <>
              <Text style={styles.count}>Done : {studentList.length}</Text>
              <Text style={styles.count}>Not Done : {studentList.length}</Text>
            </>
          </View>
          {/* <View>
            <InputBox
              value={searchTerm}
              placeholder="Search Student"
              onChangeText={searchTermChangeHandler}
            />
          </View> */}

          {/* Search Input */}
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>
              <EvilIcons name="search" size={30} color="#878585" />
            </Text>
            <TextInput
              placeholder="Search Student"
              style={styles.searchInputField}
              value={searchTerm}
              onChangeText={searchTermChangeHandler}
            />
          </View>
        </View>
        <View style={{ padding: 10 }}>
          <FlatList
            data={studentList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <QRItem item={item} onPress={openModalHandler.bind(this, item)} />
            )}
          />
        </View>
      </View>
      <Modal visible={isModalOpen} onDismiss={closeModalHandler}>
        <ViewQR item={selectedItem} setIsModalOpen={setIsModalOpen} />
      </Modal>

      {/* <Modal
        visible={isModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalOpen(false)}
      >
        <Pressable
          style={styles.modalContainer}
          onPress={() => setIsModalOpen(false)}
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={{ width: "100%", padding: 20, alignItems: "center" }}
          >
            <View style={styles.dialogCard}>
              <Image
                source={require("@/assets/images/QR_code.png")}
                style={{ width: 200, height: 200, alignSelf: "center" }}
              />
              <Text style={styles.studentId}>STUDENT ID: AS-01-002-27</Text>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.searchButton}
                  // onPress={handleBookNow}
                >
                  <Feather name="printer" size={24} color="white" />
                  <Text style={{ color: "#fff", textAlign: "center" }}>
                    Print QR
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal> */}
    </>
  );
};

export default QRList;

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
  studentId: {
    // paddingTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#004aad",
    textAlign: "center",
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
