import StyledDropdown from "@/components/new_UI/StyledDropdown";
import CustomButton from "@/components/utils/CustomButton";
import {
  BLANK_DROPDOWN_MODEL,
  BLANK_FILTER_MODEL,
} from "@/constants/BlankModels";
import {
  findAllClassesDropdowns,
  findUniqueClasses,
  findUniqueSections,
} from "@/database/database";
import { getMRTagStudentsBySchoolId } from "@/database/mr-tag-db";
import { getSchoolByActivityType } from "@/database/school-student-db";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { FilterModel } from "@/models/ui/FilterModel";
import { setFilter, setStudents } from "@/store/slices/student-slice";
import { useFocusEffect, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useDispatch } from "react-redux";

const SpectacleBooking = () => {
  const db = useSQLiteContext();
  const dispatch = useDispatch();
  const router = useRouter();
  const [schoolItems, setSchoolItems] = useState<DropdownModel[]>([]);
  const [classItems, setClassItems] = useState<DropdownModel[]>([]);
  const [selectedSchool, setSelectedSchool] = useState(BLANK_DROPDOWN_MODEL);
  const [sectionItems, setSectionItems] = useState<DropdownModel[]>([]);

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

  const [selectedSection, setSelectedSection] = useState(BLANK_DROPDOWN_MODEL);

  const selectSectionHandler = (val?: string) => {
    if (val == "SELECT") {
      setSelectedSection(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = sectionItems.find((item) => item.value == val);
      if (foundItem) {
        setSelectedSection(foundItem);
      }
    }
  };

  const getStudentsHandler = async () => {
    if (selectedSchool.id == "0") {
      return;
    }
    const response = await getMRTagStudentsBySchoolId(
      db,
      selectedSchool.id,
      BLANK_FILTER_MODEL
    );
    setFilterHandler();
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

  const getClassesHandler = async () => {
    const response = await findAllClassesDropdowns(db);
    if (response) {
      setClassItems(response);
    }
  };

  const getUniqueSectionsHandler = async () => {
    const response = await findUniqueSections(
      db,
      selectedSchool.id?.toString(),
      selectedClass.id
    );
    if (response) {
      console.log("SECTIONS", response);
      setSectionItems(response);
    }
  };

  const getUniqueClassesHandler = async () => {
    const response = await findUniqueClasses(db, selectedSchool.id);
    if (response) {
      console.log("Clases", response);
      setClassItems(response);
    }
  };

  useEffect(() => {
    if (selectedClass.id != "0") {
      getUniqueSectionsHandler();
    }
  }, [selectedClass]);

  useEffect(() => {
    if (selectedSchool.id != "0") {
      getUniqueClassesHandler();
    }
  }, [selectedSchool]);

  const setFilterHandler = () => {
    dispatch(
      setFilter(
        new FilterModel({
          classId: selectedClass.id != "0" ? selectedClass.id : "",
          section: selectedSection.id != "0" ? selectedSection.value : "",
          gender: "",
          status: "",
          result: "",
          targetGroup: "",
        })
      )
    );
  };

  useFocusEffect(
    useCallback(() => {
      getSchoolsHandler();
      return () => {
        console.log("Screen unfocused");
      };
    }, [])
  );

  return (
    <View style={{ padding: 20 }}>
      <View style={{ padding: 5 }}>
        <StyledDropdown
          label="School"
          items={[BLANK_DROPDOWN_MODEL, ...schoolItems]}
          selectedItem={selectedSchool}
          onChange={selectSchoolHandler}
          required={true}
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flexGrow: 1, flexBasis: 1, padding: 5 }}>
          <StyledDropdown
            label="Class"
            items={[BLANK_DROPDOWN_MODEL, ...classItems]}
            selectedItem={selectedClass}
            onChange={selectClassHandler}
          />
        </View>
        <View style={{ flexGrow: 1, flexBasis: 1, padding: 5 }}>
          <StyledDropdown
            label="Section"
            items={[BLANK_DROPDOWN_MODEL, ...sectionItems]}
            selectedItem={selectedSection}
            onChange={selectSectionHandler}
          />
        </View>
      </View>
      <View style={{ padding: 5 }}>
        <CustomButton title="Search" onPress={getStudentsHandler} />
      </View>
    </View>
  );
};

export default SpectacleBooking;
