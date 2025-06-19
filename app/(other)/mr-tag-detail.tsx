import Advice from "@/components/mr-tag/Advice";
import MRTagItem from "@/components/mr-tag/MRTag";
import Refraction from "@/components/mr-tag/Refraction";
import VisualAcuity from "@/components/mr-tag/VisualAcuity";
import { BLANK_MR_TAG_MODEL } from "@/constants/BlankModels";
import { findOneMRTag } from "@/database/database";
import { RootState } from "@/store/store";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { useSelector } from "react-redux";

const MRTagDetail = () => {
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
      <Text>Screening Details</Text>
      <View>
        <SegmentedButtons
          value={screen}
          onValueChange={setScreen}
          buttons={[
            {
              value: "MR_TAG",
              label: "MR TAG",
            },
            {
              value: "VISUAL_ACUITY",
              label: "Visual Acuity",
              disabled: !isMrTagDone,
            },
            {
              value: "REFRACTION",
              label: "Refraction",
              disabled: !isMrTagDone,
            },
            { value: "ADVICE", label: "Advice", disabled: !isMrTagDone },
          ]}
        />
      </View>
      {screen == "MR_TAG" && (
        <View>
          <MRTagItem studentId={studentId.toString()} item={mrTagItem} />
        </View>
      )}
      {screen == "VISUAL_ACUITY" && (
        <View>
          <VisualAcuity mrId={studentId?.toString()} />
        </View>
      )}
      {screen == "REFRACTION" && (
        <View>
          <Refraction mrId={studentId?.toString()} />
        </View>
      )}
      {screen == "ADVICE" && (
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
