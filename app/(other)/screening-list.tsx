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
  const appliedFilters = useSelector(
    (state: RootState) => state.studentSlice.appliedFilters
  );
  const { schoolId } = useLocalSearchParams();
  console.log("SCHOOL ID", schoolId);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [studentList, setStudentList] = useState<any[]>([]);

  const searchTermChangeHandler = (val: string) => {
    setSearchTerm(val);

    //Search in Each Key Stroke

    const filterArr: any = studentList.filter((item) => {
      console.log("&&&&&&&&&&&&&&&&&", item);
      if (item.firstName.includes(val)) {
        return true;
      } else {
        return false;
      }
    });
    setSearchTerm(filterArr);
  };

  const navigationHandler = (item: any) => {
    console.log("NAVIGA", item);
    router.replace({
      pathname: "/screening-detail",
      params: {
        studentId: item.id,
        tempId: item.tempId,
        studentName: `${item.firstName}  ${
          item.middleName ? item.middleName : ""
        }  ${item.lastName ? item.lastName : ""}`,
        classTitle: item.classId,
        section: item.section,
        gender: item.gender,
        age: item.age,
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
        schoolId?.toString(),
        appliedFilters
      );
      console.log("STUDENT INFO ************", response);
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
