import CustomDropdown from "@/components/utils/CustomDropdown";
import { BLANK_DROPDOWN_MODEL } from "@/constants/BlankModels";
import {
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

const SpectacleBooking = () => {
  const db = useSQLiteContext();
  const dispatch = useDispatch();
  const router = useRouter();
  const [schoolItems, setSchoolItems] = useState<DropdownModel[]>([]);
  const [selectedSchool, setSelectedSchool] = useState(BLANK_DROPDOWN_MODEL);

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

  const getStudentsHandler = async () => {
    if (selectedSchool.id == "0") {
      return;
    }
    const response = await getMRTagStudentsOneBySchoolId(db, selectedSchool.id);
    console.log("Students", response?.length);
    dispatch(setStudents(response));
    router.push({
      pathname: "/spectacle-list",
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

  useEffect(() => {
    getSchoolsHandler();
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
      <View>
        <View>
          <CustomDropdown
            label="Class"
            items={[BLANK_DROPDOWN_MODEL, ...schoolItems]}
            selectedItem={selectedSchool}
            onChange={selectSchoolHandler}
          />
        </View>
        <View>
          <CustomDropdown
            label="Section"
            items={[BLANK_DROPDOWN_MODEL, ...schoolItems]}
            selectedItem={selectedSchool}
            onChange={selectSchoolHandler}
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

export default SpectacleBooking;
