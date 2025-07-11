import VisualAcuity from "@/components/mr-tag/VisualAcuity";
import AutoRef from "@/components/primary-screening/AutoRef";
import BinacularTest from "@/components/primary-screening/BinacularTest";
import ColorVisionTest from "@/components/primary-screening/ColorVisionTest";
import OcularTest from "@/components/primary-screening/OcularTest";
import SpectacleStatus from "@/components/primary-screening/SpectacleStatus";
import TLE from "@/components/primary-screening/TLE";
import VisionTest from "@/components/primary-screening/VisionTest";
import CustomButton from "@/components/utils/CustomButton";
import {
  BLANK_DROPDOWN_MODEL,
  BLANK_GRID_DROPDOWN_MODEl,
  BLANK_REACH_CONFIGURATION_MODEL,
  BLANK_SCREENING_MODEL,
} from "@/constants/BlankModels";
import {
  NORMAL_ABNORMAL_DROPDOWN_ITEMS,
  YES_NO_DROPDOWN_ITEMS,
} from "@/constants/Data";
import { checkPSStatus } from "@/constants/Methods";
import {
  findReachConfigs,
  findScreeningById,
  findUserById,
  savePrimaryScreening,
} from "@/database/database";
import { ScreeningModel } from "@/models/primary-screening/ScreeningModel";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { GridDropdownModel } from "@/models/ui/GridDropdownModel";
import { setNormalCheck, setScreeningItem } from "@/store/slices/student-slice";
import { RootState } from "@/store/store";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button, Checkbox, Dialog, Portal } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

const ScreeningDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const db = useSQLiteContext();
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isAutorefAvailable, setIsAutorefAvailable] = useState(false);
  const [visionCenterId, setVisionCenterId] = useState("");
  const [isQCPopupEligible, setIsQCPopupEligible] = useState(false);
  const [reachConfigs, setReachConfigs] = useState(
    BLANK_REACH_CONFIGURATION_MODEL
  );
  const [isQCUser, setIsQCUser] = useState(false);
  const {
    studentId,
    studentName,
    tempId,
    classTitle,
    section,
    age,
    gender,
    schoolId,
    isMarkedForQc,
  } = useLocalSearchParams();
  const screeningItem = useSelector(
    (state: RootState) => state.studentSlice.screeningItem
  );
  const [status, setStatus] = useState("");
  const [isEligibleForColorVision, setIsEligibleForColorVision] =
    useState(false);

  const saveScreeningHandler = async () => {
    const response = await savePrimaryScreening(
      db,
      new ScreeningModel({
        ...screeningItem,
        isQCDone: isQCUser,
        psStatus: "NORMAL",
      })
    );
    if (response && isQCPopupEligible) {
      setDialogMessage("Send this Child for Quality Check");
    } else {
      setDialogMessage("Successfully Checked-out : Normal");
    }
    showDialog();
  };

  const navigateHandler = () => {
    router.replace({
      pathname: "/screening-list",
      params: {
        schoolId: screeningItem.schoolId,
      },
    });
  };

  const addScreeningHandler = () => {
    // Check Ps Status
    const response = checkPSStatus(
      screeningItem,
      reachConfigs,
      isAutorefAvailable
    );
    if (response) {
      if (response.status == "NORMAL") {
        setStatus(response.status);
        saveScreeningHandler();
      } else {
        dispatch(
          setScreeningItem({
            ...screeningItem,
            psStatus: response.status,
            referralReason: response.reason,
          })
        );
        router.replace({
          pathname: "/reason-for-referral",
          params: {
            isQCPopupEligible: isQCPopupEligible?.toString(),
            isQCUser: isQCUser?.toString(),
            visionCenterId: visionCenterId,
          },
        });
      }
    }
  };

  console.log("VC CENE", visionCenterId);

  const getAutorefStatusHandler = () => {
    console.log("GETTING AUTOREF.....");
    const response: any = db.getFirstSync(
      `SELECT autoRefAvailable,visionCenterId FROM schools WHERE id=${schoolId}`
    );
    if (response) {
      setVisionCenterId(response.visionCenterId);
      console.log("AUTO REFE STARTUS", response);
      if (response?.autoRefAvailable) {
        setIsAutorefAvailable(true);
      } else {
        setIsAutorefAvailable(false);
      }
    }
  };

  const getExistingData = async () => {
    const response: any = await findScreeningById(db, studentId.toString());
    console.log("Response ********************************", response);

    if (response) {
      let canReadLE = YES_NO_DROPDOWN_ITEMS.find(
        (item) => item.value == response.canReadLogmarLE
      );
      let canReadRE = YES_NO_DROPDOWN_ITEMS.find(
        (item) => item.value == response.canReadLogmarRE
      );
      let visonAutoLE = NORMAL_ABNORMAL_DROPDOWN_ITEMS.find(
        (item) => item.value == response.visionAutoRefLE
      );
      let visionAutoRE = NORMAL_ABNORMAL_DROPDOWN_ITEMS.find(
        (item) => item.value == response.visionAutoRefRE
      );

      let TLELE = NORMAL_ABNORMAL_DROPDOWN_ITEMS.find(
        (item) => item.value == response.torchlightCheckLE
      );
      let TLERE = NORMAL_ABNORMAL_DROPDOWN_ITEMS.find(
        (item) => item.value == response.torchlightCheckRE
      );

      let NPC = NORMAL_ABNORMAL_DROPDOWN_ITEMS.find(
        (item) => item.value == response.npcTest
      );

      let Cover = NORMAL_ABNORMAL_DROPDOWN_ITEMS.find(
        (item) => item.value == response.coverTest
      );

      let axisLe = new DropdownModel({
        id: "axisLe",
        label: response.acceptanceAXISLE,
        value: response.acceptanceAXISLE,
      });

      let axisRe = new DropdownModel({
        id: "axisRe",
        label: response.acceptanceAXISLE,
        value: response.acceptanceAXISLE,
      });

      let sphLe = new GridDropdownModel({
        id: "sphLe",
        title: response.acceptanceSPHLE,
        description: "",
        displayOrder: 1,
      });

      let sphRe = new GridDropdownModel({
        id: "sphRe",
        title: response.acceptanceSPHRE,
        description: "",
        displayOrder: 1,
      });

      let cylLe = new GridDropdownModel({
        id: "cylLe",
        title: response.acceptanceCYLLE,
        description: "",
        displayOrder: 1,
      });

      let cylRe = new GridDropdownModel({
        id: "cylRe",
        title: response.acceptanceCYLRE,
        description: "",
        displayOrder: 1,
      });
      //   {
      //     "appointmentDate": "2025-06-26",
      //     "colorVisionLE": "",
      //     "colorVisionRE": "",
      //     "facilityId": 2,
      //     "facilityType": "VISION CENTER",
      //     "instructionForReferralCenter": "inst",
      //     "isEditable": "1",
      //     "ocularList": "",
      //     "otherReason": "other",
      //     "plus2DTestLE": "",
      //     "plus2DTestRE": "",
      //     "psStatus": "REFER",
      //     "referralReason": "Can not read logmar 0.2",
      //     "torchlightFindings": "",
      // }
      dispatch(
        setScreeningItem(
          new ScreeningModel({
            id: studentId?.toString(),
            studentId: studentId?.toString(),
            schoolId: schoolId?.toString(),
            isNormal: false,
            usingSpectacle: response.usingSpectacle,
            haveSpecNow: response.haveSpecNow,
            specCondition: response.specCondition,
            isVisionTestVisible:
              response.unableToPerformVisionTest != "" ? true : false,
            unableToPerformVisionTest: response.unableToPerformVisionTest,
            canReadLogmarLE: canReadLE ? canReadLE : BLANK_DROPDOWN_MODEL,
            canReadLogmarRE: canReadRE ? canReadRE : BLANK_DROPDOWN_MODEL,
            isAutoRefVisible: false,
            visionAutoRefLE: visonAutoLE ? visonAutoLE : BLANK_DROPDOWN_MODEL,
            visionAutoRefRE: visionAutoRE ? visionAutoRE : BLANK_DROPDOWN_MODEL,
            acceptanceSPHLE: sphLe,
            acceptanceSPHRE: sphRe,
            acceptanceCYLLE: cylLe,
            acceptanceCYLRE: cylRe,
            acceptanceAXISLE: axisLe,
            acceptanceAXISRE: axisRe,
            IPDBoth: response.IPDBoth,
            isTorchlightVisible: false,
            torchlightCheckLE: TLELE ? TLELE : BLANK_DROPDOWN_MODEL,
            torchlightCheckRE: TLERE ? TLERE : BLANK_DROPDOWN_MODEL,
            torchlightFindings: response.torchlightFindings,
            isOcularComplaintVisible: false,
            ocularComplaint: response.ocularComplaint,
            ocularList: "",
            isBinucularTestVisible: false,
            isNpcTest: false,
            isCoverTest: false,
            isPlus2DTest: false,
            npcTest: NPC ? NPC : BLANK_DROPDOWN_MODEL,
            coverTest: Cover ? Cover : BLANK_DROPDOWN_MODEL,
            plus2DTestLE: BLANK_DROPDOWN_MODEL,
            plus2DTestRE: BLANK_DROPDOWN_MODEL,
            isColorVisionTestVisible: false,
            colorVisionLE: BLANK_DROPDOWN_MODEL,
            colorVisionRE: BLANK_DROPDOWN_MODEL,
            psStatus: "",
            referralReason: "",
            appointmentDate: "",
            mobileNo: "",
            facilityType: BLANK_DROPDOWN_MODEL,
            facilityName: BLANK_DROPDOWN_MODEL,
            otherReason: "",
            instructionForReferralCenter: "",
            isAutoRefRequired: false,
            isBinacularTestRequired: false,
            isColorVisionTestRequired: false,
            isTleRefer: false,
            isQCDone: false,
            isPsDone: false,
            isEditable: false,
          })
        )
      );
    } else {
      dispatch(
        setScreeningItem({
          ...BLANK_SCREENING_MODEL,
          id: studentId,
          studentId: studentId,
          schoolId: schoolId,
          unableToPerformVisionTest: "NO",
        })
      );
    }
  };

  const userId = useSelector((state: RootState) => state.userSlice.userId);
  console.log("USER ID", userId);

  const getUserHandler = async () => {
    const response: any = await findUserById(db, userId);
    console.log("RES********", response.isQualityCheck);

    if (response) {
      if (response.isQualityCheck == 0) {
        setIsQCUser(false);
      } else {
        setIsQCUser(true);
      }
    }
    console.log(isQCUser);
  };

  useEffect(() => {
    console.log("USER TYpe is QC", isQCUser);
    console.log("IS MArked", isMarkedForQc?.toString());
    if (!isQCUser && isMarkedForQc == "1") {
      setIsQCPopupEligible(true);
    } else {
      setIsQCPopupEligible(false);
    }
  }, [isQCUser, isMarkedForQc]);

  const getReachConfigsHandler = async () => {
    const response: any = await findReachConfigs(db);
    if (response) {
      setReachConfigs(response);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserHandler();
    }
  }, [userId]);

  useEffect(() => {}, [isQCUser]);

  useFocusEffect(
    useCallback(() => {
      getExistingData();
      getAutorefStatusHandler();
      getReachConfigsHandler();
      return () => {
        console.log("Screen unfocused");
      };
    }, [])
  );

  useEffect(() => {
    if (screeningItem.isNormal) {
      if (screeningItem.usingSpectacle == "NO") {
        dispatch(setNormalCheck());
      } else {
        if (screeningItem.haveSpecNow != "") {
          dispatch(setNormalCheck());
        }
      }
    }
  }, [
    screeningItem.isNormal,
    screeningItem.usingSpectacle,
    screeningItem.haveSpecNow,
  ]);

  useEffect(() => {
    if (
      screeningItem.unableToPerformVisionTest == "YES" &&
      isAutorefAvailable
    ) {
      dispatch(
        setScreeningItem({
          ...screeningItem,
          isTorchlightVisible: true,
        })
      );
    }
  }, [screeningItem.unableToPerformVisionTest, isAutorefAvailable]);

  return (
    <>
      <ScrollView style={styles.screen}>
        <View style={styles.headerBox}>
          <View>
            <Text style={styles.title}>{tempId}</Text>
            <Text style={styles.title}>{studentName}</Text>
          </View>
          <View>
            <Text style={styles.title}>
              {gender}/{age}
            </Text>
            <Text style={styles.title}>
              {classTitle}/{section}
            </Text>
          </View>
        </View>

        <View style={{ padding: 10 }}>
          <View style={styles.normal}>
            <Checkbox
              status={screeningItem.isNormal ? "checked" : "unchecked"}
              onPress={() => {
                dispatch(
                  setScreeningItem({
                    ...screeningItem,
                    isNormal: !screeningItem.isNormal,
                  })
                );
              }}
            />
            <Text>Normal</Text>
          </View>
          <View>
            <SpectacleStatus />
          </View>
          {/* Vision Test */}
          {screeningItem.isVisionTestVisible && <VisionTest />}

          {/* AutoRef Test */}
          {screeningItem.unableToPerformVisionTest == "YES" &&
            isAutorefAvailable && (
              <>
                <AutoRef />
              </>
            )}

          {/* Ocular Complaint Test */}
          {screeningItem.isOcularComplaintVisible && <OcularTest />}

          {/* Binacular Test */}
          {screeningItem.isBinucularTestVisible && <BinacularTest />}

          {/* Torchlight Examination */}
          {screeningItem.isTorchlightVisible && <TLE />}

          {/* Color Vision Test */}
          {screeningItem.isColorVisionTestVisible && <ColorVisionTest />}
        </View>
        <View style={{ paddingBottom: 200 }}></View>
      </ScrollView>
      <View style={styles.action}>
        <View style={styles.rowItem}>
          <CustomButton
            onPress={() => {
              router.push({
                pathname: "/(other)/update-student",
                params: {
                  studentId: studentId,
                },
              });
            }}
            title="Update Student"
          />
        </View>
        <View style={styles.rowItem}>
          <CustomButton title="Checkout" onPress={addScreeningHandler} />
          {/* <Button onPress={addScreeningHandler} mode="contained">
            Checkout
          </Button> */}
        </View>
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={saveScreeningHandler}>
          <Dialog.Title>REACHLite</Dialog.Title>
          <Dialog.Content>
            <Text>{dialogMessage}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={navigateHandler}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  headerBox: {
    backgroundColor: "#e3e3e3",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  normal: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  action: {
    backgroundColor: "white",
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopWidth: 0.2,
  },
  rowItem: {
    flexBasis: 1,
    flexGrow: 1,
    padding: 10,
  },
  title: {
    fontWeight: "bold",
  },
});

export default ScreeningDetails;
