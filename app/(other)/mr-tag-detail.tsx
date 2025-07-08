import Advice from "@/components/mr-tag/Advice";
import MRTagItem from "@/components/mr-tag/MRTag";
import Refraction from "@/components/mr-tag/Refraction";
import VisualAcuity from "@/components/mr-tag/VisualAcuity";
import { DateSelector } from "@/components/new_UI/date-picker";
import CustomTabs, { TabItem } from "@/components/utils/CustomTabs";
import { BLANK_MR_TAG_MODEL } from "@/constants/BlankModels";
import { findOneMRTag } from "@/database/database";
import { RootState } from "@/store/store";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Modal } from "react-native";

const MRTagDetail = () => {
  const [TAB_ITEMS, SET_TAB_ITEMS] = useState([
    { title: "MR Tag", disabled: false },
    { title: "Visual Acuity", disabled: false },
    { title: "Refraction", disabled: false },
    { title: "Advise", disabled: false },
  ]);

  const [activeTab, setActiveTab] = useState(TAB_ITEMS[0]);

  const tabChangeHandler = (item: TabItem) => {
    setActiveTab(item);
  };

  const db = useSQLiteContext();
  const [mrTagItem, setMrTagItem] = useState(BLANK_MR_TAG_MODEL);
  const [isMrTagDone, setIsMrTagDone] = useState(false);

  console.log("********* MR TAG DONE *******", isMrTagDone);
  const {
    studentId,
    studentName,
    tempId,
    classTitle,
    section,
    age,
    gender,
    schoolId,
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

  useFocusEffect(
    useCallback(() => {
      getMRTagHandler();
      return () => {
        console.log("Screen unfocused");
      };
    }, [activeTab])
  );

  return (
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
      <View>
        <Text>Examination Details</Text>
      </View>
      <View style={{ padding: 10 }}>
        <CustomTabs
          items={TAB_ITEMS}
          activeTab={activeTab.title}
          onPress={tabChangeHandler}
        />
      </View>
      {activeTab == TAB_ITEMS[0] && (
        <View>
          <MRTagItem
            studentId={studentId?.toString()}
            tempId={tempId?.toString()}
            item={mrTagItem}
          />
        </View>
      )}
      {activeTab == TAB_ITEMS[1] && (
        <View>
          <VisualAcuity
            mrId={studentId?.toString()}
            isMRTagDone={isMrTagDone}
          />
        </View>
      )}
      {activeTab == TAB_ITEMS[2] && (
        <View>
          <Refraction mrId={studentId?.toString()} isMRTagDone={isMrTagDone} />
        </View>
      )}
      {activeTab == TAB_ITEMS[3] && (
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
