import CustomDropdown from "@/components/utils/CustomDropdown";
import { BLANK_DROPDOWN_MODEL } from "@/constants/BlankModels";
import {
  getSchoolsDropdownFromDB,
  saveSchoolLocation,
} from "@/database/database";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { View, Text } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import * as Location from "expo-location";

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
    <View style={{ padding: 10 }}>
      <Text>GPS Data Collection</Text>
      <View>
        <CustomDropdown
          label="School"
          items={[BLANK_DROPDOWN_MODEL, ...schoolItems]}
          selectedItem={selectedSchool}
          onChange={selectSchoolHandler}
        />
      </View>
      <View>
        <Button onPress={getCurrentLocation} mode="contained">
          Get Geo Location
        </Button>
      </View>
      <View
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
      </View>
      <View style={{ marginTop: 20 }}>
        <Button onPress={saveLocationHandler} mode="contained">
          Save Geo Location
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
    </View>
  );
};

export default GPSDataCollection;
