
import { router, useRouter } from "expo-router";
import { View, StyleSheet, FlatList, TextInput, Modal } from "react-native";
import { useState } from "react";
import { Button, Text } from "react-native-paper";
import StyledDropdown from "@/components/new_UI/StyledDropdown";
import { BLANK_DROPDOWN_MODEL } from "@/constants/BlankModels";

const SpectacleBookingScreen = () => {
  const [selectedSchool, setSelectedSchool] = useState(BLANK_DROPDOWN_MODEL);
  const [selectedClass, setSelectedClass] = useState(BLANK_DROPDOWN_MODEL);
  const [selectedSection, setSelectedSection] = useState(BLANK_DROPDOWN_MODEL);

  const handleSearch = () => {
    router.push("/(spectacle-booking)/spec-student-list");
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <StyledDropdown
        label="School Name"
        items={[BLANK_DROPDOWN_MODEL]}
        selectedItem={selectedSchool}
        onChange={(val:any) => setSelectedSchool({ ...selectedSchool, value: val })}
      />
      <View style={styles.row}>
        <View style={styles.rowItem}>
          <StyledDropdown
            label="Class"
            items={[BLANK_DROPDOWN_MODEL]}
            selectedItem={selectedClass}
            onChange={(val:any) =>
              setSelectedClass({ ...selectedClass, value: val })
            }
          />
        </View>
        <View style={styles.rowItem}>
          <StyledDropdown
            label="Section"
            items={[BLANK_DROPDOWN_MODEL]}
            selectedItem={selectedSection}
            onChange={(val:any) =>
              setSelectedSection({ ...selectedSection, value: val })
            }
          />
        </View>
      </View>
      <Button
        mode="contained"
        onPress={handleSearch}
        style={styles.searchButton}
      >
        Search
      </Button>
    </View>
  );
};

export default SpectacleBookingScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10,
  },
  rowItem: {
    flex: 1,
  },
  searchButton: {
    marginTop: 16,
    borderRadius: 6,
    paddingVertical: 6,
    backgroundColor: "#0047AB",
  },
  count: {
    fontWeight: "bold",
    fontSize: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  studentCard: {
    padding: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 10,
  },
  studentName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  studentInfo: {
    color: "#555",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "90%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});
