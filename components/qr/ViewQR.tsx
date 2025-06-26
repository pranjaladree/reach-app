import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";

interface Props {
  item: any;
}

const ViewQR = ({ item }: Props) => {
  const [qrData, setQrData] = useState<any>();

  useEffect(() => {
    setQrData({
      id: item.studentId,
    });
  }, [item]);

  return (
    <View style={{ backgroundColor: "white" }}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <QRCode value={JSON.stringify(qrData)} size={200} />

        <View style={{ marginTop: 40, flexDirection: "row" }}>
          <Button mode="outlined">Close</Button>
          <Button mode="outlined">Print QR</Button>
        </View>
      </View>
    </View>
  );
};

export default ViewQR;
