import AppButton from "@/components/new_UI/AppButton";
import CustomDropdown from "@/components/utils/CustomDropdown";
import { BLANK_DROPDOWN_MODEL } from "@/constants/BlankModels";
import { Colors } from "@/constants/Colors";
import { getSchoolsDropdownFromDB } from "@/database/database";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { Stack, useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Checkbox, Dialog, Portal } from "react-native-paper";

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
    <View style={{paddingVertical: 15}}>
       <Stack.Screen
        options={{
          title: "Autoref Configuration",
          headerShown: true,
        }}
      />
      <View>
        <CustomDropdown
          label="School "
          items={[BLANK_DROPDOWN_MODEL, ...schoolItems]}
          selectedItem={selectedSchool}
          onChange={selectSchoolHandler}
        />
      </View>
      <View style={styles.row}>
        <Checkbox
          color={Colors.primary}
          status={isAutorefAvailable ? "checked" : "unchecked"}
          onPress={() => {
            setIsAutorefAvailable(!isAutorefAvailable);
          }}
        />
        <Text>Autoref Available</Text>
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <AppButton
          title="Save"
          onPress={saveAutorefConfiguration}
          loading={isLoading}
        ></AppButton>
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
