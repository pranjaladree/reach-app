import { Student } from "@/app/(child-route)/(detailsEvalution-list)/details-evalutions-list";
import { Entypo, EvilIcons, Feather } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function StudentList({
  students,
  pageTitle,
  setModalVisible,
  modalVisible,
  icons,
  primaryScanning,

  onStudentSelect,
  children,
}: {
  students: Student[];
  pageTitle?: string;
  onStudentSelect?: (student: Student) => void;
  children?: React.ReactNode;
  setModalVisible: (visible: boolean) => void;
  modalVisible: boolean;
  primaryScanning?: boolean;
  icons?: React.ReactNode;
}) {
  const [searchText, setSearchText] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [frameModel, setFrameModel] = useState("");
  //   const [modalVisible, setModalVisible] = useState(false);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleStudentPress = (student: any) => {
    setSelectedStudent(student);
    onStudentSelect && onStudentSelect(student);
    setModalVisible(true);
  };

  //   console.log("i am model visiable", modalVisible);

  return (
    <>
      <Stack.Screen
        options={{
          title: pageTitle || "Spectacles Booking",
          headerShown: true,
        }}
      />
      <View style={{ flex: 1, padding: 16 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.count}>Total Count : {students.length}</Text>
          {primaryScanning && (
            <>
              <Text style={styles.count}>Done : {students.length}</Text>
              <Text style={styles.count}>Not Done : {students.length}</Text>
            </>
          )}
        </View>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>
            <EvilIcons name="search" size={30} color="#878585" />
          </Text>
          <TextInput
            placeholder="Search Student"
            style={styles.searchInputField}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Student List */}
        <FlatList
          data={filteredStudents}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.studentCard,
                { borderColor: item.booked ? "#007AFF" : "#ccc" },
              ]}
            >
              <View style={styles.cardRow}>
                {/* Column 1 */}
                <View style={styles.col1}>
                  <Text style={styles.studentName}>{item.name}</Text>
                  <Text style={styles.studentPhone}>{item.phone}</Text>
                </View>

                {/* Column 2 */}
                <View style={styles.col2}>
                  <Text style={styles.classText}>{item.class}</Text>
                  <Text style={styles.sectionText}>{item.section}</Text>
                </View>

                {/* Column 3 */}
                <TouchableOpacity
                  style={styles.col3}
                  onPressIn={() => handleStudentPress(item)}
                >
                  <Text style={styles.statusIcon}>
                    {icons ? (
                      icons
                    ) : item.booked ? (
                      <Feather name="check-circle" size={33} color="#004aad" />
                    ) : (
                      <Entypo
                        name="circle-with-cross"
                        size={33}
                        color="#afaaaa"
                      />
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        {/* Modal Dialog */}

        <Modal visible={modalVisible} transparent animationType="slide">
          {children}
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  count: {
    fontWeight: "bold",
    fontSize: 16,
  },

  // Search
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#004aad",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 13,
    backgroundColor: "#fff",
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
    color: "#888",
  },
  searchInputField: {
    flex: 1,
    height: 40,
  },

  // Card Design
  studentCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1.5,
    padding: 12,
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  col1: {
    flex: 1,
    gap: 5,
  },
  col2: {
    flex: 1.2,
    alignItems: "center",
    gap: 5,
  },
  col3: {
    flex: 0.8,
    alignItems: "flex-end",
  },
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
  sectionText: {
    fontSize: 13,
    color: "#444",
  },
  statusIcon: {
    fontSize: 28,
  },

  // Modal
  modalContainer: {
    flex: 1,
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
  input: {
    borderWidth: 1,
    borderColor: "#0047AB",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 40,
  },
  searchButton: {
    width: "50%",
    marginTop: 16,
    borderRadius: 6,
    height: 50,
    paddingVertical: 10,
    backgroundColor: "#0047AB",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
});
