import PSStudentItem from "@/components/list-items/PSStudentItem";
import StudentItem from "@/components/list-items/StudentItem";
import InputBox from "@/components/ui/InputBox";
import CustomInput from "@/components/utils/CustomInput";
import { getPSStudentsBySchoolId } from "@/database/database";
import { StudentModel } from "@/models/school/StudentModel";
import { RootState } from "@/store/store";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
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
    router.replace({
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
      <View style={{ padding: 10 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>Total Student: {studentList.length}</Text>
          <Text>Done:</Text>
          <Text>Not Done :</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <CustomInput
            id="search"
            label="Search Student"
            value={searchTerm}
            onChangeText={searchTermChangeHandler}
          />
        </View>
      </View>
      <View style={{ paddingHorizontal: 10, paddingBottom: 200 }}>
        <FlatList
          data={studentList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PSStudentItem
              item={item}
              onPress={navigationHandler.bind(this, item)}
            />
          )}
        />
      </View>
    </View>
  );
};

export default ScreeningList;
