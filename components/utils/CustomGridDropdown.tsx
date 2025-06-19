import { DropdownModel } from "@/models/ui/DropdownModel";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import GridItem from "../list-items/GridItem";
import { GridDropdownModel } from "@/models/ui/GridDropdownModel";
import { Modal, Portal } from "react-native-paper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVisualAcuity } from "@/store/slices/visual-acuity-slice";

interface Props {
  label: string;
  items: GridDropdownModel[];
  onSelect: (item: GridDropdownModel) => void;
  selectedItem: string;
}

const CustomGridDropdown = ({
  label,
  items,
  onSelect,
  selectedItem,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    margin: 5,
  };

  const onChangeHandler = (item: GridDropdownModel) => {
    onSelect(item);
    setIsModalOpen(false);
  };

  return (
    <View>
      <View>
        <Text>{label}</Text>
      </View>
      <View style={styles.inputBox}>
        <Pressable
          onPress={() => {
            setIsModalOpen(true);
          }}
        >
          <Text>{selectedItem}</Text>
        </Pressable>
      </View>
      <Portal>
        <Modal
          visible={isModalOpen}
          onDismiss={() => {
            setIsModalOpen(false);
          }}
          contentContainerStyle={containerStyle}
        >
          <View>
            <FlatList
              data={items}
              numColumns={5}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <GridItem
                  item={item}
                  onChange={onChangeHandler.bind(this, item)}
                />
              )}
            />
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    borderWidth: 0.4,
    backgroundColor: "white",
    padding: 10,
  },
});

export default CustomGridDropdown;
