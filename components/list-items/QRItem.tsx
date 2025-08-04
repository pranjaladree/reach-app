import { View, Text, StyleSheet, Pressable } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useEffect, useState } from "react";

interface Props {
  item: any;
  onPress: () => void;
}

const QRItem = ({ item, onPress }: Props) => {
  console.log("Items", item);
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

  const [qrData, setQrData] = useState<any>();

  useEffect(() => {
    setQrData({
      id: item?.studentId,
    });
  }, [item]);

  return (
    <Pressable onPress={onPress} style={styles.item}>
      <View style={styles.card}>
        <View style={styles.section}>
          <Text style={itemStyle}>{item.firstName}</Text>
          <Text style={itemStyle}>{item.tempId}</Text>
        </View>
        <View style={styles.section}>
          <Text style={itemStyle}>
            {item.title} / {item.section}
          </Text>
          <Text style={itemStyle}>
            {item.gender} / {item.age}
          </Text>
        </View>
        <View style={styles.sectionIcon}>
          <QRCode value={JSON.stringify(qrData)} size={80} />
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
  notDone: {
    color: "black",
  },
  refer: {
    color: "red",
  },
  advice: {
    color: "blue",
  },
  normal: {
    color: "green",
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
    margin: 5,
    flexDirection: "row",
    borderRadius: 5,
    elevation: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  section: {
    width: "30%",
  },
  sectionIcon: {
    padding: 5,
    width: "10%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
});

export default QRItem;
