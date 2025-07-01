import MRStudentItem from "@/components/list-items/MRStudentItem";
import StudentItem from "@/components/list-items/StudentItem";
import InputBox from "@/components/ui/InputBox";
import CustomInput from "@/components/utils/CustomInput";
import { getMRTagStudentsBySchoolId } from "@/database/database";
import { StudentModel } from "@/models/school/StudentModel";
import { RootState } from "@/store/store";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";

const MRTagList = () => {
  const router = useRouter();
  const db = useSQLiteContext();
  const appliedFilters = useSelector(
    (state: RootState) => state.studentSlice.appliedFilters
  );
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

  const navigationHandler = (item: StudentModel) => {
    router.push({
      pathname: "/mr-tag-detail",
      params: {
        studentId: item.id,
        studentName: item.firstName,
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
          <Text>Done:</Text>
          <Text>Not Done :</Text>
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
          data={studentList}
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
