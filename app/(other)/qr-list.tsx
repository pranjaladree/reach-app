import QRItem from "@/components/list-items/QRItem";
import ViewQR from "@/components/qr/ViewQR";
import CustomInput from "@/components/utils/CustomInput";
import { getMRTagStudentsBySchoolId } from "@/database/mr-tag-db";
import { RootState } from "@/store/store";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Modal } from "react-native-paper";
import { useSelector } from "react-redux";

const QRList = () => {
  const router = useRouter();
  const db = useSQLiteContext();
  const appliedFilters = useSelector(
    (state: RootState) => state.studentSlice.appliedFilters
  );
  const { schoolId } = useLocalSearchParams();
  const [studentList, setStudentList] = useState<any[]>([]);
  const [filteredList, setFilteredList] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filteredStudents = useSelector(
    (state: RootState) => state.studentSlice.filteredStudents
  );
  console.log("Filter Students", filteredStudents.length);
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

  const [selectedItem, setSelectedItem] = useState<any>();

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
      const response: any = await getMRTagStudentsBySchoolId(
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

  const openQRHandler = (studentId: string) => {
    console.log("SQ", studentId);
    console.log(studentId);
    router.push({
      pathname: "/view-qr",
      params: {
        studentId: studentId,
      },
    });
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
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
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
              <QRItem
                item={item}
                onPress={openQRHandler.bind(this, item?.studentId)}
              />
            )}
          />
        </View>
      </View>
      <Modal
        visible={isModalOpen}
        onDismiss={closeModalHandler}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          zIndex: 500,
        }}
      >
        <ViewQR
          studentId={selectedItem?.studentId}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </>
  );
};

export default QRList;
