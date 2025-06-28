import React, { useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";

import StudentList from "@/components/new_UI/stuent-list/student-list";
import { Feather, Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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

const StudentListScreen = () => {
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
        pageTitle="Student Booking"
        onStudentSelect={handleStudentSelect}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.dialogCard}>
            {/* <Text style={styles.studentName}>{selectedStudent?.name}</Text>
            <Text style={styles.studentPhone}>{selectedStudent?.phone}</Text>
            <Text style={styles.classText}>
              {selectedStudent?.class} {selectedStudent?.section}
            </Text> */}
            <Text style={{ paddingTop: 20 }}>Student ID </Text>
            <TextInput
              placeholder="Student Id"
              value={frameModel}
              onChangeText={setFrameModel}
              style={styles.input}
            />
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",

                width: "100%",
                justifyContent: "space-between",
                marginRight: 10,
              }}
            >
              <TouchableOpacity
                style={styles.searchButton}
                onPress={handleBookNow}
              >
                <Ionicons name="qr-code" size={24} color="white" />
                <Text style={{ color: "#fff", textAlign: "center" }}>
                  Scan QR
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.searchButton}
                onPress={handleBookNow}
              >
                <Feather name="check-circle" size={20} color="#e2e3e5" />
                <Text style={{ color: "#fff", textAlign: "center" }}>
                  Search by ID
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </StudentList>
    </PaperProvider>
  );
};

export default StudentListScreen;

const styles = StyleSheet.create({
  studentName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  studentPhone: {
    fontSize: 13,
    color: "#555",
  },
  classText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222",
  },

  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#0047AB",
    borderWidth: 1,
    borderRadius: 8,
  },
  dialogCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "90%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#0047AB",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 40,
  },
  searchButton: {
    width: "45%",
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
