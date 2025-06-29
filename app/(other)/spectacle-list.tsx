import SpecStudentItem from "@/components/list-items/SpecStudentItem";
import CustomInput from "@/components/utils/CustomInput";
import {
  getSpecStudentsBySchoolId,
  saveSpecBooking,
} from "@/database/database";
import { RootState } from "@/store/store";
import { EvilIcons } from "@expo/vector-icons";
import {
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import { useSelector } from "react-redux";

const SpectacleList = () => {
  const router = useRouter();
  const db = useSQLiteContext();
  const { schoolId } = useLocalSearchParams();
  const [studentList, setStudentList] = useState<any[]>([]);
  const filteredStudents = useSelector(
    (state: RootState) => state.studentSlice.filteredStudents
  );
  console.log("Filter Students", filteredStudents.length);
  const [searchTerm, setSearchTerm] = useState("");

  const searchTermChangeHandler = (val: string) => {
    setSearchTerm(val);
  };

  const [diaglogMessage, setDialogMessage] = useState("");

  const [selectedStudent, setSelectedStudent] = useState<any>();

  const [visible, setVisible] = useState(false);

  const [frameName, setFramename] = useState("");

  const frameNameChangeHandler = (val: string) => {
    setFramename(val);
  };

  const showDialog = (item: any) => {
    setSelectedStudent(item);
    console.log("ITEM", item);
    setVisible(true);
  };

  const [isLoading, setIsLoading] = useState(false);

  const saveBookingHandler = async () => {
    setIsLoading(true);
    const response = await saveSpecBooking(db, selectedStudent.id, frameName);
    console.log(response);
    if (response) {
      setVisible(false);
    }
    setIsLoading(false);
    getStudents();
  };

  const getStudents = async () => {
    console.log("GETTING Students....");
    if (schoolId) {
      const response: any = await getSpecStudentsBySchoolId(
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
    <View>
      <View style={{ padding: 16 }}>
        <Stack.Screen
          options={{
            title: "Spectacles Booking",
            headerShown: true,
          }}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.count}>Total Count : {studentList.length}</Text>
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
        {/* <View>
          <InputBox
            value={searchTerm}
            placeholder="Search Student"
            onChangeText={searchTermChangeHandler}
          />
        </View> */}
      </View>
      <View style={{ padding: 10 }}>
        <FlatList
          data={studentList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <SpecStudentItem
              item={item}
              onPress={showDialog.bind(this, item)}
            />
          )}
        />
      </View>

      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => {
            setVisible(false);
          }}
        >
          <Dialog.Title>{selectedStudent?.firstName}</Dialog.Title>
          <Dialog.Content>
            <Text>Book Spectacle</Text>
            <View>
              <CustomInput
                id="frame"
                label="Frame Model"
                value={frameName}
                onChangeText={frameNameChangeHandler}
              />
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={saveBookingHandler}
              loading={isLoading}
              mode="contained"
            >
              Book Now
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default SpectacleList;
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
