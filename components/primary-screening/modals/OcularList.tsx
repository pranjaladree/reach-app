import { OcularModel } from "@/models/other-masters/OcularModel";
import { View, Text, StyleSheet } from "react-native";
import { Button, Checkbox } from "react-native-paper";

interface Props {
  ocularTypes: OcularModel[];
  onChange: (item: OcularModel) => void;
  onClose: () => void;
}

const OcularList = ({ ocularTypes, onChange, onClose }: Props) => {
  return (
    <View style={styles.box}>
      {ocularTypes.map((item: OcularModel) => (
        <View key={item.id} style={styles.row}>
          <Checkbox
            status={item.isSelected ? "checked" : "unchecked"}
            onPress={() => {
              onChange(item);
            }}
          />
          <Text>{item.ocularName}</Text>
        </View>
      ))}
      <View style={styles.row}>
        <View style={styles.rowItem}>
          <Button onPress={onClose} mode="contained">
            Close
          </Button>
        </View>

        <View style={styles.rowItem}>
          <Button onPress={onClose} mode="contained">
            Save
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    margin: 10,
    padding: 10,
    backgroundColor: "white",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    borderWidth: 0.3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowItem: {
    padding: 5,
    flexBasis: 1,
    flexGrow: 1,
  },
});

export default OcularList;
