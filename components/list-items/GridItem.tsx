import { DropdownModel } from "@/models/ui/DropdownModel";
import { GridDropdownModel } from "@/models/ui/GridDropdownModel";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface Props {
  item: GridDropdownModel;
  onChange: () => void;
}

const GridItem = ({ item, onChange }: Props) => {
  return (
    <Pressable onPress={onChange} style={styles.item}>
      <View>
        <Text>{item.title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    width: "100%",
    borderWidth: 0.3,
    flexBasis: 1,
    padding: 10,
    flexGrow: 1,
    textAlign: "center",
  },
});

export default GridItem;
