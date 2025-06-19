import MRTagDataSync from "@/components/sync-to-server/mr-tag-data-sync";
import PrimaryDataSync from "@/components/sync-to-server/primary-data-sync";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SegmentedButtons } from "react-native-paper";

const SyncToServer = () => {
  const [screen, setScreen] = useState("PRIMARY_SCREENING");
  return (
    <View style={styles.screen}>
      <View style={styles.section}>
        <SegmentedButtons
          value={screen}
          onValueChange={setScreen}
          buttons={[
            {
              value: "PRIMARY_SCREENING",
              label: "Primary Screening Data Sync",
            },
            {
              value: "MR_TAG",
              label: "MR Tag Data Sync",
            },
          ]}
        />
      </View>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {screen == "PRIMARY_SCREENING"
              ? "Primary Screening Data Sync"
              : "MR Tag Data Sync"}
          </Text>
        </View>
        {screen == "PRIMARY_SCREENING" && <PrimaryDataSync />}
        {screen == "MR_TAG" && <MRTagDataSync />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    padding: 20,
    flex: 1,
  },
  section: {
    marginTop: 20,
  },
  card: {
    marginTop: 20,
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: "100%",
  },
  header: {
    marginTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default SyncToServer;
