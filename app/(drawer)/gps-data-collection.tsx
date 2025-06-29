import CustomDropdown from "@/components/utils/CustomDropdown";
import { BLANK_DROPDOWN_MODEL } from "@/constants/BlankModels";
import { Colors } from "@/constants/Colors";
import {
  getSchoolsDropdownFromDB,
  saveSchoolLocation,
} from "@/database/database";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";

const { width } = Dimensions.get("window");

const schoolOptions = [
  { label: "SUNFLOWER SCHOOL", value: "sunflower" },
  { label: "ROSE SCHOOL", value: "rose" },
];

export default function GeoLocationScreen() {
  const db = useSQLiteContext();
  const [schoolItems, setSchoolItems] = useState<DropdownModel[]>([]);
  const [selectedSchool, setSelectedSchool] = useState(BLANK_DROPDOWN_MODEL);
  const [location, setLocation] = useState<any>();

  const [isLoading, setIsLoading] = useState(false);

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const [diaglogMessage, setDialogMessage] = useState("");

  async function getCurrentLocation() {
    console.log(selectedSchool.value);
    if (selectedSchool.value == "SELECT") {
      setDialogMessage("Please Select School !");
      showDialog();
      return;
    }
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      // setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    setLocation(location);
  }

  const selectSchoolHandler = (val?: string) => {
    if (val == "SELECT") {
      setSelectedSchool(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = schoolItems.find((item) => item.value == val);
      if (foundItem) {
        setSelectedSchool(foundItem);
      }
    }
  };

  const getSchoolsHandler = async () => {
    const response = await getSchoolsDropdownFromDB(db);
    if (response) {
      setSchoolItems(response);
    }
  };

  const saveLocationHandler = async () => {
    if (selectedSchool.value == "SELECT") {
      setDialogMessage("Please Select School !");
      showDialog();
      return;
    }

    if (!location) {
      setDialogMessage("No Location Data found !");
      showDialog();
      return;
    }

    const response = await saveSchoolLocation(
      db,
      selectedSchool.id,
      location.coords?.latitude,
      location.coords?.latitude
    );
    if (response) {
      setDialogMessage("Location Data Saved !");
      showDialog();
    }
  };

  useFocusEffect(
    useCallback(() => {
      getSchoolsHandler();
      return () => {
        console.log("Screen unfocused");
      };
    }, [])
  );

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
        <CustomDropdown
          label="School"
          items={[BLANK_DROPDOWN_MODEL, ...schoolItems]}
          selectedItem={selectedSchool}
          onChange={selectSchoolHandler}
          style={{ paddingHorizontal: 0 }}
        />

        {/* Get Location Button */}
        <Button
          mode="contained"
          onPress={getCurrentLocation}
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
            <Text style={styles.boldText}>Latitude : </Text>
            {location ? location.coords?.latitude : ""}
          </Text>
          <Text style={styles.coordText}>
            <Text style={styles.boldText}>
              Longitude : {location ? location.coords?.longitude : ""}
            </Text>
          </Text>
        </View>
        {/* <Text style={styles.accuracy}>% of accuracy: 96%</Text> */}

        {/* Save Button */}
        <Button
          mode="contained"
          style={[styles.button, { marginTop: 20 }]}
          onPress={saveLocationHandler}
          icon={() => <Feather name="download" size={20} color="#fff" />}
        >
          Save Geo location on Device
        </Button>
      </View>


   <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>REACHLite</Dialog.Title>
          <Dialog.Content>
            <Text>{diaglogMessage}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} loading={isLoading}>
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

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
