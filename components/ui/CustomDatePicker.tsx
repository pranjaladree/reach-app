import { DropdownModel } from "@/models/ui/DropdownModel";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface Props {
  items: DropdownModel[];
  selectedItem: DropdownModel;
  onSelect: (val: string) => void;
}

const CustomDatePicker = ({ items, selectedItem, onSelect }: Props) => {
  console.log("Selected Item", selectedItem);
  return (
    <View style={styles.dropdown}>
      <Picker
        selectedValue={selectedItem.id}
        onValueChange={onSelect}
        mode="dropdown"
      >
        {items.map((item) => (
          <Picker.Item key={item.id} label={item.label} value={item.id} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
  },
});

export default CustomDatePicker;
