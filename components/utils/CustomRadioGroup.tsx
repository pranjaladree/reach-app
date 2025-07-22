import { Colors } from "@/constants/Colors";
import { RadioItemModel } from "@/models/ui/RadioItemModel";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { RadioButton, Text } from "react-native-paper";

interface Props {
  label: string;
  items: RadioItemModel[];
  selectedOption: string;
  onChange: (val: string) => void;
  isError?: boolean;
  errorMessage?: string;
  showLabel?: boolean;
  disabled?: boolean;
  required?: boolean;
}

const CustomRadioGroup = ({
  label,
  items,
  selectedOption,
  onChange,
  isError,
  errorMessage,
  showLabel,
  disabled,
  required,
}: Props) => {
  return (
    <>
      {showLabel && (
        <View style={styles.labelBox}>
          <Text style={styles.radioLabel}>{label} </Text>
          {required && <Text style={{ color: Colors.error }}>*</Text>}
        </View>
      )}

      <View style={styles.radioGroup}>
        {items.map((val) => (
          <View key={val.id} style={styles.radioItem}>
            <RadioButton
              value={val.value}
              status={selectedOption === val.value ? "checked" : "unchecked"}
              onPress={() => onChange(val.value)}
              color="#0a63c9"
              disabled={disabled}
            />
            <Text>{val.value === "all" ? "All" : val.value}</Text>
          </View>
        ))}
      </View>

      {isError && (
        <View>
          <Text style={{ color: "red" }}>{errorMessage}</Text>
        </View>
      )}

      {/* <Text style={styles.radioLabel}>Gender</Text> */}
    </>
  );
};

export default CustomRadioGroup;
const styles = StyleSheet.create({
  group: {
    flexDirection: "row",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },

  // my style

  container: {
    padding: 16,
    backgroundColor: "#f7f7f7",
    flex: 1,
  },
  labelBox: {
    padding: 5,
  },
  label: {
    fontSize: 14,
    padding: 5,
    color: "#000",
  },

  row: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
    marginBottom: 12,
  },
  rowItem: {
    flex: 1,
  },
  radioLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#000",
  },
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 5,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  searchButton: {
    marginTop: 16,
    borderRadius: 6,
    paddingVertical: 6,
    backgroundColor: "#0047AB",
  },
});
