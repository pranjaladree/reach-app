import { getPSStudentsBySchoolId } from "@/database/database";
import { RootState } from "@/store/store";
import { Entypo, EvilIcons, Feather } from "@expo/vector-icons";
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
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

const ScreeningList = () => {
  const db = useSQLiteContext();
  const filteredStudents = useSelector(
    (state: RootState) => state.studentSlice.filteredStudents
  );
  const { schoolId } = useLocalSearchParams();
  console.log("SCHOOL ID", schoolId);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [studentList, setStudentList] = useState<any[]>([]);

  const searchTermChangeHandler = (val: string) => {
    setSearchTerm(val);
  };

  const navigationHandler = (item: any) => {
    console.log("NAVIGA", item);
    router.push({
      pathname: "/screening-detail",
      params: {
        studentId: item.id,
        studentName: item.firstName,
        schoolId: schoolId,
        isMarkedForQc: item.isMarkedForQc?.toString(),
      },
    });
  };

  const getStudents = async () => {
    console.log("GETTING Students....");
    if (schoolId) {
      const response: any = await getPSStudentsBySchoolId(
        db,
        schoolId?.toString()
      );
      if (response) {
        setStudentList(response);
      }
    }
  };

  //   const filteredStudents = students.filter((student) =>
  //   student?.name?.toLowerCase().includes(searchText.toLowerCase())
  // );

  useFocusEffect(
    useCallback(() => {
      getStudents();
      return () => {
        console.log("Screen unfocused");
      };
    }, [])
  );

  console.log("#############<==PARL==>############");
  console.log("STUDENTS", studentList[0]);
  console.log("#############<==PARL==>############");

  return (
    // <View style={{ flex: 1 }}>
    //   <View style={{ padding: 10, marginBottom: 20 }}>
    //     <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    //       <Text>Total Student: {studentList.length}</Text>
    //       <Text>Done:</Text>
    //       <Text>Not Done :</Text>
    //     </View>
    //     <View style={{ marginTop: 10 }}>
    //       <CustomInput
    //         id="search"
    //         label="Search Student"
    //         value={searchTerm}
    //         onChangeText={searchTermChangeHandler}
    //       />
    //     </View>
    //   </View>

    //   <>
    //     {/* <View style={{ paddingHorizontal: 10, paddingBottom: 20 }}> */}
    //     <View style={{ paddingHorizontal: 10, marginTop: 40, flexGrow: 1, paddingBottom: 150 }}>
    //     <FlatList
    //       data={studentList}
    //       keyExtractor={(item) => item.id.toString()}
    //       contentContainerStyle={{ flexGrow: 1 }}
    //       showsVerticalScrollIndicator={false}
    //       renderItem={({ item }) => (
    //         <PSStudentItem
    //           item={item}
    //           onPress={navigationHandler.bind(this, item)}
    //         />
    //       )}
    //     />
    //   </View>
    //   </>

    // </View>
    <>
      <Stack.Screen
        options={{
          title: "Primary Screening",
          headerShown: true,
        }}
      />
      <View style={{ flex: 1, padding: 16 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.count}>Total Count : {studentList.length}</Text>

          <>
            <Text style={styles.count}>Done : {studentList.length}</Text>
            <Text style={styles.count}>Not Done : {studentList.length}</Text>
          </>
        </View>

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

        {/* Student List */}
        <FlatList
          data={studentList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={navigationHandler.bind(this, item)}
              style={[
                styles.studentCard,
                { borderColor: item?.booked ? "#007AFF" : "#ccc" },
              ]}
            >
              <View style={styles.cardRow}>
                {/* Column 1 */}
                <View style={styles.col1}>
                  <Text style={styles.studentName}>{item?.firstName}</Text>
                  <Text style={styles.studentPhone}>{item?.contactNo}</Text>
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
                    {item?.booked ? (
                      <Feather name="check-circle" size={33} color="#004aad" />
                    ) : (
                      <Entypo
                        name="circle-with-cross"
                        size={33}
                        color="#afaaaa"
                      />
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          )}
        />

        {/* Modal Dialog */}

        <Modal visible={false} transparent animationType="slide">
          {/* {children} */}
        </Modal>
      </View>
    </>
  );
};

export default ScreeningList;

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
