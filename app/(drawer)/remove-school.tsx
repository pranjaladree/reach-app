import StyledDropdown from "@/components/new_UI/StyledDropdown";
import CustomButton from "@/components/utils/CustomButton";
import { BLANK_DROPDOWN_MODEL } from "@/constants/BlankModels";
import {
  findSchoolDropdowns,
  removeSchool,
} from "@/database/school-student-db";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { View, Text } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";

const RemoveSchool = () => {
  const db = useSQLiteContext();
  const [isLoading, setIsLoading] = useState(false);
  const [schoolItems, setSchoolItems] = useState<DropdownModel[]>([]);

  const [diaglogMessage, setDialogMessage] = useState("");

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const [selectedSchool, setSelectedSchool] = useState(BLANK_DROPDOWN_MODEL);

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

  const removeSchoolHandler = async () => {
    const response: any = await removeSchool(db, selectedSchool.id);
    if (response) {
      showDialog();
      setDialogMessage("School Removed !");
    }
    console.log("Response", response);
  };

  const getSchoolsHandler = async () => {
    setIsLoading(true);
    const response = await findSchoolDropdowns(db);
    if (response) {
      setSchoolItems(response);
    }
    setIsLoading(false);
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
      <View>
        <CustomButton
          title="Remove"
          onPress={removeSchoolHandler}
          isLoading={isLoading}
        />
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>REACHLite</Dialog.Title>
          <Dialog.Content>
            <Text>School removed !</Text>
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

export default RemoveSchool;
