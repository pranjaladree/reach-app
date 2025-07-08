import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export type DropdownItem = {
  label: string;
  value: string;
};

type Props = {
  label?: string;
  items: DropdownItem[];
  selectedItem: DropdownItem;
  onChange: (val?: string) => void;
  required?: boolean;
  isError?: boolean;
  errorMessage?: string;
};

const StyledDropdown: React.FC<Props> = ({
  label,
  items,
  selectedItem,
  onChange,
  required,
  isError,
  errorMessage,
}) => {
  return (
    <>
      <View style={styles.container}>
        {label && (
          <Text style={styles.label}>
            {label}{" "}
            {required ? (
              <Text style={{ color: "red", fontWeight: "bold" }}>*</Text>
            ) : null}
          </Text>
        )}

        <Dropdown
          data={items}
          labelField="label"
          valueField="value"
          value={selectedItem.value}
          onChange={(item) => onChange(item.value)}
          style={styles.dropdown}
          placeholderStyle={styles.placeholder}
          selectedTextStyle={styles.selectedText}
          itemTextStyle={styles.itemText}
          containerStyle={styles.dropdownContainer}
          iconStyle={styles.iconStyle}
          keyboardAvoiding
          autoScroll
          renderRightIcon={() => (
            <MaterialIcons name="arrow-drop-down" size={24} color="#000" />
          )}
          placeholder="Select"
        />
      </View>
      {isError && (
        <View>
          <Text style={{ color: "red" }}>{errorMessage}</Text>
        </View>
      )}
    </>
  );
};

export default StyledDropdown;

const styles = StyleSheet.create({
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
    height: 48,
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
