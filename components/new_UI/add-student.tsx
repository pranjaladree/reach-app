import StyledDropdown, {
  DropdownItem,
} from "@/components/new_UI/StyledDropdown";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const genderOptions: DropdownItem[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Transgender", value: "transgender" },
];

const classOptions: DropdownItem[] = [
  { label: "Class 1", value: "1" },
  { label: "Class 2", value: "2" },
];

const sectionOptions: DropdownItem[] = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
];

const titleOptions: DropdownItem[] = [
  { label: "Mr", value: "mr" },
  { label: "Mrs", value: "mrs" },
];

const relationOptions: DropdownItem[] = [
  { label: "Father", value: "father" },
  { label: "Mother", value: "mother" },
];

const specialNeedOptions: DropdownItem[] = [
  { label: "None", value: "none" },
  { label: "Vision", value: "vision" },
];

const schoolOptions: DropdownItem[] = [
  { label: "SUNFLOWERSCHOOL", value: "sunflower" },
];

const AddNewStudentScreen = () => {
  const [selectedSchool, setSelectedSchool] = useState<DropdownItem>(
    schoolOptions[0]
  );
  const [selectedClass, setSelectedClass] = useState<DropdownItem | null>(null);
  const [selectedSection, setSelectedSection] = useState<DropdownItem | null>(
    null
  );
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedTitle, setSelectedTitle] = useState<DropdownItem | null>(null);
  const [selectedRelation, setSelectedRelation] = useState<DropdownItem | null>(
    null
  );
  const [selectedNeed, setSelectedNeed] = useState<DropdownItem | null>(null);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.headerBar}>
        {/* <Text style={styles.headerText}>Add New Student</Text> */}
      </View>

      <StyledDropdown
        label="School Name"
        items={schoolOptions}
        selectedItem={selectedSchool}
        onChange={(val) => {
          const item = schoolOptions.find((i) => i.value === val);
          if (item) setSelectedSchool(item);
        }}
      />
      <View>
        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} placeholder="First Name*" />
      </View>

      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Middle Name</Text>
          <TextInput style={styles.input} placeholder="Middle Name" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput style={styles.input} placeholder="Last Name" />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.flex1}>
          <StyledDropdown
            label="Class*"
            items={classOptions}
            selectedItem={selectedClass || { label: "", value: "" }}
            onChange={(val) => {
              const item = classOptions.find((i) => i.value === val);
              if (item) setSelectedClass(item);
            }}
          />
        </View>
        <View style={styles.flex1}>
          <StyledDropdown
            label="Section"
            items={sectionOptions}
            selectedItem={selectedSection || { label: "", value: "" }}
            onChange={(val) => {
              const item = sectionOptions.find((i) => i.value === val);
              if (item) setSelectedSection(item);
            }}
          />
        </View>
      </View>

      <Text style={styles.label}>Gender*</Text>
      <View style={styles.radioRow}>
        {genderOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={styles.radioBtn}
            onPress={() => setSelectedGender(option.value)}
          >
            <View style={styles.radioCircle}>
              {selectedGender === option.value && (
                <View style={styles.radioDot} />
              )}
            </View>
            <Text>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Age</Text>
          <TextInput style={styles.input} placeholder="Age*" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}> Roll No </Text>
          <TextInput style={styles.input} placeholder="Roll No*" />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.flex1}>
          <StyledDropdown
            label="Title"
            items={titleOptions}
            selectedItem={selectedTitle || { label: "", value: "" }}
            onChange={(val) => {
              const item = titleOptions.find((i) => i.value === val);
              if (item) setSelectedTitle(item);
            }}
          />
        </View>
        <TextInput style={styles.input} placeholder="Next of Kin" />
      </View>

      <View style={styles.row}>
        <TextInput style={styles.input} placeholder="Contact Number" />
        <View style={styles.flex1}>
          <StyledDropdown
            label="Relation"
            items={relationOptions}
            selectedItem={selectedRelation || { label: "", value: "" }}
            onChange={(val) => {
              const item = relationOptions.find((i) => i.value === val);
              if (item) setSelectedRelation(item);
            }}
          />
        </View>
      </View>

      <StyledDropdown
        label="Special Need"
        items={specialNeedOptions}
        selectedItem={selectedNeed || { label: "", value: "" }}
        onChange={(val) => {
          const item = specialNeedOptions.find((i) => i.value === val);
          if (item) setSelectedNeed(item);
        }}
      />

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddNewStudentScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  headerBar: {
    backgroundColor: "#004aad",
    padding: 16,
    marginBottom: 16,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#004aad",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: "#000",
    marginBottom: 6,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    gap: 20,
  },
  radioBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  radioCircle: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#004aad",
    alignItems: "center",
    justifyContent: "center",
  },
  radioDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "#004aad",
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
    justifyContent: "space-between",
  },
  flex1: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: "#004aad",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
