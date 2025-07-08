import SpecStudentItem from "@/components/list-items/SpecStudentItem";
import InputBox from "@/components/ui/InputBox";
import CustomInput from "@/components/utils/CustomInput";
import {
  getSpecStudentsBySchoolId,
  saveSpecBooking,
} from "@/database/database";
import { StudentModel } from "@/models/school/StudentModel";
import { RootState } from "@/store/store";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

const SpectacleList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const appliedFilters = useSelector(
    (state: RootState) => state.studentSlice.appliedFilters
  );
  const db = useSQLiteContext();
  const { schoolId } = useLocalSearchParams();
  const [studentList, setStudentList] = useState<any[]>([]);
  const [filteredList, setFilteredList] = useState<any[]>([]);
  console.log("Student Lis", studentList);
  // const filteredStudents = useSelector(
  //   (state: RootState) => state.studentSlice.filteredStudents
  // );
  // console.log("Filter Students", filteredStudents.length);
  const [searchTerm, setSearchTerm] = useState("");

  const searchTermChangeHandler = (val: string) => {
    setSearchTerm(val);

    //Search in Each Key Stroke
    const filterArr: any = studentList.filter((item) => {
      if (
        item.firstName?.toUpperCase().includes(val?.toUpperCase()) ||
        item.middleName?.toUpperCase().includes(val?.toUpperCase()) ||
        item.lastName?.toUpperCase().includes(val?.toUpperCase())
      ) {
        return true;
      } else {
        return false;
      }
    });
    setFilteredList(filterArr);
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
        schoolId?.toString(),
        appliedFilters
      );
      console.log("RESPONS", response);
      if (response) {
        setStudentList(response);
        setFilteredList(response);
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
      <View
        style={{
          padding: 10,
          position: "absolute",
          zIndex: 100,
          backgroundColor: "white",
          width: "100%",
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>Total Student: {studentList.length}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <CustomInput
            id="search"
            label="Seach Student"
            value={searchTerm}
            onChangeText={searchTermChangeHandler}
          />
        </View>
      </View>
      <View
        style={{ paddingHorizontal: 10, paddingTop: 150, paddingBottom: 100 }}
      >
        <FlatList
          data={filteredList}
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
