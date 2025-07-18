import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import CustomButton from "@/components/utils/CustomButton";
import { findStudentById } from "@/database/database";

const ViewQR = () => {
  const db = useSQLiteContext();
  const [studentData, setStudentData] = useState<any>();
  const { studentId } = useLocalSearchParams();
  console.log("STUDENT ID ((((((", studentId);
  const [qrData, setQrData] = useState<any>();

  // useEffect(() => {
  //   setQrData({
  //     id: studentData?.studentId,
  //     tempId: studentData?.tempId,
  //     firstName: studentData?.firstName,
  //   });
  // }, [studentData]);

  const getStudentDataHandler = async () => {
    console.log("GETING STUDENTS $$$$$$$$$$$$$$$");
    // const response: any = await findStudentById(db, studentId);
    // console.log("RESPONSE *******", response);
    try {
      const response: any = await db.getFirstAsync(
        `SELECT s.id,s.tempId,s.firstName,s.middleName,s.lastName,s.classId,cl.title,s.section,s.schoolId,sc.psStatus,sc.referralReason FROM students s JOIN classes cl ON s.classId = cl.id JOIN screenings sc ON sc.studentId = s.id WHERE s.id ="${studentId}"`
      );
      console.log("STUDENT ********************", response);
      if (response) {
        setQrData({
          id: response.id,
          studentId: response.tempId,
          firstName: response.firstName,
          middleName: response.middleName,
          lastName: response.lastName,
          classId: response.classId,
          class: response.title,
          section: response.section,
          psStatus: response.psStatus,
          referralReason: response.referralReason,
          schoolId: response.schoolId,
        });
      }
    } catch (err) {
      console.log(err);
    }
    // const response: any = await db.getFirstAsync(
    //   `SELECT * FROM students WHERE id=${studentId}`
    // );
    // console.log("RESPONSE", response);
    // if (response) {
    //   setStudentData(response);
    // }
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
    <View style={styles.screen}>
      <View style={styles.qrBox}>
        <QRCode value={JSON.stringify(qrData)} size={300} />
      </View>
      <View style={styles.action}>
        <View style={styles.actionItem}>
          <CustomButton title="Print QR" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  qrBox: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  action: {
    width: 300,
    marginTop: 50,
    flexDirection: "row",
  },
  actionItem: {
    flex: 1,
    padding: 5,
  },
});

export default ViewQR;
