import { View, Text } from "react-native";
import CustomDropdown from "../utils/CustomDropdown";
import { BLANK_DROPDOWN_MODEL } from "@/constants/BlankModels";
import { useCallback, useState } from "react";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { Button } from "react-native-paper";
import {
  getSchoolsDropdownFromDB,
  preparePSDataSync,
} from "@/database/database";
import { useSQLiteContext } from "expo-sqlite";
import { useFocusEffect } from "@react-navigation/native";
import { syncPSData } from "@/http/data-sync-http";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Dialog, Portal, PaperProvider } from "react-native-paper";
import AppButton from "../new_UI/AppButton";

const PrimaryDataSync = () => {
  const db = useSQLiteContext();
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state: RootState) => state.userSlice.token);
  const [schoolItems, setSchoolItems] = useState<DropdownModel[]>([]);
  const [selectedSchool, setSelectedSchool] = useState(BLANK_DROPDOWN_MODEL);
  const [diaglogMessage, setDialogMessage] = useState("");

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

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

  const syncPrimaryScreeningHandler = async () => {
    setIsLoading(true);
    const response = await preparePSDataSync(db, selectedSchool.id);
    const syncResponse = await syncPSData(token, response);
    if (syncResponse.isError) {
      setDialogMessage(syncResponse.data);
      showDialog();
    } else {
      showDialog();
      setDialogMessage(syncResponse.data);
    }
    setIsLoading(false);
  };

  const getSchools = async () => {
    const response = await getSchoolsDropdownFromDB(db);
    if (response) {
      setSchoolItems(response);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getSchools();
      return () => {};
    }, [])
  );

  return (
    <View>
      <View>
        <CustomDropdown
          label="School"
          items={[BLANK_DROPDOWN_MODEL, ...schoolItems]}
          selectedItem={selectedSchool}
          onChange={selectSchoolHandler}
        />
      </View>
      <View style={{ marginTop: 10, padding: 10 }}>
        {/* <Button
          mode="contained"
          onPress={syncPrimaryScreeningHandler}
          loading={isLoading}
          style={{
            paddingVertical: 5,
            borderRadius: 30,

            width: "100%",
          }}
        >
          Sync Data
        </Button> */}
        <AppButton
          title="Sync Data"
          onPress={syncPrimaryScreeningHandler}
          loading={isLoading}
          disabled={isLoading}
        />
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
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

export default PrimaryDataSync;
