import MRStudentItem from "@/components/list-items/MRStudentItem";
import StudentItem from "@/components/list-items/StudentItem";
import ReadStudent from "@/components/qr/ReadStudent";
import InputBox from "@/components/ui/InputBox";
import CustomInput from "@/components/utils/CustomInput";
import { getMRTagStudentsBySchoolId } from "@/database/database";
import { StudentModel } from "@/models/school/StudentModel";
import { RootState } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, Modal } from "react-native";
import { useSelector } from "react-redux";

const MRTagList = () => {
  const router = useRouter();
  const db = useSQLiteContext();
  const navigation = useNavigation();
  const appliedFilters = useSelector(
    (state: RootState) => state.studentSlice.appliedFilters
  );

  const { schoolId } = useLocalSearchParams();
  const [studentList, setStudentList] = useState<any[]>([]);
  const [filteredList, setFilteredList] = useState<any[]>([]);
  const [doneCount, setDoneCount] = useState(0);
  const [notDoneCount, setNotDoneCount] = useState(0);
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

  const navigationHandler = (item: any) => {
    setSearchTerm("");
    router.push({
      pathname: "/mr-tag-detail",
      params: {
        studentId: item.id,
        // tempId: item.tempId,
        // studentName: `${item.firstName}  ${
        //   item.middleName ? item.middleName : ""
        // }  ${item.lastName ? item.lastName : ""}`,
        // classTitle: item.title,
        // section: item.section,
        // gender: item.gender,
        // age: item.age,
        // schoolId: schoolId,
      },
    });
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

  const getCountsHandler = async () => {
    const response: any = await db.getFirstAsync(
      `SELECT COUNT(*) as count FROM students JOIN mrTags ON students.id = mrTags.studentId WHERE students.schoolId="${schoolId}"`
    );
    console.log("Count", response);
    if (response) {
      setDoneCount(response.count);
    }
  };

  useEffect(() => {
    setNotDoneCount(studentList.length - doneCount);
  }, [studentList, doneCount]);

  useFocusEffect(
    useCallback(() => {
      getStudents();
      getCountsHandler();
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
          <Text>Done: {doneCount}</Text>
          <Text>Not Done : {notDoneCount}</Text>
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
            <MRStudentItem
              item={item}
              onPress={navigationHandler.bind(this, item)}
            />
          )}
        />
      </View>
    </View>
  );
};

export default MRTagList;
