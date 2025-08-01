import StyledDropdown from "@/components/new_UI/StyledDropdown";
import CustomButton from "@/components/utils/CustomButton";
import CustomNotification from "@/components/utils/CustomNotification";
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
  const [schoolHasError, setSchoolHasError] = useState(false);
  const [schoolErrorMessage, setSchoolErrorMessage] = useState("");

  const [isNotification, setIsNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [variant, setVariant] = useState("success");

  const openNotificationHandler = () => {
    setIsNotification(true);
  };

  const closeNotificationHandler = () => {
    setIsNotification(false);
  };

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
    setSchoolHasError(false);
    setSchoolErrorMessage("");
  };

  const removeSchoolHandler = async () => {
    if (selectedSchool.id == "0") {
      setSchoolHasError(true);
      setSchoolErrorMessage("Please select School !");
      return;
    }

    //Check If Screening Data Or MR TAG Data Present. If Yes Don't allow to delete

    const response: any = await removeSchool(db, selectedSchool.id);
    if (response) {
      openNotificationHandler();
      setNotificationMessage("School Removed Successfully !");
      setSelectedSchool(BLANK_DROPDOWN_MODEL);
      getSchoolsHandler();
    }
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
      return () => {};
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
          required={true}
          isError={schoolHasError}
          errorMessage={schoolErrorMessage}
        />
      </View>
      <View>
        <CustomButton
          title="Remove"
          onPress={removeSchoolHandler}
          isLoading={isLoading}
        />
      </View>

      {/* Notification */}
      <CustomNotification
        visible={isNotification}
        onClose={closeNotificationHandler}
        message={notificationMessage}
        variant={variant}
      />
    </View>
  );
};

export default RemoveSchool;
