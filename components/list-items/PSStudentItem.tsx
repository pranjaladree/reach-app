import { View, Text, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";

interface Props {
  item: any;
  onPress: () => void;
}

const PSStudentItem = ({ item, onPress }: Props) => {
  let itemStyle = styles.notDone;
  if (item.psStatus == "REFER") {
    itemStyle = styles.refer;
  }
  if (item.psStatus == "ADVISE") {
    itemStyle = styles.advice;
  }
  if (item.psStatus == "NORMAL") {
    itemStyle = styles.normal;
  }

  return (
    <Pressable onPress={onPress} style={styles.item}>
      <View style={styles.card}>
        <View style={styles.section}>
          <Text style={[itemStyle, styles.name]}>{`${item.firstName}  ${
            item.middleName ? item.middleName : ""
          }  ${item.lastName ? item.lastName : ""}`}</Text>
          <Text style={itemStyle}>{item.contactNo}</Text>
        </View>
        <View style={styles.section}>
          <Text style={itemStyle}>
            {item.title} / {item.section}
          </Text>
          <Text style={itemStyle}>
            {item.gender} / {item.age}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={itemStyle}>{item.tempId}</Text>
        </View>
        <View style={styles.sectionIcon}>
          {!item.psStatus ? (
            <Ionicons name="close-circle" size={40} style={itemStyle} />
          ) : (
            <Ionicons
              name="checkmark-done-outline"
              size={40}
              style={itemStyle}
            />
          )}
          {item.isMarkedForQc && item.psStatus ? (
            <Text style={itemStyle}>QC</Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    width: "100%",
    flexDirection: "row",
  },
  name: {
    textTransform: "uppercase",
  },
  notDone: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  section: {
    width: "30%",
  },
  sectionIcon: {
    width: "10%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  refer: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  advice: {
    color: "blue",
    fontSize: 16,
    fontWeight: "bold",
  },
  normal: {
    color: "green",
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 20,
    margin: 5,
    flexDirection: "row",
    borderRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.primary,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default PSStudentItem;
