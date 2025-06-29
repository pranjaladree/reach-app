import { BLANK_DROPDOWN_MODEL } from "@/constants/BlankModels";
import { FACILITY_TYPES_ITEMS } from "@/constants/Data";
import {
  findAllHospitals,
  findAllOtherFacilities,
  findAllVisionCenters,
  saveMRTag,
} from "@/database/database";
import { MRTagModel } from "@/models/patient-at-fixed-facilty/MRTagModel";
import { DropdownModel } from "@/models/ui/DropdownModel";
import dayjs from "dayjs";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import CustomDropdown from "../utils/CustomDropdown";
import CustomInput from "../utils/CustomInput";

interface Props {
  item: MRTagModel;
  studentId: string;
}

const MRTagItem = ({ item, studentId }: Props) => {
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
  const [facilityLabel, setFacilityLabel] = useState("Type");
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

  const addMRTagHandler = async () => {
    const response = await saveMRTag(
      db,
      new MRTagModel({
        id: studentId,
        mrNo: mrNo,
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
      <View>
        {/* <Text>MR Tag</Text> */}
        <View>
          <CustomInput
            id="mrNo"
            label="MR No"
            value={mrNo}
            onChangeText={mrNoChangeHandler}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flexGrow: 1 }}>
            <CustomDropdown
              label="Facility Type"
              items={[BLANK_DROPDOWN_MODEL, ...FACILITY_TYPES_ITEMS]}
              selectedItem={facilityType}
              onChange={selectActivityTypeHandler}
            />
          </View>
          <View style={{ flexGrow: 1 }}>
            <CustomDropdown
              label={facilityLabel}
              items={[BLANK_DROPDOWN_MODEL, ...facilityItems]}
              selectedItem={facilityName}
              onChange={selectFacilityNameHandler}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 15 }}>
          {/* <Button
            onPress={addMRTagHandler}
            mode="contained"
            style={styles.button}
          >
            Proceed
          </Button> */}
          <TouchableOpacity
            onPress={addMRTagHandler}
            // mode="contained"
            style={{
              marginTop: 20,
              backgroundColor: "#004aad",
              padding: 8,
              borderRadius: 6,
              alignItems: "center",
              width: "100%",
              flex: 1,
              height: 50,

              justifyContent: "center",
              gap: 10,
            }}
          >
            <Text style={{ color: "white" }}> Proceed</Text>
          </TouchableOpacity>
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
  button: {
    marginTop: 20,
    backgroundColor: "#004aad",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
  },
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
