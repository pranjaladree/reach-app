import HeaderTitle from "@/components/new_UI/header-title";
import CustomDropdown from "@/components/utils/CustomDropdown";
import CustomInput from "@/components/utils/CustomInput";
import CustomRadioGroup from "@/components/utils/CustomRadioGroup";
import { BLANK_DROPDOWN_MODEL } from "@/constants/BlankModels";
import {
  GENDER_RADIO_ITEMS,
  RESULT_RADIO_ITEMS,
  STATUS_RADIO_ITEMS,
} from "@/constants/Data";
import {
  findAllClasses,
  findAllClassesDropdowns,
  getSchoolsDropdownFromDB,
} from "@/database/database";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { RadioItemModel } from "@/models/ui/RadioItemModel";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Menu } from "react-native-paper";
import { useDispatch } from "react-redux";

const PrimaryScreening = () => {
  const [schoolItems, setSchoolItems] = useState<DropdownModel[]>([]);
  const [classItems, setClassItems] = useState<DropdownModel[]>([]);
  const db = useSQLiteContext();
  const router = useRouter();
  const [selectedSchool, setSelectedSchool] = useState(BLANK_DROPDOWN_MODEL);

  const selectSchoolHandler = (val?: string) => {
    if (val == "SELECT") {
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

  const [gender, setGender] = useState("All");

  const genderChangeHandler = (val: string) => {
    setGender(val);
  };

  const [status, setStatus] = useState("All");

  const statusChangeHandler = (val: string) => {
    setStatus(val);
  };

  const [result, setResult] = useState("All");

  const resultChangeHandler = (val: string) => {
    setResult(val);
  };

  const getStudentsHandler = async () => {
    if (selectedSchool.id == "0") {
      return;
    }
    router.push({
      pathname: "/screening-list",
      params: {
        schoolId: selectedSchool.id,
      },
    });
  };

  const getSchoolsHandler = async () => {
    const response = await getSchoolsDropdownFromDB(db);
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

  useFocusEffect(
    useCallback(() => {
      getSchoolsHandler();
      getClassesHandler();
      return () => {
        console.log("Screen unfocused");
      };
    }, [])
  );

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const navigation = useNavigation();
  const [count, setCount] = useState(0);

  const [isAutorefModal, setIsAutoRefModal] = useState(false);

  const openAutorefModalHandler = () => {
    setIsAutoRefModal(true);
  };

  const closeAutorefModalHandler = () => {
    setIsAutoRefModal(false);
  };

  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <View style={{ padding: 10 }}>
              <Ionicons name="settings" size={24} onPress={openMenu} />
            </View>
          }
        >
          <Menu.Item
            onPress={() => {
              closeMenu();
              router.push("/autoref-configuration");
            }}
            title="Autoref Configuration"
          />
          <Menu.Item
            onPress={() => {
              closeMenu();
              router.push("/add-student");
            }}
            title="Add Student"
          />
        </Menu>
      ),
    });
  }, [navigation, visible]);

  return (
    <View style={{ paddingHorizontal: 5, paddingVertical: 10, paddingTop: 20 }}>
      <HeaderTitle title="Primary Screening" />

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
      <View style={{ paddingHorizontal: 15 }}>
        <View style={styles.card}>
          <View>
            <CustomRadioGroup
              label="Gender"
              items={[
                new RadioItemModel({ id: 0, value: "All", label: "All" }),
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
          <View>
            <CustomRadioGroup
              label="Result"
              items={RESULT_RADIO_ITEMS}
              selectedOption={result}
              onChange={resultChangeHandler}
            />
          </View>
        </View>
        <Button
          onPress={getStudentsHandler}
          mode="contained"
          style={{
            paddingVertical: 5,
            borderRadius: 30,
            marginTop: 20,
            width: "100%",
          }}
        >
          Search
        </Button>
      </View>
    </View>
  );
};

export default PrimaryScreening;

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 18,
    padding: 5,
    paddingHorizontal: 12,
    fontWeight: "bold",
  },
  screen: {
    padding: 5,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  rowItem: {
    flexBasis: 1,
    flexGrow: 1,
    margin: 5,
    paddingLeft: 10,
  },
  box: {
    marginTop: 10,
  },
  date: {
    borderWidth: 0.2,
    padding: 10,
  },
  summary: {
    borderWidth: 0.2,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  count: {
    fontSize: 30,
    fontWeight: "bold",
  },
  card: {
    gap: 10,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: "100%",
  },
});
