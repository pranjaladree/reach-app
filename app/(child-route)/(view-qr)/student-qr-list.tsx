import StudentList from "@/components/new_UI/stuent-list/student-list";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

export interface Student {
  id: string;
  name: string;
  phone: string;
  class: string;
  section: string;
  booked: boolean;
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "John Doe",
    phone: "1234567890",
    class: "10",
    section: "A",
    booked: false,
  },
  {
    id: "2",
    name: "Jane Smith",
    phone: "9876543210",
    class: "9",
    section: "B",
    booked: true,
  },
];

const ViewQRstudent = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [frameModel, setFrameModel] = useState("");

  const handleBookNow = () => {
    console.log("Booked:", selectedStudent, "Frame Model:", frameModel);
    setModalVisible(false);
    setFrameModel("");
  };

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
    setModalVisible(true);
  };

  return (
    <PaperProvider>
      <StudentList
        students={mockStudents}
        pageTitle="View QR Code"
        onStudentSelect={handleStudentSelect}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        icons={<MaterialIcons name="qr-code" size={44} color="black" />}
      >
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <Pressable
            style={styles.modalContainer}
            onPress={() => setModalVisible(false)}
          >
            <Pressable
              onPress={(e) => e.stopPropagation()}
              style={{ width: "100%", padding: 20, alignItems: "center" }}
            >
              <View style={styles.dialogCard}>
                <Image
                  source={require("@/assets/images/QR_code.png")}
                  style={{ width: 200, height: 200, alignSelf: "center" }}
                />
                <Text style={styles.studentId}>STUDENT ID: AS-01-002-27</Text>
                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    style={styles.searchButton}
                    onPress={handleBookNow}
                  >
                    <Feather name="printer" size={24} color="white" />
                    <Text style={{ color: "#fff", textAlign: "center" }}>
                      Print QR
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      </StudentList>
    </PaperProvider>
  );
};

export default ViewQRstudent;

const styles = StyleSheet.create({
  studentId: {
    // paddingTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#004aad",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "90%",
  },
  searchButton: {
    width: "50%",
    marginTop: 16,
    borderRadius: 6,
    height: 50,
    paddingVertical: 0,
    backgroundColor: "#0047AB",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
});
