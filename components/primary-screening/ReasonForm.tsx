import { RootState } from "@/store/store";
import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
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
import StyledDropdown from "../new_UI/StyledDropdown";
import CustomButton from "../utils/CustomButton";
import ViewQR from "../qr/ViewQR";
import { savePrimaryScreening } from "@/database/primary-screening-db";
import { setScreeningItem } from "@/store/slices/student-slice";
import CustomReasonNotification from "./CustomReasonNotification";

const ReasonForm = () => {
  const screeningItem = useSelector(
    (state: RootState) => state.studentSlice.screeningItem
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isNotification, setIsNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [variant, setVariant] = useState("success");

  const openNotificationHandler = () => {
    setIsNotification(true);
  };

  const closeNotificationHandler = () => {
    setIsNotification(false);
    navigateHandler();
  };

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
  const [dateHasError, setDateHasError] = useState(false);
  const [dateErrorMessage, setDateErrorMessage] = useState("");
  const [facilityItems, setFacilityItems] = useState<DropdownModel[]>([]);
  const [facilityLabel, setFacilityLabel] = useState("Vision Center");
  const [facilityType, setSelectedFaciliType] = useState(
    FACILITY_TYPES_ITEMS[1]
  );
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
    setDateHasError(false);
    setDateErrorMessage("");
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
    if (!selected) {
      isValid = false;
      setDateHasError(true);
      setDateErrorMessage("Please select a valid appointment date !");
    }
    return isValid;
  };

  const saveScreeningHandler = async () => {
    console.log("IS QC User", isQCUser == "true");
    if (!fieldValidator()) {
      return;
    }

    let nonEditable = false;
    if (isQCUser == "false" && isQCPopupEligible) {
      nonEditable = true;
    }
    const notEditable = !isQCUser && isQCPopupEligible;

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
        isNonEditable: nonEditable,
      })
    );
    console.log("Response", response);
    console.log("QC RESPONSE", isQCPopupEligible);
    console.log(isQCPopupEligible == "true");
    if (response && isQCPopupEligible == "true") {
      setNotificationMessage("Please Send this Child for Quality Check !");
      setVariant("success");
    } else {
      setNotificationMessage(
        `Successfully Checked-out : ${screeningItem.psStatus}`
      );
      setVariant("success");
    }
    openNotificationHandler();
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
      console.log("Facility Names &&&&&&&&&&&", visionCenterResponse);
      setFacilityItems(visionCenterResponse);
    }

    const otherFacilityResponse = await findAllOtherFacilities(db);
    if (otherFacilityResponse) {
      setOtherFacilityItems(otherFacilityResponse);
      console.log(otherFacilityResponse);
    }
  };

  const [isInitial, setIsInitial] = useState(true);

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

  const getStudentHandler = async (id: string) => {
    console.log("IDDDDD", id);
    const response: any = await db.getFirstAsync(
      `SELECT * FROM students JOIN classes ON students.classId = classes.id WHERE id ="${id}"`
    );
    console.log("STUDENT ********************", response);
    if (response) {
      setQrData({
        id: response.id,
        firstName: response.firstName,
        middleName: response.middleName,
        lastName: response.lastName,
        class: response.title,
        section: response.section,
      });
    }
  };

  useEffect(() => {
    if (screeningItem.studentId) {
      getStudentHandler(screeningItem.studentId);
    }
  }, [screeningItem.studentId]);

  useFocusEffect(
    useCallback(() => {
      getFacilityHandler();
      // setSelectedFaciliType(FACILITY_TYPES_ITEMS[1]);
      // setIsInitial(true);
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
          marginTop: 10,
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Text>Appointment Date</Text>
          <Text style={{ color: "red" }}> *</Text>
        </View>
        <View style={styles.dateBox}>
          <Pressable
            onPress={() => setIsModalOpen(true)}
            style={styles.dateField}
          >
            <Text style={styles.dateIcon}>📅</Text>
            <Text style={styles.dateText}>
              {selected ? dayjs(selected).format("DD-MM-YYYY") : "Select Date"}
            </Text>
          </Pressable>
        </View>
      </View>
      {dateHasError && (
        <View style={{ paddingVertical: 10 }}>
          <Text style={{ color: "red" }}>{dateErrorMessage}</Text>
        </View>
      )}

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
          required={screeningItem.psStatus == "REFER" ? true : false}
          keyboardType="numeric"
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

      {/* Notification */}
      <CustomReasonNotification
        visible={isNotification}
        onClose={closeNotificationHandler}
        message={notificationMessage}
        variant={variant}
        onViewQr={() => {
          // setIsQRCodeVisible(true);
          console.log("PRRRR");
          router.replace({
            pathname: "/view-qr",
            params: {
              studentId: screeningItem.studentId,
            },
          });
        }}
      />

      {/* <Modal visible={isQRCodeVisible}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ViewQR
            studentId={screeningItem.studentId}
            onClose={() => {
              setIsQRCodeVisible(false);
            }}
            onQrPress={() => {
              console.log("PRRINTTTT QRRRRRRRR");
              router.replace({
                pathname: "/view-qr",
                params: {
                  schoolId: screeningItem.studentId,
                },
              });
            }}
          />
        </View>
      </Modal> */}
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
  dateBox: {
    flex: 1,
  },
  dateField: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#004aad",
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  dateIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  dateText: {
    fontSize: 16,
  },
});

export default ReasonForm;
