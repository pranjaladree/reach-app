import { DistanceDvaModel } from "@/models/other-masters/DistanceDvaModel";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomGridDropdown from "../utils/CustomGridDropdown";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setVisualAcuity } from "@/store/slices/visual-acuity-slice";
import {
  BLANK_DROPDOWN_MODEL,
  BLANK_GRID_DROPDOWN_MODEl,
} from "@/constants/BlankModels";
import { GridDropdownModel } from "@/models/ui/GridDropdownModel";
import {
  Button,
  Checkbox,
  Dialog,
  Portal,
  TextInput,
} from "react-native-paper";
import { SegmentedButtons } from "react-native-paper";
import CustomDropdown from "../utils/CustomDropdown";
import {
  ACTIVITY_TYPE_ITEMS,
  EYE_DROPDOWN_ITEMS,
  FACILITY_TYPES_ITEMS,
} from "@/constants/Data";
import {
  findAdviceByMrId,
  findAllDiagnosisMaster,
  findAllDvas,
  findAllHospitals,
  findAllNvas,
  findAllOtherFacilities,
  findAllPhs,
  findAllReasonForReferrals,
  findAllVisionCenters,
  findDiagnosisByMRId,
  saveAdvice,
  saveDiagnosis,
} from "@/database/database";
import { Collapsible } from "../Collapsible";
import { AdviceVisitModel } from "@/models/patient-at-fixed-facilty/AdviceVisitModel";
import { DiagnosisVisitModel } from "@/models/patient-at-fixed-facilty/DiagnosisVisitModel";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { useFocusEffect } from "expo-router";
import StyledDropdown from "../new_UI/StyledDropdown";
import CustomButton from "../utils/CustomButton";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  mrId: string;
  isMRTagDone: boolean;
}

