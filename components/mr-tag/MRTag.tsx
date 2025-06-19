import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import CustomDatePicker from "../ui/CustomDatePicker";
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";
import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import CustomDropdown from "../utils/CustomDropdown";
import { BLANK_DROPDOWN_MODEL } from "@/constants/BlankModels";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { FACILITY_TYPES_ITEMS } from "@/constants/Data";
import {
  getMasterDropdownFromDB,
  saveMRTag,
  TABLES,
} from "@/database/database";
import { useSQLiteContext } from "expo-sqlite";
import { MRTagModel } from "@/models/patient-at-fixed-facilty/MRTagModel";
import { useFocusEffect } from "expo-router";

interface Props {
  item: MRTagModel;
  studentId: string;
}

const MRTagItem = ({ item, studentId }: Props) => {
  console.log("Item", item);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const defaultStyles = useDefaultStyles();
  const db = useSQLiteContext();
  const [mrNo, setMrNo] = useState("");
  const [hospitalItems, setHospitalItems] = useState<DropdownModel[]>([]);
  console.log("Hospital Items", hospitalItems);
  const [visionCenterItems, setVisionCenterItems] = useState<DropdownModel[]>(
    []
  );
  const [otherFacilityItems, setOtherFacilityItems] = useState<DropdownModel[]>(
    []
  );
  const [selected, setSelected] = useState<DateType>();
  const [facilityItems, setFacilityItems] = useState<DropdownModel[]>([]);
  const [facilityLabel, setFacilityLabel] = useState("");
  const [facilityType, setSelectedFaciliType] = useState(BLANK_DROPDOWN_MODEL);
  const [facilityName, setFacilityName] = useState(BLANK_DROPDOWN_MODEL);

  const mrNoChangeHandler = (val: string) => {
    setMrNo(val);
  };

  const selectActivityTypeHandler = (val?: string) => {
    console.log("Val", val);
    if (val == "") {
      setSelectedFaciliType(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = FACILITY_TYPES_ITEMS.find((item) => item.value == val);
      if (foundItem) {
        setSelectedFaciliType(foundItem);
      }
    }
  };

  const selectFacilityNameHandler = (val?: string) => {
    console.log("Val", val);
    if (val == "") {
      setFacilityName(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = facilityItems.find((item) => item.value == val);
      if (foundItem) {
        setFacilityName(foundItem);
      }
    }
  };

  const selectDateHandler = ({ date }: any) => {
    setSelected(date);
    setIsModalOpen(false);
  };

  const addMRTagHandler = async () => {
    const response = await saveMRTag(
      db,
      new MRTagModel({
        id: studentId,
        mrNo: mrNo,
        visitDate: dayjs(selected).format("YYYY-MM-DD"),
        facilityType: facilityType.value,
        facilityId: facilityName.id,
        studentId: studentId,
      })
    );
  };

  useEffect(() => {
    if (facilityType.value?.toUpperCase() == "VISION CENTER") {
      setFacilityItems(visionCenterItems);
      setFacilityLabel("Vision Center");
    }
    if (facilityType.value?.toUpperCase() == "HOSPITAL") {
      setFacilityItems(hospitalItems);
      setFacilityLabel("Hospital");
    }
    if (facilityType.value?.toUpperCase() == "OTHER FACILITY") {
      setFacilityItems(otherFacilityItems);
      setFacilityLabel("Other Facility");
    }
  }, [facilityType]);

  const getFacilityHandler = async () => {
    const hospitalResponse = await getMasterDropdownFromDB(
      db,
      TABLES.HOSPITAL_TABLE
    );
    if (hospitalResponse) {
      setHospitalItems(hospitalResponse);
    }

    const visionCenterResponse = await getMasterDropdownFromDB(
      db,
      TABLES.VISION_CENTER_TABLE
    );
    if (visionCenterResponse) {
      setVisionCenterItems(visionCenterResponse);
    }

    const otherFacilityResponse = await getMasterDropdownFromDB(
      db,
      TABLES.OTHER_FACILITY_TABLLE
    );
    if (otherFacilityResponse) {
      setOtherFacilityItems(otherFacilityResponse);
    }
  };

  const setExistingData = () => {
    if (item.id != "0") {
      setMrNo(item.mrNo);
      setSelected(item.visitDate);
    }

    const foundFacilityType = FACILITY_TYPES_ITEMS.find(
      (item2) => item2.value == item.facilityType
    );
    if (foundFacilityType) {
      setSelectedFaciliType(foundFacilityType);
    }
  };

  useEffect(() => {
    if (item.id != "0") {
      console.log("Runnning...");
      const foundFacilityName = facilityItems.find(
        (item2) => item2.id == item.facilityId
      );
      if (foundFacilityName) {
        setFacilityName(foundFacilityName);
      }
    }
  }, [facilityItems]);

  useFocusEffect(
    useCallback(() => {
      getFacilityHandler();
      setExistingData();
      return () => {
        console.log("Screen unfocused");
      };
    }, [])
  );

  return (
    <View>
      <Text>MR Tag</Text>
      <View>
        <TextInput
          mode="outlined"
          value={mrNo}
          onChangeText={mrNoChangeHandler}
        />
      </View>
      <View>
        <Pressable
          onPress={() => {
            setIsModalOpen(true);
          }}
        >
          <View style={styles.date}>
            <Text>{dayjs(selected).format("DD-MM-YYYY")}</Text>
          </View>
        </Pressable>
      </View>

      <View>
        <CustomDropdown
          label="Facility Type"
          items={[BLANK_DROPDOWN_MODEL, ...FACILITY_TYPES_ITEMS]}
          selectedItem={facilityType}
          onChange={selectActivityTypeHandler}
        />
      </View>
      <View>
        <CustomDropdown
          label={facilityLabel}
          items={[BLANK_DROPDOWN_MODEL, ...facilityItems]}
          selectedItem={facilityName}
          onChange={selectFacilityNameHandler}
        />
      </View>
      <View>
        <Button onPress={addMRTagHandler} mode="contained">
          Go
        </Button>
      </View>

      {/* Calendar View */}
      <Modal visible={isModalOpen}>
        <DateTimePicker
          mode="single"
          date={selected}
          onChange={selectDateHandler}
          styles={defaultStyles}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  rowItem: {
    flexBasis: 1,
    flexGrow: 1,
    margin: 5,
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
    fontSize: 20,
  },
});

export default MRTagItem;
