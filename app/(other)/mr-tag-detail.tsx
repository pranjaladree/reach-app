import Advice from "@/components/mr-tag/Advice";
import MRTagItem from "@/components/mr-tag/MRTag";
import Refraction from "@/components/mr-tag/Refraction";
import VisualAcuity from "@/components/mr-tag/VisualAcuity";
import CustomTabs, { TabItem } from "@/components/utils/CustomTabs";
import { BLANK_MR_TAG_MODEL } from "@/constants/BlankModels";
import { findOneMRTag } from "@/database/mr-tag-db";
import { findStudentById } from "@/database/school-student-db";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Modal } from "react-native";

const MRTagDetail = () => {
  const [TAB_ITEMS, SET_TAB_ITEMS] = useState([
    { title: "MR Tag", disabled: false, isDone: false },
    { title: "Visual Acuity", disabled: false, isDone: false },
    { title: "Refraction", disabled: false, isDone: false },
    { title: "Advise", disabled: false, isDone: false },
  ]);

  const [activeTab, setActiveTab] = useState(TAB_ITEMS[0]);

  const tabChangeHandler = (item: TabItem) => {
    setActiveTab(item);
  };

  const db = useSQLiteContext();
  const [mrTagItem, setMrTagItem] = useState(BLANK_MR_TAG_MODEL);
  const [isMrTagDone, setIsMrTagDone] = useState(false);

  const [studentData, setStudentData] = useState<any>();

  console.log("********* MR TAG DONE *******", isMrTagDone);
  const {
    studentId,
    // studentName,
    // tempId,
    // classTitle,
    // section,
    // age,
    // gender,
    // schoolId,
  } = useLocalSearchParams();

  // const [screen, setScreen] = useState("MR_TAG");

  const getMRTagHandler = async () => {
    const response = await findOneMRTag(db, studentId.toString());
    console.log("MR DATA", response);
    if (response?.isError) {
      setIsMrTagDone(false);
    } else {
      setMrTagItem(response?.data);
      if (response?.data) {
        setIsMrTagDone(true);
      }
    }
  };

  const getDoneStatisticsHandler = async () => {
    console.log("RESSS ********%%%%%%%%%%%");
    // const response = await db.getFirstAsync(
    //   `SELECT s.id,mr.id,va.id,rf.id FROM students s JOIN mrTags mr s.id=mr.studentId LEFT JOIN visualAcuity va ON mr.id = va.mrId LEFT JOIN refraction rf ON mr.id = rf.mrId WHERE s.id="${studentId}"`
    // );
    const response: any = await db.getFirstAsync(
      `SELECT s.id, mr.id as mrId,va.id as vaId,rf.id as rfId FROM students s JOIN mrTags mr ON s.id=mr.studentId LEFT JOIN visualAcuity va ON mr.id = va.mrId LEFT JOIN refraction rf ON mr.id = rf.mrId WHERE s.id="${studentId}"`
    );
    console.log("RESSS YYEYEYEYEYYE ********%%%%%%%%%%%", response);

    if (response) {
      let arr = TAB_ITEMS.map((item) => {
        if (item.title == "MR Tag" && response.mrId) {
          return { ...item, isDone: true };
        }
        if (item.title == "Visual Acuity" && response.vaId) {
          return { ...item, isDone: true };
        }
        if (item.title == "Refraction" && response.rfId) {
          return { ...item, isDone: true };
        }
        if (item.title == "Advise" && response.vaId) {
          return { ...item, isDone: true };
        }
        return item;
      });
      SET_TAB_ITEMS(arr);
    }
  };

  const getStudentDataHandler = async () => {
    if (studentId) {
      const response = await findStudentById(db, studentId.toString());
      console.log("Reso", response);
      if (response) {
        setStudentData(response);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      getStudentDataHandler();
      getMRTagHandler();
      return () => {
        console.log("Screen unfocused");
      };
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      getDoneStatisticsHandler();
      return () => {
        console.log("Student ID");
      };
    }, [studentId])
  );

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.headerBox}>
        <View>
          <Text style={styles.title}>{studentData?.tempId}</Text>
          <Text style={styles.title}>{studentData?.studentName}</Text>
        </View>
        <View>
          <Text style={styles.title}>
            {studentData?.gender}/{studentData?.age}
          </Text>
          <Text style={styles.title}>
            {studentData?.classTitle}/{studentData?.section}
          </Text>
        </View>
      </View>
      <View style={{ padding: 10 }}>
        <Text>Examination Details</Text>
      </View>
      <View style={{ padding: 10 }}>
        <CustomTabs
          items={TAB_ITEMS}
          activeTab={activeTab.title}
          onPress={tabChangeHandler}
        />
      </View>
      {activeTab.title == TAB_ITEMS[0].title && (
        <View>
          <MRTagItem
            studentId={studentId?.toString()}
            tempId={studentData?.tempId?.toString()}
            item={mrTagItem}
          />
        </View>
      )}
      {activeTab.title == TAB_ITEMS[1].title && (
        <View>
          <VisualAcuity
            mrId={studentId?.toString()}
            isMRTagDone={isMrTagDone}
          />
        </View>
      )}
      {activeTab.title == TAB_ITEMS[2].title && (
        <View>
          <Refraction mrId={studentId?.toString()} isMRTagDone={isMrTagDone} />
        </View>
      )}
      {activeTab.title == TAB_ITEMS[3].title && (
        <View>
          <Advice mrId={studentId?.toString()} isMRTagDone={isMrTagDone} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  tabs: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    backgroundColor: "white",
  },
  headerBox: {
    backgroundColor: "#e3e3e3",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
  },
});

export default MRTagDetail;
