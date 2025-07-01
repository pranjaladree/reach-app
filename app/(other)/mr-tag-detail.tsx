import Advice from "@/components/mr-tag/Advice";
import MRTagItem from "@/components/mr-tag/MRTag";
import Refraction from "@/components/mr-tag/Refraction";
import VisualAcuity from "@/components/mr-tag/VisualAcuity";
import { DateSelector } from "@/components/new_UI/date-picker";
import CustomTabs from "@/components/utils/CustomTabs";
import { BLANK_MR_TAG_MODEL } from "@/constants/BlankModels";
import { findOneMRTag } from "@/database/database";
import { RootState } from "@/store/store";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Modal } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";
import { useSelector } from "react-redux";

const TAB_ITEMS = ["MR Tag", "Visual Acuity", "Refraction", "Advise"];

const MRTagDetail = () => {
  const [activeTab, setActiveTab] = useState(TAB_ITEMS[0]);
  const tabChangeHandler = (item: string) => {
    setActiveTab(item);
  };

  const db = useSQLiteContext();
  const [mrTagItem, setMrTagItem] = useState(BLANK_MR_TAG_MODEL);
  const [isMrTagDone, setIsMrTagDone] = useState(false);
  const { studentId, studentName } = useLocalSearchParams();

  const [screen, setScreen] = useState("MR_TAG");

  const getMRTagHandler = async () => {
    const response = await findOneMRTag(db, studentId.toString());
    console.log("MR DATA", response);
    if (response?.isError) {
      setIsMrTagDone(false);
    } else {
      setMrTagItem(response?.data);
      setIsMrTagDone(true);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getMRTagHandler();
      return () => {
        console.log("Screen unfocused");
      };
    }, [])
  );

  return (
    <ScrollView style={styles.screen}>
      <View style={{ padding: 10 }}>
        <Text>Student ID {studentId}</Text>
        <Text>Student Name {studentName}</Text>
      </View>
      <View>
        <Text>Examination Details</Text>
      </View>
      <View style={{ padding: 10 }}>
        <CustomTabs
          items={TAB_ITEMS}
          activeTab={activeTab}
          onPress={tabChangeHandler}
        />
      </View>
      {activeTab == TAB_ITEMS[0] && (
        <View>
          <MRTagItem studentId={studentId.toString()} item={mrTagItem} />
        </View>
      )}
      {activeTab == TAB_ITEMS[1] && (
        <View>
          <VisualAcuity mrId={studentId?.toString()} />
        </View>
      )}
      {activeTab == TAB_ITEMS[2] && (
        <View>
          <Refraction mrId={studentId?.toString()} />
        </View>
      )}
      {activeTab == TAB_ITEMS[3] && (
        <View>
          <Advice mrId={studentId?.toString()} />
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
});

export default MRTagDetail;
