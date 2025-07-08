import { RootState } from "@/store/store";
import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import CustomDropdown from "../utils/CustomDropdown";
import { BLANK_DROPDOWN_MODEL } from "@/constants/BlankModels";
import { FACILITY_TYPES_ITEMS } from "@/constants/Data";
import { useCallback, useEffect, useState } from "react";
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";
import { useSQLiteContext } from "expo-sqlite";
import { DropdownModel } from "@/models/ui/DropdownModel";
import {
  findAllHospitals,
  findAllOtherFacilities,
  findAllVisionCenters,
  getMasterDropdownFromDB,
  savePrimaryScreening,
  TABLES,
} from "@/database/database";
import dayjs from "dayjs";
import { ScreeningModel } from "@/models/primary-screening/ScreeningModel";
import {
  router,
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import CustomInput from "../utils/CustomInput";
import { DateSelector } from "../new_UI/date-picker";
import QRCode from "react-native-qrcode-svg";
import StyledDropdown from "../new_UI/StyledDropdown";
import CustomButton from "../utils/CustomButton";
import ViewQR from "../qr/ViewQR";

const ReasonForm = () => {
  const screeningItem = useSelector(
    (state: RootState) => state.studentSlice.screeningItem
  );
  const navigation = useNavigation();

  const [isQRCodeVisible, setIsQRCodeVisible] = useState(false);
  const [qrData, setQrData] = useState<any>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const defaultStyles = useDefaultStyles();
  const db = useSQLiteContext();
  const [mrNo, setMrNo] = useState("");
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [diaglogMessage, setDialogMessage] = useState("");
  const { isQCPopupEligible, isQCUser, visionCenterId } =
    useLocalSearchParams();
  console.log("Vision Center ID *********", visionCenterId);
  const [hospitalItems, setHospitalItems] = useState<DropdownModel[]>([]);
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
  const [facilityTypeHasError, setFacilityTypeHasError] = useState(false);
  const [facilityTypeErrorMessage, setFacilityTypeErrorMessage] = useState("");
  const [facilityName, setFacilityName] = useState(BLANK_DROPDOWN_MODEL);
  const [facilityNameHasError, setFacilityNameHasError] = useState(false);
  const [facilityNameErrorMessage, setFacilityNameErrorMessage] = useState("");

  const [mobileNo, setMobileNo] = useState("");
  const [mobileNoHasError, setMobileNoHasError] = useState(false);
  const [mobileNoErrorMessage, setMobileNoErrorMessage] = useState("");

  const [other, setOther] = useState("");
  const [instructions, setInstructions] = useState("");

  const selectActivityTypeHandler = (val?: string) => {
    console.log("*****************", val);
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
    if (val == "") {
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

  const selectDateHandler = ({ date }: any) => {
    setSelected(date);
    setIsModalOpen(false);
  };

  const mobileNoChangeHandler = (val: string) => {
    setMobileNo(val);
    setMobileNoHasError(false);
    setMobileNoErrorMessage("");
  };

  const otherChangeHandler = (val: string) => {
    setOther(val);
  };

  const instructionsChangeHandler = (val: string) => {
    setInstructions(val);
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
    if (screeningItem.psStatus == "REFER") {
      if (mobileNo.length != 10) {
        isValid = false;
        setMobileNoHasError(true);
        setMobileNoErrorMessage("Please enter a valid mobile No");
      }
    }
    return isValid;
  };

  const saveScreeningHandler = async () => {
    console.log("IS QC User", isQCUser == "true");
    if (!fieldValidator()) {
      return;
    }

    const response = await savePrimaryScreening(
      db,
      new ScreeningModel({
        ...screeningItem,
        appointmentDate: dayjs(selected).format("YYYY-MM-DD"),
        facilityType: facilityType,
        facilityName: facilityName,
        mobileNo: mobileNo,
        otherReason: other,
        instructionForReferralCenter: instructions,
        isQCDone: isQCUser == "true",
      })
    );
    console.log("Response", response);
    console.log("QC RESPONSE", isQCPopupEligible);
    console.log(isQCPopupEligible == "true");
    if (response && isQCPopupEligible == "true") {
      setDialogMessage("Please send this child for Quality Check");
    } else {
      setDialogMessage(`Successfully Checked-out : ${screeningItem.psStatus}`);
    }
    showDialog();
  };

  const navigateHandler = async () => {
    router.replace({
      pathname: "/screening-list",
      params: {
        schoolId: screeningItem.schoolId,
      },
    });
  };

  useEffect(() => {
    console.log("RUNNing Facilities...");
    if (facilityType.value?.toUpperCase() == "VISION CENTER") {
      setFacilityItems(visionCenterItems);
      setFacilityLabel("Vision Center");

      //Default School VC
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

  const [isInitial, setIsInitial] = useState(false);

  useEffect(() => {
    if (isInitial) {
      console.log("Facility Items", facilityItems);
      console.log("Vision Center Id", visionCenterId);
      const foundItem = facilityItems.find((item) => item.id == visionCenterId);
      console.log("FOUND", foundItem);
      if (foundItem) {
        setFacilityName(foundItem);
        setIsInitial(false);
      }
    }
  }, [facilityItems]);

  useEffect(() => {
    setQrData({
      id: screeningItem.studentId,
    });
  }, [screeningItem.studentId]);

  useFocusEffect(
    useCallback(() => {
      getFacilityHandler();
      setSelectedFaciliType(FACILITY_TYPES_ITEMS[1]);
      setIsInitial(true);
      return () => {
        console.log("Screen unfocused");
      };
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle:
        screeningItem.psStatus == "REFER" ? "Referral Form" : "Advise Form",
    });
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <View>
        <CustomInput
          id="reason"
          label={`Reason For ${
            screeningItem.psStatus == "REFER" ? "Referral" : "Advise"
          }`}
          value={screeningItem.referralReason}
          onChangeText={() => {}}
        />
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          padding: 10,
          alignItems: "center",
        }}
      >
        <View>
          <Text>Appointment Date </Text>
        </View>
        <View
          style={{
            borderRadius: 5,
            borderWidth: 1,
            padding: 10,
            width: 200,
            marginLeft: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={() => {
              setIsModalOpen(true);
            }}
          >
            <Text>{dayjs(selected).format("DD-MM-YYYY")}</Text>
          </Pressable>
        </View>
      </View>
      {/* <View style={{ marginTop: 10 }}>
        <Pressable
          onPress={() => {
            setIsModalOpen(true);
          }}
        >
          <View style={styles.date}>
            <Text>{dayjs(selected).format("DD-MM-YYYY")}</Text>
          </View>
        </Pressable>
      </View> */}

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flexBasis: 1, flexGrow: 1, padding: 5 }}>
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
        <View style={{ flexBasis: 1, flexGrow: 1, padding: 5 }}>
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
      <View>
        <CustomInput
          label="Mobile No"
          value={mobileNo}
          onChangeText={mobileNoChangeHandler}
          maxLength={10}
          isError={mobileNoHasError}
          errorMessage={mobileNoErrorMessage}
          required={true}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <CustomInput
          label="Other"
          value={other}
          onChangeText={otherChangeHandler}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <CustomInput
          label="Instruction for Referred Center"
          value={instructions}
          onChangeText={instructionsChangeHandler}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <CustomButton title="Submit" onPress={saveScreeningHandler} />
        {/* <Button onPress={saveScreeningHandler} mode="contained">
          Submit
        </Button> */}
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

      <Portal>
        <Dialog visible={visible} onDismiss={saveScreeningHandler}>
          <Dialog.Title>REACHLite</Dialog.Title>
          <Dialog.Content>
            <Text>{diaglogMessage}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setIsQRCodeVisible(true);
              }}
            >
              View QR Code
            </Button>
            <Button onPress={navigateHandler}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Modal visible={isQRCodeVisible}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <QRCode value={JSON.stringify(qrData)} size={200} /> */}
          <ViewQR
            studentId={screeningItem.studentId}
            onClose={() => {
              setIsQRCodeVisible(false);
            }}
          />

          {/* <View style={{ marginTop: 40, flexDirection: "row" }}>
            <View style={{ padding: 5 }}>
              <Button
                mode="outlined"
                onPress={() => {
                  setIsQRCodeVisible(false);
                }}
              >
                Close
              </Button>
            </View>
            <View style={{ padding: 5 }}>
              <Button mode="outlined">Print QR</Button>
            </View>
          </View> */}
        </View>
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

export default ReasonForm;
