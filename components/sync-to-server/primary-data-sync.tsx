import { View, Text, StyleSheet } from "react-native";
import CustomDropdown from "../utils/CustomDropdown";
import { BLANK_DROPDOWN_MODEL } from "@/constants/BlankModels";
import { useCallback, useState } from "react";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { Button } from "react-native-paper";
import {} from "@/database/database";
import { useSQLiteContext } from "expo-sqlite";
import { useFocusEffect } from "@react-navigation/native";
import { syncPSData } from "@/http/data-sync-http";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Dialog, Portal, PaperProvider } from "react-native-paper";
import AppButton from "../new_UI/AppButton";
import CustomButton from "../utils/CustomButton";
import StyledDropdown from "../new_UI/StyledDropdown";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { preparePSDataSync } from "@/database/sync-to-server";
import {
  findSchoolDropdowns,
  removeSchool,
} from "@/database/school-student-db";
import CustomNotification from "../utils/CustomNotification";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  onLogout: () => void;
}

const PrimaryDataSync = ({ onLogout }: Props) => {
  const db = useSQLiteContext();
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state: RootState) => state.userSlice.token);
  const [schoolItems, setSchoolItems] = useState<DropdownModel[]>([]);
  const [selectedSchool, setSelectedSchool] = useState(BLANK_DROPDOWN_MODEL);
  const [schoolHasError, setSchoolHasError] = useState(false);
  const [schoolErrorMessage, setSchoolErrorMessage] = useState("");
  const [isLogoutModal, setIsLogoutModal] = useState(false);

  const [isNotification, setIsNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [variant, setVariant] = useState("success");

  const openNotificationHandler = () => {
    setIsNotification(true);
  };

  const closeNotificationHandler = () => {
    setIsNotification(false);
  };

  const selectSchoolHandler = (val?: string) => {
    if (val == "SELECT") {
      setSelectedSchool(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = schoolItems.find((item) => item.value == val);
      if (foundItem) {
        setSelectedSchool(foundItem);
      }
    }
    setSchoolHasError(false);
    setSchoolErrorMessage("");
  };

  const syncPrimaryScreeningHandler = async () => {
    setIsLoading(true);
    if (selectedSchool.id == "0") {
      setSchoolHasError(true);
      setSchoolErrorMessage("Please select a school !");
      setIsLoading(false);
      return;
    }
    if (token == "OFFLINE_TOKEN") {
      setIsLogoutModal(true);
      setIsLoading(false);
      return;
    }

    try {
      const expiry = await AsyncStorage.getItem("expiry");
      if (expiry !== null) {
        if (new Date().getTime() > +expiry) {
          setIsLogoutModal(true);
          setIsLoading(false);
          return;
        }
      }
    } catch (e) {
      console.log(e);
    }

    const response = await preparePSDataSync(db, selectedSchool.id);
    const syncResponse = await syncPSData(token, response);
    if (syncResponse.isError) {
      setNotificationMessage(syncResponse.data);
      setVariant("error");
      // setDialogMessage(syncResponse.data);
      // showDialog();
    } else {
      setNotificationMessage(syncResponse.data);
      setVariant("success");

      //If School Activity is Primary Screening Then Remove School
      const schoolResponse: any = await db.getFirstAsync(
        `SELECT * FROM schools WHERE id="${selectedSchool.id}"`
      );
      if (schoolResponse) {
        if (
          schoolResponse.activityType == "PRIMARY_SCREENING" ||
          schoolResponse.activityType == "ANNUAL_FOLLOW_UP_VISIT"
        ) {
          removeSchool(db, selectedSchool.id);
        }
      }
    }
    openNotificationHandler();
    setIsLoading(false);
  };

  const getSchools = async () => {
    const response = await findSchoolDropdowns(db);
    if (response) {
      setSchoolItems(response);
    }
  };

  const [isCountLoading, setIsCountLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(-1);
  const [psDoneCount, setPsDoneCount] = useState(-1);

  const getStatisticsHandler = async () => {
    if (selectedSchool.id == "0") {
      setSchoolHasError(true);
      setSchoolErrorMessage("Please select a school !");
      return;
    }
    setIsCountLoading(true);
    try {
      const response1: any = await db.getFirstAsync(
        `SELECT COUNT(*) AS count FROM students WHERE schoolId="${selectedSchool.id}"`
      );
      console.log("RESPONSE 1 &&&&&&&&&&&", response1);
      if (response1) {
        setTotalCount(response1.count);
      }

      const response2: any = await db.getFirstAsync(
        `SELECT COUNT(*) AS count FROM students JOIN screenings ON screenings.studentId = students.id WHERE schoolId="${selectedSchool.id}"`
      );
      console.log("RESPONSE 2 &&&&&&&&&&&", response2);
      if (response2) {
        setPsDoneCount(response2.count);
      }
    } catch (err) {
      console.log(err);
    }
    setIsCountLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      getSchools();
      return () => {};
    }, [])
  );

  return (
    <View style={{ padding: 10 }}>
      <View style={styles.row}>
        <View style={{ flexBasis: 2, flexGrow: 2, padding: 5 }}>
          <StyledDropdown
            label="Select School"
            items={[BLANK_DROPDOWN_MODEL, ...schoolItems]}
            selectedItem={selectedSchool}
            onChange={selectSchoolHandler}
            isError={schoolHasError}
            errorMessage={schoolErrorMessage}
            required={true}
          />
        </View>
        <View style={{ flexBasis: 1, flexGrow: 1, padding: 5 }}>
          <CustomButton
            title="Get Data"
            onPress={getStatisticsHandler}
            icon={
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color="white"
              />
            }
            isLoading={isCountLoading}
          />
        </View>
      </View>
      <View style={styles.infobox}>
        <Text style={styles.infoLine}>
          Total Students : {totalCount == -1 ? "" : totalCount}
        </Text>
        <Text style={styles.infoLine}>
          No of Students undergone Primary Screening :{" "}
          {psDoneCount == -1 ? "" : psDoneCount}
        </Text>
        <Text style={styles.infoLine}>
          No of unsynced data: {psDoneCount == -1 ? "" : psDoneCount}{" "}
        </Text>
      </View>
      <View style={{ marginTop: 10, padding: 10 }}>
        <CustomButton
          title="Sync Data"
          onPress={syncPrimaryScreeningHandler}
          icon={
            <Ionicons name="cloud-upload-outline" size={20} color="white" />
          }
          isLoading={isLoading}
        />
      </View>
      {/* Notification */}
      <CustomNotification
        visible={isNotification}
        onClose={closeNotificationHandler}
        message={notificationMessage}
        variant={variant}
      />

      <CustomNotification
        visible={isLogoutModal}
        onClose={() => {
          setIsLogoutModal(false);
          onLogout();
        }}
        message="You Need to relogin online to complete this activity. Log out now"
        variant="error"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  infobox: {
    padding: 10,
  },
  infoLine: {
    padding: 5,
    color: Colors.primary,
    fontWeight: "bold",
  },
});

export default PrimaryDataSync;
