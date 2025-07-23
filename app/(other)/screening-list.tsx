import PSStudentItem from "@/components/list-items/PSStudentItem";
import CustomInput from "@/components/utils/CustomInput";
import CustomInput1 from "@/components/utils/CustomInput1";
import { Colors } from "@/constants/Colors";
import { getPSStudentsBySchoolId } from "@/database/primary-screening-db";
import { RootState } from "@/store/store";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const ScreeningList = () => {
  const db = useSQLiteContext();
  const [doneCount, setDoneCount] = useState(0);
  const [notDoneCount, setNotDoneCount] = useState(0);
  const appliedFilters = useSelector(
    (state: RootState) => state.studentSlice.appliedFilters
  );
  const { schoolId } = useLocalSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [studentList, setStudentList] = useState<any[]>([]);
  const [filteredList, setFilteredList] = useState<any[]>([]);

  const searchTermChangeHandler = (val: string) => {
    setSearchTerm(val);
    console.log(val);

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
    router.replace({
      pathname: "/screening-detail",
      params: {
        studentId: item.id,
        schoolId: schoolId,
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
        setFilteredList(response);
      }
    }
  };

  const getCountsHandler = async () => {
    const response: any = await db.getFirstAsync(
      `SELECT COUNT(*) as count FROM students JOIN screenings ON students.id = screenings.studentId WHERE students.schoolId="${schoolId}"`
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
    <View style={{flex: 1}}>
      <View
        style={{
          padding: 10,
          position: "absolute",
          zIndex: 1,
          backgroundColor: "#fff",
          width: "100%",
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.header}>Total Student: {studentList.length}</Text>
          <Text style={styles.header}>Done: {doneCount}</Text>
          <Text style={styles.header}>Not Done : {notDoneCount}</Text>
        </View>
        <View style={{ marginTop: 20,  }}>
          <CustomInput1
            id="search"
            label=""
            value={searchTerm}
            placeholder="Search Student"
            onChangeText={searchTermChangeHandler}
          />
        </View>
      </View>

      <View
        style={{ paddingHorizontal: 10, marginTop: 120,paddingTop: 10, paddingBottom: 10, backgroundColor: Colors.light.background }}
      >
        <FlatList
          data={filteredList}
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

const styles = StyleSheet.create({
  header: {
    fontWeight: "800",
  },
});
