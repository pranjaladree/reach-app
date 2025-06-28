import CustomDropdown from "@/components/utils/CustomDropdown";
import CustomInput from "@/components/utils/CustomInput";
import { BLANK_DROPDOWN_MODEL } from "@/constants/BlankModels";
import {
  findAllClassesDropdowns,
  getMRTagStudentsOneBySchoolId,
  getSchoolByActivityType,
} from "@/database/database";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { setSchools } from "@/store/slices/school-slice";
import { setStudents } from "@/store/slices/student-slice";
import { RootState } from "@/store/store";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

const QRCode = () => {
  const db = useSQLiteContext();
  const dispatch = useDispatch();
  const router = useRouter();
  const [schoolItems, setSchoolItems] = useState<DropdownModel[]>([]);
  const [selectedSchool, setSelectedSchool] = useState(BLANK_DROPDOWN_MODEL);
  const [classItems, setClassItems] = useState<DropdownModel[]>([]);

  const selectSchoolHandler = (val?: string) => {
    if (val == "") {
      setSelectedSchool(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = schoolItems.find((item) => item.value == val);
      if (foundItem) {
        setSelectedSchool(foundItem);
      }
    }
  };

  const [selectedClass, setSelectedClass] = useState(BLANK_DROPDOWN_MODEL);

  const selectClassHandler = (val?: string) => {
    if (val == "SELECT") {
      setSelectedClass(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = classItems.find((item) => item.value == val);
      if (foundItem) {
        setSelectedClass(foundItem);
      }
    }
  };

  const [section, setSection] = useState("");

  const sectionChangeHandler = (val: string) => {
    setSection(val);
  };

  const getStudentsHandler = async () => {
    if (selectedSchool.id == "0") {
      return;
    }
    const response = await getMRTagStudentsOneBySchoolId(db, selectedSchool.id);
    console.log("Students", response?.length);
    dispatch(setStudents(response));
    router.push({
      pathname: "/qr-list",
      params: {
        schoolId: selectedSchool.id,
      },
    });
  };

  const getSchoolsHandler = async () => {
    const response = await getSchoolByActivityType(
      db,
      "COMPREHENSIVE_SCREENING"
    );
    if (response) {
      setSchoolItems(response);
    }
  };

  const getClassesHandler = async () => {
    const response = await findAllClassesDropdowns(db);
    if (response) {
      setClassItems(response);
    }
  };

  useEffect(() => {
    getSchoolsHandler();
    getClassesHandler();
  }, []);

  return (
    <View>
      <View>
        <CustomDropdown
          label="School"
          items={[BLANK_DROPDOWN_MODEL, ...schoolItems]}
          selectedItem={selectedSchool}
          onChange={selectSchoolHandler}
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flexGrow: 1 }}>
          <CustomDropdown
            label="Class"
            items={[BLANK_DROPDOWN_MODEL, ...classItems]}
            selectedItem={selectedClass}
            onChange={selectClassHandler}
          />
        </View>
        <View style={{ flexGrow: 1 }}>
          <CustomInput
            id="section"
            label="Section"
            value={section}
            onChangeText={sectionChangeHandler}
          />
        </View>
      </View>
      <View>
        <Text>Gender</Text>
      </View>
      <View>
        <Text>Status</Text>
      </View>
      <View>
        <Text>Result</Text>
      </View>
      <Button onPress={getStudentsHandler} mode="contained">
        Search
      </Button>
    </View>
  );
};

export default QRCode;
