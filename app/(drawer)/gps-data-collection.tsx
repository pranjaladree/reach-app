import StyledDropdown from "@/components/new_UI/StyledDropdown";
import { Colors } from "@/constants/Colors";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

const { width } = Dimensions.get("window");

const schoolOptions = [
  { label: "SUNFLOWER SCHOOL", value: "sunflower" },
  { label: "ROSE SCHOOL", value: "rose" },
];

export default function GeoLocationScreen() {
  const [selectedSchool, setSelectedSchool] = useState("sunflower");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        {/* Dropdown */}

        {/* <Dropdown
          data={schoolOptions}
          labelField="label"
          valueField="value"
          value={selectedSchool}
          onChange={(item) => setSelectedSchool(item.value)}
          style={styles.dropdown}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.selectedText}
          iconStyle={styles.iconStyle}
        /> */}
        <StyledDropdown
          label="Select School"
          items={schoolOptions}
          selectedItem={schoolOptions.find(
            (item) => item.value === selectedSchool
          )}
          onChange={(val: any) => setSelectedSchool(val)}
          style={styles.dropdown}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.selectedText}
          iconStyle={styles.iconStyle}
        />

        {/* Get Location Button */}
        <Button
          mode="contained"
          style={[styles.button, { marginBottom: 12 }]}
          icon={() => (
            <MaterialIcons name="location-on" size={20} color="#fff" />
          )}
        >
          Get Geo Location
        </Button>

        {/* Lat/Lng Output */}
        <View style={styles.coordsRow}>
          <Text style={styles.coordText}>
            <Text style={styles.boldText}>Latitude:</Text> 45.93846
          </Text>
          <Text style={styles.coordText}>
            <Text style={styles.boldText}>Longitude:</Text> 45.93846
          </Text>
        </View>
        <Text style={styles.accuracy}>% of accuracy: 96%</Text>

        {/* Save Button */}
        <Button
          mode="contained"
          style={[styles.button, { marginTop: 20 }]}
          icon={() => <Feather name="download" size={20} color="#fff" />}
        >
          Save Geo location on Device
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f2f2f2",
    flexGrow: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderColor: "#004aad",
    borderWidth: 1,
    padding: 16,
    borderRadius: 6,
  },
  label: {
    marginBottom: 8,
    fontWeight: "500",
    fontSize: 14,
  },
  dropdown: {
    height: 50,
    borderColor: "#004aad",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 16,
    justifyContent: "center",
  },
  dropdownPlaceholder: {
    color: "#999",
    fontSize: 14,
  },
  selectedText: {
    fontSize: 14,
    color: "#000",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  button: {
    backgroundColor: "#004aad",
    height: 48,
    justifyContent: "center",
    borderRadius: 4,
    marginTop: 10,
  },
  coordsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  coordText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "bold",
  },
  boldText: {
    fontWeight: "bold",
    color: Colors.primary,
    fontSize: 16,
  },
  accuracy: {
    marginTop: 8,
    fontStyle: "italic",

    color: Colors.primary,
    fontSize: 16,
  },
});
