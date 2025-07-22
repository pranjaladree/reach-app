import { findUserById } from "@/database/database";
import { useFocusEffect } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from "react-native";

import UnifiedStatCard from "@/components/new_UI/unifiedStatCard";
import { Colors } from "@/constants/Colors";
import { getMRCounts } from "@/database/mr-tag-db";
import { getPSCounts } from "@/database/primary-screening-db";
import {
  getSchoolCounts,
  getStudentCounts,
} from "@/database/school-student-db";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const Home = () => {
  const [totalSchoolCount, setTotalSchoolCount] = useState(0);
  const [psSchoolCount, setPsSchoolCount] = useState(0);
  const [cSSchoolCount, setCsSchoolCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [unsyncedPsCount, setUnsyncedPsCount] = useState(0);
  const [unsyncedMRTagCount, setUnsyncedMRTagCount] = useState(0);
  const db = useSQLiteContext();

  const userId = useSelector((state: RootState) => state.userSlice.userId);

  const getUserHandler = async () => {
    const response: any = await findUserById(db, userId);
    console.log("RES********", response);

    if (response) {
      if (response.isQualityCheck == 0) {
        console.log("QC False");
      } else {
        console.log("QC True");
      }
    }
  };

  const getStatistics = async () => {
    const response = await getSchoolCounts(db);
    if (response) {
      response.map((item: any) => {
        if (item.activityType == "COMPREHENSIVE_SCREENING") {
          setCsSchoolCount(item.count);
        }
        if (item.activityType == "PRIMARY_SCREENING") {
          setPsSchoolCount(item.count);
        }
      });
      setTotalSchoolCount(response?.length);
    }
    console.log("Counts", response);

    // Get Students Counts
    const studentResponse: any = await getStudentCounts(db);
    console.log("Student", studentResponse);
    if (studentResponse) {
      setStudentCount(studentResponse[0]?.count);
    }

    // Get Unsynced PS
    const psResponse: any = await getPSCounts(db);
    if (psResponse) {
      setUnsyncedPsCount(psResponse[0]?.count);
    }
    // Get Unsyncd MR Tag
    const mrResponse: any = await getMRCounts(db);
    if (mrResponse) {
      setUnsyncedMRTagCount(mrResponse[0]?.count);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getStatistics();
      getUserHandler();
      return () => {
        console.log("Screen unfocused");
      };
    }, [])
  );

  useEffect(() => {}, []);
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const cardStyle = isTablet ? styles.cardHalf : styles.cardFull;
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activity Status </Text>
      </View>
      <UnifiedStatCard
        totalSchoolCount={totalSchoolCount}
        psSchoolCount={psSchoolCount}
        cSSchoolCount={cSSchoolCount}
        studentCount={studentCount}
        unsyncedPsCount={unsyncedPsCount}
        unsyncedMRTagCount={unsyncedMRTagCount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  header: {
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 18,
    padding: 5,
    paddingHorizontal: 10,
    fontWeight: "bold",
    color: Colors.primary
  },
  divider: {
    // marginTop: 15,
    // height: 1,
    // backgroundColor: "#ccc",
  },
  scrollContent: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardFull: {
    width: "100%",
    marginBottom: 1,
  },
  cardHalf: {
    width: "48%",
    marginBottom: 5,
  },
});

export default Home;
