import { DropdownModel } from "@/models/ui/DropdownModel";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface Props {
  label: string;
  items: DropdownModel[];
  selectedItem: DropdownModel;
  onChange: (val?: string) => void;
  disabled?: boolean;
  isError?: boolean;
  errorMessage?: string;
  style?: StyleProp<ViewStyle>;
}

const CustomDropdown = ({
  label,
  items,
  selectedItem,
  onChange,
  disabled,
  isError,
  errorMessage,
  style,
}: Props) => {
  console.log("Items", items);
  return (
    <View style={[styles.containerPadding, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      {/* <Dropdown
        label={label}
        placeholder={`Enter ${label}`}
        options={items}
        value={selectedItem.value}
        onSelect={onChange}
        disabled={disabled}
      /> */}

      <Dropdown
        data={items}
        labelField="label"
        disable={disabled}
        valueField="value"
        value={selectedItem.value}
        onChange={(item) => onChange(item.value)}
        style={styles.dropdown}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.selectedText}
        itemTextStyle={styles.itemText}
        containerStyle={styles.dropdownContainer}
        iconStyle={styles.iconStyle}
        renderRightIcon={() => (
          <MaterialIcons name="arrow-drop-down" size={24} color="#000" />
        )}
        placeholder="Select"
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

const styles = StyleSheet.create({
  containerPadding: {
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 20,
  },
  container: {
    marginBottom: 15,
    zIndex: 10,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    color: "#000",
  },
  dropdown: {
    height: "100%",
    borderColor: "#004aad",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  placeholder: {
    color: "#888",
    fontSize: 16,
  },
  selectedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  itemText: {
    fontSize: 16,
    color: "#000",
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  dropdownContainer: {
    borderRadius: 6,
  },
});
