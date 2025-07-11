import { saveNewStudent } from "@/database/database";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dialog, Portal } from "react-native-paper";
import { Button } from "react-native-paper";
import CustomButton from "../utils/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";

interface Props {
  onClose: () => void;
}

export default function ReadStudent({ onClose }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanningData, setScanningData] = useState<any>();
  const [studentId, setStudentId] = useState("");

  console.log("SCS", scanningData?.studentId);

  const [visible, setVisible] = useState(false);
  const db = useSQLiteContext();

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const [isScanned, setIsScanned] = useState(false);

  const barCodeDataChangeHandler = (scanningResult: BarcodeScanningResult) => {
    if (scanningResult.raw) {
      showDialog();
      console.log("RAAAA&&&&&&&", scanningResult.raw);
      setScanningData(scanningResult.raw);
      setIsScanned(true);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (scanningData) {
        setStudentId(scanningData.studentId);
      }
      return () => {
        console.log("Screen unfocused");
      };
    }, [scanningData])
  );

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission}>grant permission</Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isScanned == false ? (
        <CameraView
          style={styles.camera}
          onBarcodeScanned={barCodeDataChangeHandler}
        ></CameraView>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <View style={{ borderWidth: 1, padding: 20, minWidth: 200 }}>
            <Text>Student ID : {studentId}</Text>
            <Text>Class : {scanningData?.class}</Text>
          </View>
          <View style={{ width: 200, marginTop: 20 }}>
            <Button mode="contained" onPress={onClose}>
              Close
            </Button>
            <CustomButton
              title="Save"
              onPress={() => {}}
              icon={
                <Ionicons
                  name="checkmark-circle-outline"
                  size={20}
                  color="white"
                />
              }
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
