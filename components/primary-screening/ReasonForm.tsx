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
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import CustomInput from "../utils/CustomInput";
import { DateSelector } from "../new_UI/date-picker";
import QRCode from "react-native-qrcode-svg";

const ReasonForm = () => {
  const screeningItem = useSelector(
    (state: RootState) => state.studentSlice.screeningItem
  );

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
  const { isQCPopupEligible, isQCUser } = useLocalSearchParams();
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
  const [facilityName, setFacilityName] = useState(BLANK_DROPDOWN_MODEL);

  const [mobileNo, setMobileNo] = useState("");
  const [other, setOther] = useState("");
  const [instructions, setInstructions] = useState("");

  const selectActivityTypeHandler = (val?: string) => {
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

  const mobileNoChangeHandler = (val: string) => {
    setMobileNo(val);
  };

  const otherChangeHandler = (val: string) => {
    setOther(val);
  };

  const instructionsChangeHandler = (val: string) => {
    setInstructions(val);
  };

  const saveScreeningHandler = async () => {
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

  useEffect(() => {
    setQrData({
      id: screeningItem.studentId,
    });
  }, [screeningItem.studentId]);

  useFocusEffect(
    useCallback(() => {
      getFacilityHandler();
      return () => {
        console.log("Screen unfocused");
      };
    }, [])
  );
  return (
    <View style={styles.screen}>
      <View>
        <CustomInput
          id="reason"
          label="Reason For Referral / Advice"
          value={screeningItem.referralReason}
          onChangeText={() => {}}
        />
      </View>
      <View>
        <Pressable
          onPress={() => {
            setIsModalOpen(true);
          }}
        >
          <DateSelector
            selected={selected}
            onOpen={() => {
              setIsModalOpen(true);
            }}
          />
          {/* <View style={styles.date}>
            <Text>{dayjs(selected).format("DD-MM-YYYY")}</Text>
          </View> */}
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
        <TextInput
          label="Mobile No"
          value={mobileNo}
          onChangeText={mobileNoChangeHandler}
          mode="outlined"
          maxLength={10}
        />
      </View>
      <View>
        <TextInput
          label="Other"
          value={other}
          onChangeText={otherChangeHandler}
          mode="outlined"
        />
      </View>
      <View>
        <TextInput
          label="Instruction for Referred Center"
          value={instructions}
          onChangeText={instructionsChangeHandler}
          mode="outlined"
        />
      </View>
      <View>
        <Button onPress={saveScreeningHandler} mode="contained">
          Submit
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
          <QRCode value={JSON.stringify(qrData)} size={200} />

          <View style={{ marginTop: 40, flexDirection: "row" }}>
            <Button
              mode="outlined"
              onPress={() => {
                setIsQRCodeVisible(false);
              }}
            >
              Close
            </Button>
            <Button mode="outlined">Print QR</Button>
          </View>
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
