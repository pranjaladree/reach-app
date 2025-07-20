import StyledDropdown from "@/components/new_UI/StyledDropdown";
import ReadStudent from "@/components/qr/ReadStudent";
import CustomButton from "@/components/utils/CustomButton";
import CustomDropdown from "@/components/utils/CustomDropdown";
import CustomInput from "@/components/utils/CustomInput";
import CustomRadioGroup from "@/components/utils/CustomRadioGroup";
import {
  BLANK_DROPDOWN_MODEL,
  BLANK_FILTER_MODEL,
} from "@/constants/BlankModels";
import {
  GENDER_RADIO_ITEMS,
  RESULT_RADIO_ITEMS,
  STATUS_RADIO_ITEMS,
} from "@/constants/Data";
import { findUniqueClasses, findUniqueSections } from "@/database/database";
import { getMRTagStudentsBySchoolId } from "@/database/mr-tag-db";
import { getSchoolByActivityType } from "@/database/school-student-db";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { FilterModel } from "@/models/ui/FilterModel";
import { RadioItemModel } from "@/models/ui/RadioItemModel";
import { setFilter, setStudents } from "@/store/slices/student-slice";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const MRTag = () => {
  const db = useSQLiteContext();
  const dispatch = useDispatch();
  const [isScanQR, setIsScanQR] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();
  const [schoolItems, setSchoolItems] = useState<DropdownModel[]>([]);
  const [sectionItems, setSectionItems] = useState<DropdownModel[]>([]);
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

  // const [section, setSection] = useState("");

  // const sectionChangeHandler = (val: string) => {
  //   setSection(val);
  // };

  const [gender, setGender] = useState("ALL");

  const genderChangeHandler = (val: string) => {
    setGender(val);
  };

  const [status, setStatus] = useState("ALL");

  const statusChangeHandler = (val: string) => {
    setStatus(val);
  };

  const [result, setResult] = useState("ALL");

  const resultChangeHandler = (val: string) => {
    setResult(val);
  };

  const getStudentsHandler = async () => {
    if (selectedSchool.id == "0") {
      return;
    }
    applyFilterHandler();
    const response = await getMRTagStudentsBySchoolId(
      db,
      selectedSchool.id,
      BLANK_FILTER_MODEL
    );
    console.log("Students", response?.length);
    dispatch(setStudents(response));
    router.push({
      pathname: "/mr-tag-list",
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
    if (selectedSchool.id != "0") {
      getUniqueClassesHandler();
    }
  }, [selectedSchool]);

  useEffect(() => {
    if (selectedClass.id != "0") {
      getUniqueSectionsHandler();
    }
  }, [selectedClass]);

  // const getClassesHandler = async () => {
  //   const response = await findAllClassesDropdowns(db);
  //   if (response) {
  //     setClassItems(response);
  //   }
  // };

  const applyFilterHandler = () => {
    dispatch(
      setFilter(
        new FilterModel({
          classId: selectedClass.id != "0" ? selectedClass.id : "",
          section: selectedSection.id != "0" ? selectedSection.value : "",
          gender: gender == "ALL" ? "" : gender,
          status: status == "ALL" ? "" : status,
          result: result == "ALL" ? "" : result,
          targetGroup: "",
        })
      )
    );
  };

  useEffect(() => {
    getSchoolsHandler();
    // getClassesHandler();
  }, []);

  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <View style={{ padding: 10, marginRight: 10 }}>
          <Pressable
            onPress={() => {
              setIsScanQR(true);
            }}
          >
            <Ionicons name="qr-code-outline" size={25} />
          </Pressable>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={{ padding: 20 }}>
      <View>
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
          {/* <CustomInput
            id="section"
            label="Section"
            value={section}
            onChangeText={sectionChangeHandler}
          /> */}
        </View>
      </View>
      <View>
        <CustomRadioGroup
          label="Gender"
          items={[
            new RadioItemModel({ id: 0, value: "ALL", label: "ALL" }),
            ...GENDER_RADIO_ITEMS,
          ]}
          selectedOption={gender}
          onChange={genderChangeHandler}
        />
      </View>
      <View>
        <CustomRadioGroup
          label="Status"
          items={STATUS_RADIO_ITEMS}
          selectedOption={status}
          onChange={statusChangeHandler}
        />
      </View>
      {/* <View>
        <CustomRadioGroup
          label="Result"
          items={RESULT_RADIO_ITEMS}
          selectedOption={result}
          onChange={resultChangeHandler}
        />
      </View> */}
      <View style={{ padding: 10 }}>
        <CustomButton title="Search" onPress={getStudentsHandler} />
      </View>
      {/* <Button onPress={getStudentsHandler} mode="contained">
        Search
      </Button> */}

      <Modal visible={isScanQR}>
        <ReadStudent
          onClose={() => {
            setIsScanQR(false);
          }}
        />
      </Modal>
    </View>
  );
};

export default MRTag;
