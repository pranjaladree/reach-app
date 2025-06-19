import { View, Text, StyleSheet } from "react-native";
import CustomDropdown from "../utils/CustomDropdown";
import { Button, Checkbox } from "react-native-paper";
import { useCallback, useEffect, useState } from "react";
import { BLANK_DROPDOWN_MODEL } from "@/constants/BlankModels";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { useSQLiteContext } from "expo-sqlite";

interface Props {
  schoolItems: DropdownModel[];
  onClose: () => void;
}

const AutorefConfiguration = ({ schoolItems, onClose }: Props) => {
  console.log("SCHOOL ITEMS MMMM", schoolItems);
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
      }
    }
  };

  const [isAutorefAvailable, setIsAutorefAvailable] = useState(false);

  const saveAutorefConfiguration = async () => {
    const response = await db.runAsync(
      `UPDATE schools SET autorefAvailable=${isAutorefAvailable} WHERE id=${selectedSchool.id}`
    );
    if (response) {
    }
    onClose();
  };

  const [items, setItems] = useState<DropdownModel[]>([]);

  useEffect(() => {
    if (schoolItems) {
      console.log("SCHOOLS");
      setItems(schoolItems);
    }
  }, []);

  return (
    <View>
      <View>
        <CustomDropdown
          label="School M"
          items={[BLANK_DROPDOWN_MODEL, ...items]}
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
        <Button
          onPress={saveAutorefConfiguration}
          mode="contained"
          loading={isLoading}
        >
          Save
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});

export default AutorefConfiguration;
