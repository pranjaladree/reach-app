import dayjs from "dayjs";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import StyledDropdown, { DropdownItem } from "../StyledDropdown";

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

interface Props {
  item: MRTagModel;
  studentId: string;
}

const MRTagForm: React.FC<Props> = ({ item, studentId }) => {
  const db = useSQLiteContext();

  const [mrNo, setMrNo] = useState("");
  const [facilityType, setFacilityType] =
    useState<DropdownItem>(BLANK_DROPDOWN_MODEL);
  const [facility, setFacility] = useState(BLANK_DROPDOWN_MODEL);
  const [facilityItems, setFacilityItems] = useState<DropdownModel[]>([]);
  const [facilityLabel, setFacilityLabel] = useState("");

  const [hospitalItems, setHospitalItems] = useState<DropdownModel[]>([]);
  const [visionCenterItems, setVisionCenterItems] = useState<DropdownModel[]>(
    []
  );
  const [otherFacilityItems, setOtherFacilityItems] = useState<DropdownModel[]>(
    []
  );

  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const addMRTagHandler = async () => {
    const response = await saveMRTag(
      db,
      new MRTagModel({
        id: studentId,
        mrNo,
        visitDate: dayjs(new Date()).format("YYYY-MM-DD"),
        facilityType: facilityType.value,
        facilityId: facility.id,
        studentId,
      })
    );
    if (response) showDialog();
  };

  const selectFacilityTypeHandler = (val?: string) => {
    const found = FACILITY_TYPES_ITEMS.find((item) => item.value === val);
    setFacilityType(found ?? BLANK_DROPDOWN_MODEL);
  };

  const selectFacilityHandler = (val?: string) => {
    const found = facilityItems.find((item) => item.value === val);
    setFacility(found ?? BLANK_DROPDOWN_MODEL);
  };

  const getFacilityHandler = async () => {
    const hospitalResponse = await findAllHospitals(db);
    if (hospitalResponse) setHospitalItems(hospitalResponse);

    const visionCenterResponse = await findAllVisionCenters(db);
    if (visionCenterResponse) setVisionCenterItems(visionCenterResponse);

    const otherFacilityResponse = await findAllOtherFacilities(db);
    if (otherFacilityResponse) setOtherFacilityItems(otherFacilityResponse);
  };

  const setExistingData = () => {
    if (item?.id !== "0") {
      setMrNo(item?.mrNo ?? "");
      const foundFacilityType = FACILITY_TYPES_ITEMS.find(
        (f) => f?.value === item?.facilityType
      );
      if (foundFacilityType) setFacilityType(foundFacilityType);
    }
  };

  useEffect(() => {
    if (facilityType.value?.toUpperCase() === "VISION CENTER") {
      setFacilityItems(visionCenterItems);
      setFacilityLabel("Vision Center");
    } else if (facilityType.value?.toUpperCase() === "HOSPITAL") {
      setFacilityItems(hospitalItems);
      setFacilityLabel("Hospital");
    } else if (facilityType.value?.toUpperCase() === "OTHER FACILITY") {
      setFacilityItems(otherFacilityItems);
      setFacilityLabel("Other Facility");
    }
  }, [facilityType, hospitalItems, visionCenterItems, otherFacilityItems]);

  useEffect(() => {
    if (item?.id !== "0") {
      const foundFacilityName = facilityItems.find(
        (f) => f.id === item?.facilityId
      );
      if (foundFacilityName) setFacility(foundFacilityName);
    }
  }, [facilityItems]);

  useFocusEffect(
    useCallback(() => {
      getFacilityHandler();
      setExistingData();
      return () => console.log("Screen unfocused");
    }, [item])
  );

  return (
    <View>
      <Text style={styles.label}>MR No</Text>
      <TextInput
        placeholder="MR NO"
        style={styles.input}
        value={mrNo}
        onChangeText={setMrNo}
      />

      <StyledDropdown
        label="Facility Type"
        items={[BLANK_DROPDOWN_MODEL, ...FACILITY_TYPES_ITEMS]}
        selectedItem={facilityType}
        onChange={selectFacilityTypeHandler}
      />

      <StyledDropdown
        label={facilityLabel || "Facility"}
        items={[BLANK_DROPDOWN_MODEL, ...facilityItems]}
        selectedItem={facility}
        onChange={selectFacilityHandler}
      />

      <TouchableOpacity style={styles.button} onPress={addMRTagHandler}>
        <Text style={styles.buttonText}>✓ Proceed</Text>
      </TouchableOpacity>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>REACHLite</Dialog.Title>
          <Dialog.Content>
            <Text>MR Tag Saved!</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} loading={isLoading}>
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default MRTagForm;

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#004aad",
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#004aad",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
