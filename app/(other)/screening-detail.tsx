import VisualAcuity from "@/components/mr-tag/VisualAcuity";
import AutoRef from "@/components/primary-screening/AutoRef";
import BinacularTest from "@/components/primary-screening/BinacularTest";
import ColorVisionTest from "@/components/primary-screening/ColorVisionTest";
import OcularTest from "@/components/primary-screening/OcularTest";
import SpectacleStatus from "@/components/primary-screening/SpectacleStatus";
import TLE from "@/components/primary-screening/TLE";
import VisionTest from "@/components/primary-screening/VisionTest";
import {
  BLANK_REACH_CONFIGURATION_MODEL,
  BLANK_SCREENING_MODEL,
} from "@/constants/BlankModels";
import { checkPSStatus } from "@/constants/Methods";
import { findScreeningById, savePrimaryScreening } from "@/database/database";
import { ScreeningModel } from "@/models/primary-screening/ScreeningModel";
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
  const [isAutorefAvailable, setIsAutorefAvailable] = useState(false);
  const { studentId, studentName, schoolId } = useLocalSearchParams();
  const screeningItem = useSelector(
    (state: RootState) => state.studentSlice.screeningItem
  );
  const [status, setStatus] = useState("");

  const toogleNormalCheckHandler = async () => {
    dispatch(
      setScreeningItem({
        ...screeningItem,
        isNormal: !screeningItem.isNormal,
      })
    );
    dispatch(setNormalCheck());
  };

  const saveScreeningHandler = async () => {
    const response = await savePrimaryScreening(
      db,
      new ScreeningModel({
        ...screeningItem,
        psStatus: "NORMAL",
      })
    );
    console.log("Response", response);
    if (response) {
      showDialog();
    }
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
      BLANK_REACH_CONFIGURATION_MODEL,
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
        });
      }
    }
  };

  const getAutorefStatusHandler = () => {
    console.log("GETTING AUTOREF.....");
    const response: any = db.getFirstSync(
      `SELECT autoRefAvailable FROM schools WHERE id=${schoolId}`
    );
    console.log("AUTO REFE STARTUS", response);
    if (response?.autoRefAvailable) {
      setIsAutorefAvailable(true);
    } else {
      setIsAutorefAvailable(false);
    }
  };

  const getExistingData = async () => {
    const response = await findScreeningById(db, studentId.toString());
    if (response) {
      dispatch(
        setScreeningItem({
          ...BLANK_SCREENING_MODEL,
        })
      );
    } else {
      dispatch(
        setScreeningItem({
          ...BLANK_SCREENING_MODEL,
          id: studentId,
          studentId: studentId,
          schoolId: schoolId,
        })
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      getExistingData();
      getAutorefStatusHandler();
      return () => {
        console.log("Screen unfocused");
      };
    }, [])
  );

  return (
    <>
      <ScrollView style={styles.screen}>
        <View>
          <Text>Student ID {studentId}</Text>
          <Text>Student Name {studentName}</Text>
        </View>
        <View style={styles.normal}>
          <Checkbox
            status={screeningItem.isNormal ? "checked" : "unchecked"}
            onPress={toogleNormalCheckHandler}
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
              <TLE />
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
        <View style={{ paddingBottom: 200 }}></View>
      </ScrollView>
      <View style={styles.action}>
        <View style={styles.rowItem}>
          <Button
            onPress={() => {
              router.push({
                pathname: "/(other)/update-student",
                params: {
                  studentId: studentId,
                },
              });
            }}
            mode="outlined"
          >
            Update Student
          </Button>
        </View>
        <View style={styles.rowItem}>
          <Button onPress={addScreeningHandler} mode="contained">
            Checkout
          </Button>
        </View>
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={saveScreeningHandler}>
          <Dialog.Title>REACHLite</Dialog.Title>
          <Dialog.Content>
            <Text>Successfully Checked-out : {status} </Text>
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
    paddingHorizontal: 10,
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
});

export default ScreeningDetails;
