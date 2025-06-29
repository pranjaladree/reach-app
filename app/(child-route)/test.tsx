import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Transgender", value: "transgender" },
];

const classOptions = [
  { label: "Class 1", value: "1" },
  { label: "Class 2", value: "2" },
];

const sectionOptions = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
];

const titleOptions = [
  { label: "Mr", value: "mr" },
  { label: "Mrs", value: "mrs" },
];

const relationOptions = [
  { label: "Father", value: "father" },
  { label: "Mother", value: "mother" },
];

const specialNeedOptions = [
  { label: "None", value: "none" },
  { label: "Vision", value: "vision" },
];

const schoolOptions = [
  { label: "SUNFLOWERSCHOOL", value: "sunflower" },
];

const AddNewStudentScreen = () => {
  const [selectedSchool, setSelectedSchool] = useState(schoolOptions[0].value);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedRelation, setSelectedRelation] = useState("");
  const [selectedNeed, setSelectedNeed] = useState("");

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.label}>School Name</Text>
      <Dropdown
        data={schoolOptions}
        value={selectedSchool}
        onChange={(item) => setSelectedSchool(item.value)}
        labelField="label"
        valueField="value"
        placeholder="Select"
        style={styles.dropdown}
        autoScroll
        keyboardAvoiding
      />

      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} placeholder="First Name*" />

      <View style={styles.row}>
        <TextInput style={styles.input} placeholder="Middle Name" />
        <TextInput style={styles.input} placeholder="Last Name" />
      </View>

      <View style={styles.row}>
        <View style={styles.flex1}>
          <Text style={styles.label}>Class*</Text>
          <Dropdown
            data={classOptions}
            value={selectedClass}
            onChange={(item) => setSelectedClass(item.value)}
            labelField="label"
            valueField="value"
            placeholder="Select"
            style={styles.dropdown}
            autoScroll
            keyboardAvoiding
          />
        </View>
        <View style={styles.flex1}>
          <Text style={styles.label}>Section</Text>
          <Dropdown
            data={sectionOptions}
            value={selectedSection}
            onChange={(item) => setSelectedSection(item.value)}
            labelField="label"
            valueField="value"
            placeholder="Select"
            style={styles.dropdown}
            autoScroll
            keyboardAvoiding
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
        <TextInput style={styles.input} placeholder="Age*" />
        <TextInput style={styles.input} placeholder="Roll No*" />
      </View>

      <View style={styles.row}>
        <View style={styles.flex1}>
          <Text style={styles.label}>Title</Text>
          <Dropdown
            data={titleOptions}
            value={selectedTitle}
            onChange={(item) => setSelectedTitle(item.value)}
            labelField="label"
            valueField="value"
            placeholder="Select"
            style={styles.dropdown}
            autoScroll
            keyboardAvoiding
          />
        </View>
        <TextInput style={styles.input} placeholder="Next of Kin" />
      </View>

      <View style={styles.row}>
        <TextInput style={styles.input} placeholder="Contact Number" />
        <View style={styles.flex1}>
          <Text style={styles.label}>Relation</Text>
          <Dropdown
            data={relationOptions}
            value={selectedRelation}
            onChange={(item) => setSelectedRelation(item.value)}
            labelField="label"
            valueField="value"
            placeholder="Select"
            style={styles.dropdown}
            autoScroll
            keyboardAvoiding
          />
        </View>
      </View>

      <Text style={styles.label}>Special Need</Text>
      <Dropdown
        data={specialNeedOptions}
        value={selectedNeed}
        onChange={(item) => setSelectedNeed(item.value)}
        labelField="label"
        valueField="value"
        placeholder="Select"
        style={styles.dropdown}
        autoScroll
        keyboardAvoiding
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
  label: {
    fontSize: 14,
    color: "#000",
    marginBottom: 6,
    marginTop: 8,
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
  dropdown: {
    height: 48,
    borderColor: "#004aad",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
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
