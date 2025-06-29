import Advice from "@/components/mr-tag/Advice";
import MRTagItem from "@/components/mr-tag/MRTag";
import Refraction from "@/components/mr-tag/Refraction";
import VisualAcuity from "@/components/mr-tag/VisualAcuity";
import { BLANK_MR_TAG_MODEL } from "@/constants/BlankModels";
import { findOneMRTag } from "@/database/database";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const tabOptions = ["MR TAG", "Visual Acuity", "Refraction", "Advice"];

const MRTagDetail = () => {
  const db = useSQLiteContext();
  const [mrTagItem, setMrTagItem] = useState(BLANK_MR_TAG_MODEL);
  const [isMrTagDone, setIsMrTagDone] = useState(false);
  const { studentId, studentName } = useLocalSearchParams();

  const [screen, setScreen] = useState("MR TAG");

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

  const renderTabContent = () => {
    switch (screen) {
      case "MR_TAG":
        return <MRTagItem studentId={studentId.toString()} item={mrTagItem} />;
      case "Visual Acuity":
        return <VisualAcuity mrId={studentId?.toString()} />;
      case "Refraction":
        return <Refraction mrId={studentId?.toString()} />;
      case "Advice":
        return <Advice mrId={studentId?.toString()} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* <View style={{ padding: 10 }}>
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
      )} */}

      <Text style={styles.header}>Examination Details</Text>
      <View style={styles.tabContainer}>
        {tabOptions.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, screen === tab && styles.tabActive]}
            onPress={() => setScreen(tab)}
          >
            <Text
              style={[styles.tabText, screen === tab && styles.tabTextActive]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.formContainer}>{renderTabContent()}</View>
      </ScrollView>
    </>
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

  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#004aad",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 8,
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#004aad",
    borderRightWidth: 0,
    backgroundColor: "#fff",
  },
  tabActive: {
    backgroundColor: "#004aad",
  },
  tabText: {
    textAlign: "center",
    color: "#004aad",
    fontWeight: "600",
  },
  tabTextActive: {
    color: "#fff",
  },
  formContainer: {
    gap: 16,
  },
});

export default MRTagDetail;
