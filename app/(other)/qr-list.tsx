import MRStudentItem from "@/components/list-items/MRStudentItem";
import QRItem from "@/components/list-items/QRItem";
import StudentItem from "@/components/list-items/StudentItem";
import ViewQR from "@/components/qr/ViewQR";
import InputBox from "@/components/ui/InputBox";
import { getMRTagStudentsOneBySchoolId } from "@/database/database";
import { StudentModel } from "@/models/school/StudentModel";
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
      <View>
        <View>
          <View>
            <Text>Total Student:</Text>
          </View>
          <View>
            <InputBox
              value={searchTerm}
              placeholder="Search Student"
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
        <ViewQR item={selectedItem} />
      </Modal>
    </>
  );
};

export default QRList;
