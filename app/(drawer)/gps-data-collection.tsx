import CustomDropdown from "@/components/utils/CustomDropdown";
import { BLANK_DROPDOWN_MODEL } from "@/constants/BlankModels";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import * as Location from "expo-location";
import { Colors } from "@/constants/Colors";
import StyledDropdown from "@/components/new_UI/StyledDropdown";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import {
  findSchoolDropdowns,
  saveSchoolLocation,
} from "@/database/school-student-db";

const GPSDataCollection = () => {
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
    const response = await findSchoolDropdowns(db);
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
    <View style={{ padding: 20 }}>
      <View>
        <StyledDropdown
          label="School"
          items={[BLANK_DROPDOWN_MODEL, ...schoolItems]}
          selectedItem={selectedSchool}
          onChange={selectSchoolHandler}
        />
      </View>
      {/* <View>
        <Button onPress={getCurrentLocation} mode="contained">
          Get Geo Location
        </Button>
      </View> */}
      {/* Get Location Button */}
      <Button
        mode="contained"
        onPress={getCurrentLocation}
        style={[styles.button, { marginBottom: 12 }]}
        icon={() => <MaterialIcons name="location-on" size={20} color="#fff" />}
      >
        Get Geo Location
      </Button>
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
      {/* <View
        style={{
          marginTop: 20,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>
          Latitude : {location ? location.coords?.latitude : ""}
        </Text>
        <Text style={{ fontWeight: "bold" }}>
          Longitude : {location ? location.coords?.longitude : ""}
        </Text>
      </View> */}
      {/* <View style={{ marginTop: 20 }}>
        <Button onPress={saveLocationHandler} mode="contained">
          Save Geo Location
        </Button>
      </View> */}
      <Button
        mode="contained"
        style={[styles.button, { marginTop: 20 }]}
        onPress={saveLocationHandler}
        icon={() => <Feather name="download" size={20} color="#fff" />}
      >
        Save Geo location on Device
      </Button>

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
    </View>
  );
};

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

export default GPSDataCollection;
