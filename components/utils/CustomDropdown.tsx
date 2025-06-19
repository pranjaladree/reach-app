import { DropdownModel } from "@/models/ui/DropdownModel";
import React from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-paper-dropdown";

interface Props {
  label: string;
  items: DropdownModel[];
  selectedItem: DropdownModel;
  onChange: (val?: string) => void;
  disabled?: boolean;
}

const CustomDropdown = ({
  label,
  items,
  selectedItem,
  onChange,
  disabled,
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
    </View>
  );
};

export default CustomDropdown;
