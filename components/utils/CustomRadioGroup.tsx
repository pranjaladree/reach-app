import { RadioItemModel } from "@/models/ui/RadioItemModel";
import * as React from "react";
import { View, StyleSheet } from "react-native";
import { RadioButton, Text } from "react-native-paper";

interface Props {
  label: string;
  items: RadioItemModel[];
  selectedOption: string;
  onChange: (val: string) => void;
}

const CustomRadioGroup = ({
  label,
  items,
  selectedOption,
  onChange,
}: Props) => {
  return (
    <RadioButton.Group onValueChange={onChange} value={selectedOption}>
      <View style={styles.group}>
        {items.map((item) => (
          <View key={item.id} style={styles.button}>
            <RadioButton value={item.value} />
            <Text>{item.label}</Text>
          </View>
        ))}
      </View>
    </RadioButton.Group>
  );
};

const styles = StyleSheet.create({
  group: {
    flexDirection: "row",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CustomRadioGroup;
