import { DropdownModel } from "@/models/ui/DropdownModel";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";
import { Dropdown } from "react-native-paper-dropdown";

interface Props {
  label: string;
  items: DropdownModel[];
  selectedItem: DropdownModel;
  onChange: (val?: string) => void;
  disabled?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

const CustomDropdown = ({
  label,
  items,
  selectedItem,
  onChange,
  disabled,
  isError,
  errorMessage,
}: Props) => {
  console.log("Items", items);
  return (
    <View style={{ padding: 16 }}>
      <Dropdown
        label={label}
        placeholder={`Enter ${label}`}
        options={items}
        value={selectedItem.value}
        onSelect={onChange}
        disabled={disabled}
      />
      {isError && (
        <View>
          <Text style={{ color: "red" }}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

export default CustomDropdown;
