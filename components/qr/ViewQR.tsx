import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";

interface Props {
  item: any;
}

const ViewQR = ({ item }: Props) => {
  const db = useSQLiteContext();
  const [studentData, setStudentData] = useState<any>();
  const [qrData, setQrData] = useState<any>();

  useEffect(() => {
    setQrData({
      id: studentData?.studentId,
      tempId: studentData?.tempId,
      firstName: studentData?.firstName,
    });
  }, [studentData]);

  const getStudentDataHandler = async () => {
    const response: any = await db.getFirstAsync(
      `SELECT * FROM students WHERE id=${item.studentId}`
    );
    console.log("RESPONSE", response);
    if (response) {
      setStudentData(response);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getStudentDataHandler();
      return () => {
        console.log("Screen unfocused");
      };
    }, [item])
  );

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