const Advice = ({ mrId, isMRTagDone }: Props) => {
  const db = useSQLiteContext();

  const [diagnosisDropdownItems, setDiagnosisDropdownItems] = useState<
    DropdownModel[]
  >([]);
  const [diagnosisType, setDiagnosisType] = useState(BLANK_DROPDOWN_MODEL);

  const selectDiagnosisTypeHandler = (val?: string) => {
    console.log("Val", val);
    if (val == "") {
      setDiagnosisType(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = diagnosisDropdownItems.find(
        (item) => item.value == val
      );
      if (foundItem) {
        setDiagnosisType(foundItem);
      }
    }
  };

  const [selectedEye, setSelectedEye] = useState(BLANK_DROPDOWN_MODEL);
  const selectEyeHandler = (val?: string) => {
    console.log("Val", val);
    if (val == "") {
      setSelectedEye(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = EYE_DROPDOWN_ITEMS.find((item) => item.value == val);
      if (foundItem) {
        setSelectedEye(foundItem);
      }
    }
  };

  const [isSpectaclePrescribed, setIsSpectaclePrescribed] = useState(false);
  const [isMedicinePrescribed, setIsMedicinePrescribed] = useState(false);
  const [isNoTreatmentRequired, setIsNoTreatmentRequired] = useState(false);
  const [isContinueWithSameGlass, setIsContinueWithSameGlasses] =
    useState(false);
  const [isPatientRefer, setIsPatientRefer] = useState(false);
  const [isSurgeryRequired, setIsSurgeryRequired] = useState(false);

  const [selectedActivityType, setSelectedActivityType] =
    useState(BLANK_DROPDOWN_MODEL);

  const selectActivityTypeHandler = (val?: string) => {
    console.log("Val", val);
    if (val == "") {
      setSelectedActivityType(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = ACTIVITY_TYPE_ITEMS.find((item) => item.id == val);
      if (foundItem) {
        setSelectedActivityType(foundItem);
      }
    }
  };

  const [otherComments, setOtherComments] = useState("");

  const otherCommentsChangeHandler = (val: string) => {
    setOtherComments(val);
  };

  const [referralReasonItems, setReferralReasonItems] = useState<
    DropdownModel[]
  >([
    new DropdownModel({ id: "1", value: "Reason 1", label: "Reason 1" }),
    new DropdownModel({ id: "2", value: "Reason 2", label: "Reason 2" }),
  ]);

  const [surgeryItems, setSurgeryItems] = useState<DropdownModel[]>([
    new DropdownModel({ id: "1", value: "Surgery 1", label: "Surgery 1" }),
    new DropdownModel({ id: "2", value: "Surgery 2", label: "Surgery 2" }),
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const [diaglogMessage, setDialogMessage] = useState("");

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const saveDiagnosisHandler = async () => {
    console.log("Saved Diagnosis Items", savedDiagnosisItem);
    let newItem = `${
      savedDiagnosisItem == "" ? "" : `${savedDiagnosisItem}##`
    }id:${diagnosisType.id}@@diagnosisType:${
      diagnosisType.value
    }@@selectedEye:${selectedEye.value}`;

    console.log("ITEN *************************", newItem);
    const response = await saveDiagnosis(
      db,
      new DiagnosisVisitModel({
        id: mrId,
        diagnosisItems: newItem,
        mrId: mrId,
      })
    );
    if (response) {
      showDialog();
      setDialogMessage("Diagnosis Data Saved !");
      getExistingDiagnosisHandler();
    }
  };

  const saveAdviceHandler = async () => {
    const response = await saveAdvice(
      db,
      new AdviceVisitModel({
        id: mrId,
        isSpectaclePrescribed: isSpectaclePrescribed,
        isMedicinePrescribed: isMedicinePrescribed,
        isContinueWithSameGlass: isContinueWithSameGlass,
        isNoTreatmentRequired: isNoTreatmentRequired,
        isPatientRefer: isPatientRefer,
        facilityType: facilityType.value,
        facilityName: facilityName.id,
        referralReason: referralReason.value,
        isSurgeryRequired: isSurgeryRequired,
        surgeryType: surgery.value,
        otherComments: otherComments,
        mrId: mrId,
      })
    );
    if (response) {
      showDialog();
      setDialogMessage("Adviced Saved !");
    }
  };

  const [hospitalItems, setHospitalItems] = useState<DropdownModel[]>([]);
  console.log("Hospital Items", hospitalItems);
  const [visionCenterItems, setVisionCenterItems] = useState<DropdownModel[]>(
    []
  );
  const [otherFacilityItems, setOtherFacilityItems] = useState<DropdownModel[]>(
    []
  );
  const [facilityItems, setFacilityItems] = useState<DropdownModel[]>([]);
  const [facilityLabel, setFacilityLabel] = useState("");
  const [facilityType, setSelectedFaciliType] = useState(BLANK_DROPDOWN_MODEL);
  const [facilityName, setFacilityName] = useState(BLANK_DROPDOWN_MODEL);

  const selectFacilityTypeHandler = (val?: string) => {
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

  const [referralReason, setReferralReason] = useState(BLANK_DROPDOWN_MODEL);

  const selectReferralReasonHandler = (val?: string) => {
    console.log("Val", val);
    if (val == "") {
      setReferralReason(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = referralReasonItems.find((item) => item.value == val);
      if (foundItem) {
        setReferralReason(foundItem);
      }
    }
  };

  const [surgery, setSurgery] = useState(BLANK_DROPDOWN_MODEL);

  const selectSurgeryHandler = (val?: string) => {
    console.log("Val", val);
    if (val == "") {
      setSurgery(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = surgeryItems.find((item) => item.value == val);
      if (foundItem) {
        setSurgery(foundItem);
      }
    }
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

  const [diagnosisList, setDiagnosisList] = useState<any[]>([]);
  const [savedDiagnosisItem, setSavedDiagnosisItems] = useState("");

  const getExistingDiagnosisHandler = async () => {
    console.log("GETTING Diagnosis ******************");
    const response: any = await findDiagnosisByMRId(db, mrId);
    console.log("Response DIASSSSSSS ********************", response);
    console.log("Response", response.diagnosisItems);
    if (response) {
      setSavedDiagnosisItems(response.diagnosisItems);
    }
  };

  useEffect(() => {
    const output = savedDiagnosisItem.split("##").map((item) => {
      const obj: any = {};
      item.split("@@").forEach((pair) => {
        const [key, value] = pair.split(":");
        obj[key] = value;
      });
      return obj;
    });

    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&", output);
    setDiagnosisList(output);
  }, [savedDiagnosisItem]);

  const getSpecPrescribedStatus = async () => {
    const response: any = await db.getFirstAsync(
      `SELECT spectaclesPrescribed FROM refraction WHERE mrId="${mrId}"`
    );
    if (response) {
      setIsSpectaclePrescribed(
        response.spectaclesPrescribed == 0 ? false : true
      );
    }
  };

  const [adviceItem, setAdviceItem] = useState<any>();

  const getExistingAdviceHandler = async () => {
    const response = await findAdviceByMrId(db, mrId);
    console.log("Response Advice", response);
    if (response) {
      setAdviceItem(response);
    }
  };

  useEffect(() => {
    if (adviceItem) {
      setIsSpectaclePrescribed(adviceItem.isSpectaclePrescribed);
      setIsMedicinePrescribed(adviceItem.isMedicinePrescribed);
      setIsNoTreatmentRequired(adviceItem.isNoTreatmentRequired);
      setIsContinueWithSameGlasses(adviceItem.isContinueWithSameGlass);
      setIsPatientRefer(adviceItem.isPatientRefer);
      setIsSurgeryRequired(adviceItem.isSurgeryRequired);
      setOtherComments(adviceItem.otherComments);

      const foundSurgery = FACILITY_TYPES_ITEMS.find(
        (item) => item.value == adviceItem.referredFacilityType
      );
      if (foundSurgery) {
        setSelectedFaciliType(foundSurgery);
      }
    }
  }, [adviceItem]);

  useEffect(() => {
    if (adviceItem) {
      const foundSurgery = surgeryItems.find(
        (item) => item.value == adviceItem.surgeryType
      );
      if (foundSurgery) {
        setSurgery(foundSurgery);
      }
    }
  }, [adviceItem, surgeryItems]);

  useEffect(() => {
    if (adviceItem) {
      const foundSurgery = facilityItems.find(
        (item) => item.id == adviceItem.referredFacilityId
      );
      if (foundSurgery) {
        setFacilityName(foundSurgery);
      }
    }
  }, [adviceItem, facilityItems]);

  useEffect(() => {
    if (adviceItem) {
      const foundSurgery = referralReasonItems.find(
        (item) => item.value == adviceItem.referralReason
      );
      if (foundSurgery) {
        setReferralReason(foundSurgery);
      }
    }
  }, [adviceItem, referralReasonItems]);

  const getDiagnosisMasterHandler = async () => {
    const response = await findAllDiagnosisMaster(db);
    if (response) {
      setDiagnosisDropdownItems(response);
    }
  };

  const getReasonsForReferralHandler = async () => {
    const response = await findAllReasonForReferrals(db);
    console.log("REFERRALS *********", response);
    if (response) {
      setReferralReasonItems(response);
    }
  };

  const [isDisableNoTreatment, setIsDiableNoTreatment] = useState(false);
  const [isDisableOtherAdvise, setDisableOtherAdvise] = useState(false);

  useEffect(() => {
    if (
      isSpectaclePrescribed ||
      isContinueWithSameGlass ||
      isMedicinePrescribed
    ) {
      setIsDiableNoTreatment(true);
    } else {
      setIsDiableNoTreatment(false);
    }
    if (isNoTreatmentRequired) {
      setDisableOtherAdvise(true);
    }
  }, [
    isSpectaclePrescribed,
    isContinueWithSameGlass,
    isMedicinePrescribed,
    isNoTreatmentRequired,
  ]);

  useFocusEffect(
    useCallback(() => {
      getFacilityHandler();
      getExistingDiagnosisHandler();
      getSpecPrescribedStatus();
      getExistingAdviceHandler();
      getDiagnosisMasterHandler();
      getReasonsForReferralHandler();
      return () => {
        console.log("Screen unfocused");
      };
    }, [])
  );

  return (
    <View style={styles.screen}>
      <Collapsible title="Diagnosis">
        <View style={{ padding: 10 }}>
          <View>
            <StyledDropdown
              label="Diagnosis Type"
              items={[BLANK_DROPDOWN_MODEL, ...diagnosisDropdownItems]}
              selectedItem={diagnosisType}
              onChange={selectDiagnosisTypeHandler}
            />
          </View>
          <View>
            <StyledDropdown
              label="Eye"
              items={[BLANK_DROPDOWN_MODEL, ...EYE_DROPDOWN_ITEMS]}
              selectedItem={selectedEye}
              onChange={selectEyeHandler}
            />
          </View>
          <View>
            <CustomButton
              title="Save"
              onPress={saveDiagnosisHandler}
              icon={
                <Ionicons
                  name="checkmark-circle-outline"
                  size={20}
                  color="white"
                />
              }
              disabled={!isMRTagDone}
            />
            {/* <Button onPress={saveDiagnosisHandler} mode="contained">
              Save
            </Button> */}
          </View>
        </View>
        <View>
          <View style={styles.box}>
            {diagnosisList.map((item) => (
              <View key={item.diagnosisType} style={styles.row}>
                <Text>{item.diagnosisType}</Text>
                <Text>{item.selectedEye}</Text>
              </View>
            ))}
          </View>
        </View>
      </Collapsible>

      {/* Box 1 */}
      <Collapsible title="Advice">
        <View style={styles.box}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Advice</Text>
          </View>
          {/* Row 1 */}
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <Checkbox
                status={isSpectaclePrescribed ? "checked" : "unchecked"}
                onPress={() => {}}
              />
              <Text>Spectacle Prescribed</Text>
            </View>
            <View style={styles.rowItem}>
              <Checkbox
                status={isMedicinePrescribed ? "checked" : "unchecked"}
                onPress={() => {
                  setIsMedicinePrescribed(!isMedicinePrescribed);
                }}
                disabled={isDisableOtherAdvise}
              />
              <Text>Medcine Prescribed</Text>
            </View>
            <View style={styles.rowItem}>
              <Checkbox
                status={isContinueWithSameGlass ? "checked" : "unchecked"}
                disabled={isSpectaclePrescribed || isDisableOtherAdvise}
                onPress={() => {
                  setIsContinueWithSameGlasses(!isContinueWithSameGlass);
                }}
              />
              <Text>Continue With Same Glass</Text>
            </View>
            <View style={styles.rowItem}>
              <Checkbox
                status={isNoTreatmentRequired ? "checked" : "unchecked"}
                onPress={() => {
                  setIsNoTreatmentRequired(!isNoTreatmentRequired);
                }}
                disabled={isDisableNoTreatment}
              />
              <Text>No Treatment Required</Text>
            </View>
          </View>
          {/* Row 2 */}
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <Checkbox
                status={isPatientRefer ? "checked" : "unchecked"}
                onPress={() => {
                  setIsPatientRefer(!isPatientRefer);
                }}
              />
              <Text>Patient Refer</Text>
            </View>
            <View style={styles.rowItem}>
              <CustomDropdown
                label={facilityLabel}
                items={[BLANK_DROPDOWN_MODEL, ...FACILITY_TYPES_ITEMS]}
                selectedItem={facilityType}
                onChange={selectFacilityTypeHandler}
                disabled={!isPatientRefer}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomDropdown
                label="Facility Name"
                items={[BLANK_DROPDOWN_MODEL, ...facilityItems]}
                selectedItem={facilityName}
                onChange={selectFacilityNameHandler}
                disabled={!isPatientRefer}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomDropdown
                label="Referral Reason"
                items={[BLANK_DROPDOWN_MODEL, ...referralReasonItems]}
                selectedItem={referralReason}
                onChange={selectReferralReasonHandler}
                disabled={!isPatientRefer}
              />
            </View>
          </View>
          {/* Row 3 */}
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <Checkbox
                status={isSurgeryRequired ? "checked" : "unchecked"}
                onPress={() => {
                  setIsSurgeryRequired(!isSurgeryRequired);
                }}
              />
              <Text>Surgery Required</Text>
            </View>
            <View style={styles.rowItem}>
              <CustomDropdown
                label="Surgery Type"
                items={[BLANK_DROPDOWN_MODEL, ...surgeryItems]}
                selectedItem={surgery}
                onChange={selectSurgeryHandler}
              />
            </View>
          </View>
          {/* Row 4 */}
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <TextInput
                mode="outlined"
                label="Other Comments"
                value={otherComments}
                onChangeText={otherCommentsChangeHandler}
              />
            </View>
          </View>
        </View>
        <View style={styles.action}>
          <CustomButton
            title="Save"
            onPress={saveAdviceHandler}
            icon={
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color="white"
              />
            }
            disabled={!isMRTagDone}
          />
          {/* <Button onPress={saveAdviceHandler} mode="contained">
            Save
          </Button> */}
        </View>
      </Collapsible>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>REACHLite</Dialog.Title>
          <Dialog.Content>
            <Text>{diaglogMessage}</Text>
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

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: "white",
  },
  box: {
    borderWidth: 0.5,
    padding: 10,
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  rowItem: {
    flexBasis: 1,
    flexGrow: 1,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
  },
  action: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default Advice;
