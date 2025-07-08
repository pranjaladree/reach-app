import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import CustomButton from "../utils/CustomButton";

interface Props {
  studentId: string;
  onClose: () => void;
}

const ViewQR = ({ studentId, onClose }: Props) => {
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
      `SELECT * FROM students WHERE id=${studentId}`
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
    }, [studentId])
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
        <View>
          <QRCode value={JSON.stringify(qrData)} size={300} />
        </View>

        <View style={{ marginTop: 40, flexDirection: "row" }}>
          <View style={{ padding: 5 }}>
            <CustomButton title="Close" onPress={onClose} />
          </View>
          <View style={{ padding: 5 }}>
            <CustomButton title="Print QR" onPress={() => {}} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ViewQR;
