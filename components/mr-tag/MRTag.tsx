import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import CustomDatePicker from "../ui/CustomDatePicker";
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";
import { useCallback, useEffect, useState } from "react";
import CustomDropdown from "../utils/CustomDropdown";
import { BLANK_DROPDOWN_MODEL } from "@/constants/BlankModels";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { FACILITY_TYPES_ITEMS } from "@/constants/Data";
import {
  findAllHospitals,
  findAllOtherFacilities,
  findAllVisionCenters,
  getMasterDropdownFromDB,
  saveMRTag,
  TABLES,
} from "@/database/database";
import { useSQLiteContext } from "expo-sqlite";
import { MRTagModel } from "@/models/patient-at-fixed-facilty/MRTagModel";
import { useFocusEffect } from "expo-router";
import { DateSelector } from "../new_UI/date-picker";
import dayjs from "dayjs";
import CustomInput from "../utils/CustomInput";
import StyledDropdown from "../new_UI/StyledDropdown";
import CustomButton from "../utils/CustomButton";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  item: MRTagModel;
  studentId: string;
  tempId: string;
}

const MRTagItem = ({ item, studentId, tempId }: Props) => {
  console.log("Item", item);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const db = useSQLiteContext();
  const [mrNo, setMrNo] = useState("");
  const [mrNoHasError, setMrNoHasError] = useState(false);
  const [mrNoErrorMessage, setMrNoErrorMessage] = useState("");

  const [hospitalItems, setHospitalItems] = useState<DropdownModel[]>([]);
  console.log("Hospital Items", hospitalItems);
  const [visionCenterItems, setVisionCenterItems] = useState<DropdownModel[]>(
    []
  );
  const [otherFacilityItems, setOtherFacilityItems] = useState<DropdownModel[]>(
    []
  );
  const [facilityItems, setFacilityItems] = useState<DropdownModel[]>([]);
  const [facilityLabel, setFacilityLabel] = useState("Facility Type");
  const [facilityType, setSelectedFaciliType] = useState(BLANK_DROPDOWN_MODEL);
  const [facilityTypeHasError, setFacilityTypeHasError] = useState(false);
  const [facilityTypeErrorMessage, setFacilityTypeErrorMessage] = useState("");
  const [facilityName, setFacilityName] = useState(BLANK_DROPDOWN_MODEL);
  const [facilityNameHasError, setFacilityNameHasError] = useState(false);
  const [facilityNameErrorMessage, setFacilityNameErrorMessage] = useState("");

  const mrNoChangeHandler = (val: string) => {
    setMrNo(val);
  };

  const selectActivityTypeHandler = (val?: string) => {
    console.log("Val", val);
    if (val == "SELECT") {
      setSelectedFaciliType(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = FACILITY_TYPES_ITEMS.find((item) => item.value == val);
      if (foundItem) {
        setSelectedFaciliType(foundItem);
      }
    }
    setFacilityTypeHasError(false);
    setFacilityTypeErrorMessage("");
  };

  const selectFacilityNameHandler = (val?: string) => {
    console.log("Val", val);
    if (val == "SELECT") {
      setFacilityName(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = facilityItems.find((item) => item.value == val);
      if (foundItem) {
        setFacilityName(foundItem);
      }
    }
    setFacilityNameHasError(false);
    setFacilityNameErrorMessage("");
  };

  const fieldValidator = () => {
    let isValid = true;
    console.log("Facility Type", facilityType);
    if (facilityType.value == "SELECT") {
      setFacilityTypeHasError(true);
      setFacilityTypeErrorMessage("Please select facility type !");
      isValid = false;
    }
    if (facilityName.id == "0") {
      setFacilityNameHasError(true);
      setFacilityNameErrorMessage("Please select facility name !");
      isValid = false;
    }
    return isValid;
  };

  const addMRTagHandler = async () => {
    if (!fieldValidator()) {
      return;
    }
    const response = await saveMRTag(
      db,
      new MRTagModel({
        id: studentId,
        mrNo: tempId,
        visitDate: dayjs(new Date()).format("YYYY-MM-DD"),
        facilityType: facilityType.value,
        facilityId: facilityName.id,
        studentId: studentId,
      })
    );
    if (response) {
      showDialog();
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

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
  }, [facilityType, visionCenterItems, hospitalItems, otherFacilityItems]);

  const getFacilityHandler = async () => {
    const hospitalResponse = await findAllHospitals(db);
    if (hospitalResponse) {
      setHospitalItems(hospitalResponse);
    }

    const visionCenterResponse = await findAllVisionCenters(db);
    if (visionCenterResponse) {
      setVisionCenterItems(visionCenterResponse);
    }

    const otherFacilityResponse = await findAllOtherFacilities(db);
    if (otherFacilityResponse) {
      setOtherFacilityItems(otherFacilityResponse);
    }
  };

  const setExistingData = () => {
    if (item?.id != "0") {
      setMrNo(item?.mrNo);
    }

    const foundFacilityType = FACILITY_TYPES_ITEMS.find(
      (item2) => item2?.value == item?.facilityType
    );
    if (foundFacilityType) {
      setSelectedFaciliType(foundFacilityType);
    }
  };

  useEffect(() => {
    if (item?.id != "0") {
      console.log("Runnning...");
      const foundFacilityName = facilityItems.find(
        (item2) => item2.id == item?.facilityId
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
    }, [item])
  );

  return (
    <>
      <View style={{ marginTop: 10, padding: 10 }}>
        <View>
          <CustomInput
            id="mrNo"
            label="MR No"
            value={tempId}
            onChangeText={() => {}}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flexGrow: 1, padding: 5 }}>
            <StyledDropdown
              label="Facility Type"
              items={[BLANK_DROPDOWN_MODEL, ...FACILITY_TYPES_ITEMS]}
              selectedItem={facilityType}
              onChange={selectActivityTypeHandler}
              required={true}
              isError={facilityTypeHasError}
              errorMessage={facilityTypeErrorMessage}
            />
          </View>
          <View style={{ flexGrow: 1, padding: 5 }}>
            <StyledDropdown
              label={facilityLabel}
              items={[BLANK_DROPDOWN_MODEL, ...facilityItems]}
              selectedItem={facilityName}
              onChange={selectFacilityNameHandler}
              required={true}
              isError={facilityNameHasError}
              errorMessage={facilityNameErrorMessage}
            />
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <CustomButton
            title="Proceed"
            onPress={addMRTagHandler}
            icon={
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color="white"
              />
            }
          />
          {/* <Button onPress={addMRTagHandler} mode="contained">
            Proceed
          </Button> */}
        </View>
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>REACHLite</Dialog.Title>
          <Dialog.Content>
            <Text>MR Tag Saved !</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} loading={isLoading}>
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
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
