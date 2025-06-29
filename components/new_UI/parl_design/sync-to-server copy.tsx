import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import StyledDropdown, {
  DropdownItem,
} from "@/components/new_UI/StyledDropdown";

// Dummy data
const schools: DropdownItem[] = [
  { label: "SUNFLOWERSCHOOL", value: "sunflower" },
  { label: "GREENSCHOOL", value: "green" },
];

export default function DataSyncScreen() {
  const [activeTab, setActiveTab] = useState<"primary" | "detailed">("primary");
  const [selectedSchool, setSelectedSchool] = useState<DropdownItem>(
    schools[0]
  );

  const handleGetData = () => {
    console.log("Get Data clicked for", selectedSchool.label);
  };

  const handleSyncData = () => {
    console.log("Sync Data clicked");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "primary" && styles.activeTab]}
          onPress={() => setActiveTab("primary")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "primary" && styles.activeTabText,
            ]}
          >
            Primary screening{"\n"}Data sync
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "detailed" && styles.activeTab]}
          onPress={() => setActiveTab("detailed")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "detailed" && styles.activeTabText,
            ]}
          >
            Detailed Evaluation{"\n"}Data Sync
          </Text>
        </TouchableOpacity>
      </View>

      {/* Card Section */}
      <View style={styles.card}>
        <Text style={styles.label}>Select School</Text>
        <View style={styles.row}>
          <View style={{ flex: 1, paddingTop: 15 }}>
            <StyledDropdown
              items={schools}
              selectedItem={selectedSchool}
              onChange={(val) => {
                const selected = schools.find((s) => s.value === val);
                if (selected) setSelectedSchool(selected);
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.getDataButton}
            onPress={handleGetData}
          >
            <MaterialIcons name="check-circle" size={20} color="#fff" />
            <Text style={styles.getDataText}>Get Data</Text>
          </TouchableOpacity>
        </View>

        {/* Summary */}
        <Text style={styles.summaryText}>Total Student: 40</Text>
        <Text style={styles.summaryText}>
          No of student undergone Primary screening: 35
        </Text>
        <Text style={styles.summaryText}>No of unsync Data: 35</Text>

        {/* Sync Button */}
        <TouchableOpacity style={styles.syncButton} onPress={handleSyncData}>
          <MaterialIcons name="cloud-upload" size={18} color="#fff" />
          <Text style={styles.syncText}>Sync Data</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f5f9",
    padding: 16,
  },
  tabRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#004aad",
    // borderRadius: 6,
    overflow: "hidden",
    // marginBottom: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#eaeaea",
    // alignItems: "center",
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  tabText: {
    fontSize: 14,
    // textAlign: "center",
    color: "#aaa",
    fontWeight: "bold",
  },
  activeTab: {
    backgroundColor: "#004aad",
    borderBottomWidth: 2,
    borderBottomColor: "#004aad",
  },
  activeTabText: {
    color: "#ffffff",
  },

  card: {
    borderWidth: 1,
    borderColor: "#004aad",
    // borderRadius: 8,
    backgroundColor: "#fff",
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 0,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    // borderBlockColor: "#004aad",
    // borderWidth: 1,
  },
  getDataButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#004aad",
    paddingHorizontal: 12,
    // paddingVertical: 10,
    height: 47,
    borderRadius: 6,
  },
  getDataText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "bold",
  },
  summaryText: {
    marginTop: 10,
    fontSize: 14,
    color: "#004aad",
    fontWeight: "700",
  },
  syncButton: {
    marginTop: 20,
    backgroundColor: "#004aad",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  syncText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "bold",
  },
});
