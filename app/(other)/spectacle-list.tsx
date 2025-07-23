import SpecStudentItem from "@/components/list-items/SpecStudentItem";
import BookSpectacle from "@/components/spectacle/BookSpectacle";
import InputBox from "@/components/ui/InputBox";
import CustomButton from "@/components/utils/CustomButton";
import CustomInput from "@/components/utils/CustomInput";
import CustomNotification from "@/components/utils/CustomNotification";
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
import { Button, Dialog, Modal, Portal } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

const SpectacleList = () => {
  const appliedFilters = useSelector(
    (state: RootState) => state.studentSlice.appliedFilters
  );
  const db = useSQLiteContext();
  const { schoolId } = useLocalSearchParams();
  const [studentList, setStudentList] = useState<any[]>([]);
  const [filteredList, setFilteredList] = useState<any[]>([]);
  const [isNotification, setIsNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const openNotificationHandler = () => {
    setIsNotification(true);
  };

  const closeNotificationHandler = () => {
    setIsNotification(false);
  };
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

  const [selectedStudent, setSelectedStudent] = useState<any>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [frameName, setFramename] = useState("");

  const openModalHandler = (item: any) => {
    setSelectedStudent(item);
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  const frameNameChangeHandler = (val: string) => {
    setFramename(val);
  };

  const [isLoading, setIsLoading] = useState(false);

  const saveBookingHandler = async () => {
    setIsLoading(true);
    const response = await saveSpecBooking(db, selectedStudent.id, frameName);
    console.log(response);
    if (response) {
      setIsModalOpen(false);
      openNotificationHandler();
      setNotificationMessage("Spectacle Booked !");
    }
    setIsLoading(false);
    getStudents();
  };

  const getStudents = async () => {
    if (schoolId) {
      const response: any = await getSpecStudentsBySchoolId(
        db,
        schoolId?.toString(),
        appliedFilters
      );
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
          <Text>Total Count: {studentList.length}</Text>
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
              onPress={openModalHandler.bind(this, item)}
            />
          )}
        />
      </View>

      <Portal>
        <Modal visible={isModalOpen} onDismiss={closeModalHandler}>
          <BookSpectacle
            frameModel={frameName}
            onChangeText={frameNameChangeHandler}
            isLoading={isLoading}
            onBook={saveBookingHandler}
          />
        </Modal>
      </Portal>

      <CustomNotification
        visible={isNotification}
        onClose={closeNotificationHandler}
        message={notificationMessage}
        variant="success"
      />
    </View>
  );
};

export default SpectacleList;
