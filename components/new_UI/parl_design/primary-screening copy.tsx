import StyledDropdown, {
  DropdownItem,
} from "@/components/new_UI/StyledDropdown";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, RadioButton } from "react-native-paper";

const classItems: DropdownItem[] = [
  { label: "Class 1", value: "1" },
  { label: "Class 2", value: "2" },
];

const sectionItems: DropdownItem[] = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
];

const schoolItems: DropdownItem[] = [
  { label: "SUNFLOWERSCHOOL", value: "sunflower" },
];

const PrimaryScreening = () => {
  const [selectedSchool, setSelectedSchool] = useState(schoolItems[0]);
  const [selectedClass, setSelectedClass] = useState<DropdownItem>({
    label: "Class",
    value: "",
  });
  const [selectedSection, setSelectedSection] = useState<DropdownItem>({
    label: "Section",
    value: "",
  });

  const [gender, setGender] = useState("all");
  const [status, setStatus] = useState("all");
  const [result, setResult] = useState("all");

  const onSearch = () => {
    router.push(
      "/(child-route)/(Primary-Screening-list)/Primary-Screening-list"
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>School Name</Text>
      <StyledDropdown
        items={schoolItems}
        selectedItem={selectedSchool}
        onChange={(val) => {
          const found = schoolItems.find((s) => s.value === val);
          if (found) setSelectedSchool(found);
        }}
      />

      <View style={styles.row}>
        <View style={styles.rowItem}>
          <StyledDropdown
            items={[{ label: "Class", value: "" }, ...classItems]}
            selectedItem={selectedClass}
            onChange={(val) => {
              const found = classItems.find((s) => s.value === val) || {
                label: "Class",
                value: "",
              };
              setSelectedClass(found);
            }}
          />
        </View>
        <View style={styles.rowItem}>
          <StyledDropdown
            items={[{ label: "Section", value: "" }, ...sectionItems]}
            selectedItem={selectedSection}
            onChange={(val) => {
              const found = sectionItems.find((s) => s.value === val) || {
                label: "Section",
                value: "",
              };
              setSelectedSection(found);
            }}
          />
        </View>
      </View>

      {/* Gender */}
      <Text style={styles.radioLabel}>Gender</Text>
      <View style={styles.radioGroup}>
        {["all", "M", "F", "T"].map((val) => (
          <View key={val} style={styles.radioItem}>
            <RadioButton
              value={val}
              status={gender === val ? "checked" : "unchecked"}
              onPress={() => setGender(val)}
              color="#0a63c9"
            />
            <Text>{val === "all" ? "All" : val}</Text>
          </View>
        ))}
      </View>

      {/* Status */}
      <Text style={styles.radioLabel}>Status</Text>
      <View style={styles.radioGroup}>
        {["all", "done", "not_done"].map((val) => (
          <View key={val} style={styles.radioItem}>
            <RadioButton
              value={val}
              status={status === val ? "checked" : "unchecked"}
              onPress={() => setStatus(val)}
              color="#0a63c9"
            />
            <Text>
              {val === "all" ? "All" : val === "done" ? "Done" : "Not Done"}
            </Text>
          </View>
        ))}
      </View>

      {/* Result */}
      <Text style={styles.radioLabel}>Result</Text>
      <View style={styles.radioGroup}>
        {["all", "pass", "fail"].map((val) => (
          <View key={val} style={styles.radioItem}>
            <RadioButton
              value={val}
              status={result === val ? "checked" : "unchecked"}
              onPress={() => setResult(val)}
              color="#0a63c9"
            />
            <Text>{val.charAt(0).toUpperCase() + val.slice(1)}</Text>
          </View>
        ))}
      </View>

      <Button mode="contained" style={styles.searchButton} onPress={onSearch}>
        Search
      </Button>
    </View>
  );
};

export default PrimaryScreening;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f7f7f7",
    flex: 1,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
    marginBottom: 12,
  },
  rowItem: {
    flex: 1,
  },
  radioLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 10,
    marginBottom: 4,
    color: "#000",
  },
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  searchButton: {
    marginTop: 16,
    borderRadius: 6,
    paddingVertical: 6,
    backgroundColor: "#0047AB",
  },
});
