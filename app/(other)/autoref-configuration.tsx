import { View, Text, StyleSheet } from "react-native";
import CustomDropdown from "@/components/utils/CustomDropdown";
import { Button, Checkbox, Dialog, Portal } from "react-native-paper";
import { useCallback, useEffect, useState } from "react";
import { BLANK_DROPDOWN_MODEL } from "@/constants/BlankModels";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { useSQLiteContext } from "expo-sqlite";
import { getSchoolsDropdownFromDB } from "@/database/database";
import { useFocusEffect } from "expo-router";
import StyledDropdown from "@/components/new_UI/StyledDropdown";
import CustomButton from "@/components/utils/CustomButton";

const AutorefConfiguration = () => {
  const [schoolItems, setSchoolItems] = useState<DropdownModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const db = useSQLiteContext();

  const [selectedSchool, setSelectedSchool] = useState(BLANK_DROPDOWN_MODEL);

  const selectSchoolHandler = (val?: string) => {
    if (val == "SELECT") {
      setSelectedSchool(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = schoolItems.find((item) => item.value == val);
      if (foundItem) {
        setSelectedSchool(foundItem);
        getExistingData(foundItem.id);
      }
    }
  };

  const [isAutorefAvailable, setIsAutorefAvailable] = useState(false);

  const saveAutorefConfiguration = async () => {
    try {
      const response = await db.runAsync(
        `UPDATE schools SET autoRefAvailable=${isAutorefAvailable} WHERE id=${selectedSchool.id}`
      );
      console.log("Ress", response);
      if (response) {
        showDialog();
      }
    } catch (err) {}
  };

  const getSchoolsHandler = async () => {
    const response = await getSchoolsDropdownFromDB(db);
    if (response) {
      setSchoolItems(response);
    }
  };

  const getExistingData = async (id: string) => {
    const response: any = await db.getFirstAsync(
      `SELECT autoRefAvailable FROM schools WHERE schoolId=${id}`
    );
    console.log("AUT", response);
    if (response) {
      setIsAutorefAvailable(response.autoRefAvailable);
    }
  };

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

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
      <View>
        <StyledDropdown
          label="School"
          items={[BLANK_DROPDOWN_MODEL, ...schoolItems]}
          selectedItem={selectedSchool}
          onChange={selectSchoolHandler}
        />
      </View>
      <View style={styles.row}>
        <Checkbox
          status={isAutorefAvailable ? "checked" : "unchecked"}
          onPress={() => {
            setIsAutorefAvailable(!isAutorefAvailable);
          }}
        />
        <Text>Autoref Available</Text>
      </View>
      <View>
        <CustomButton title="Save" onPress={saveAutorefConfiguration} />
        {/* <Button
          onPress={saveAutorefConfiguration}
          mode="contained"
          loading={isLoading}
        >
          Save
        </Button> */}
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text>Autoref Configuration Saved !</Text>
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
  row: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
});

export default AutorefConfiguration;
