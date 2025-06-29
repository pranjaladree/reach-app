import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

interface Props {
  item: any;
  setIsModalOpen: any;
}

const ViewQR = ({ item, setIsModalOpen }: Props) => {
  const [qrData, setQrData] = useState<any>();

  useEffect(() => {
    setQrData({
      id: item.studentId,
    });
  }, [item]);

  return (
    // <View style={{ backgroundColor: "white" }}>
    //   <View
    //     style={{
    //       flex: 1,
    //       flexDirection: "column",
    //       justifyContent: "center",
    //       alignItems: "center",
    //     }}
    //   >
    //     <QRCode value={JSON.stringify(qrData)} size={200} />

    //     <View style={{ marginTop: 40, flexDirection: "row" }}>
    //       <Button mode="outlined">Close</Button>
    //       <Button mode="outlined">Print QR</Button>
    //     </View>
    //   </View>
    // </View>
    <Pressable
      style={styles.modalContainer}
      onPress={() => setIsModalOpen(false)}
    >
      <Pressable
        onPress={(e) => e.stopPropagation()}
        style={{ width: "100%", padding: 20, alignItems: "center" }}
      >
        <View style={styles.dialogCard}>
          {/* <Image
                source={require("@/assets/images/QR_code.png")}
                style={{ width: 200, height: 200, alignSelf: "center" }}
              /> */}
          <QRCode value={JSON.stringify(qrData)} size={200} />

          {/* <Text style={styles.studentId}>STUDENT ID: AS-01-002-27</Text> */}
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.searchButton}
              // onPress={handleBookNow}
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
  );
};

export default ViewQR;

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
  studentId: {
    // paddingTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#004aad",
    textAlign: "center",
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
