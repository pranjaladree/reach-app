import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const SCREEN_HEIGHT = Dimensions.get("window").height;

type Option = { label: string; value: string };

const optionsYesNo: Option[] = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const odOptions: Option[] = [
  { label: "6/6", value: "6/6" },
  { label: "6/12", value: "6/12" },
  { label: "6/18", value: "6/18" },
];

const osOptions: Option[] = [
  { label: "6/6", value: "6/6" },
  { label: "6/12", value: "6/12" },
  { label: "6/18", value: "6/18" },
];

type Props = {
  visible: boolean;
  onClose: () => void;
};

const PrimaryScreeningBottomSheet: React.FC<Props> = ({ visible, onClose }) => {
  const [spectacleUse, setSpectacleUse] = useState<string>("yes");
  const [visionTestAble, setVisionTestAble] = useState<string>("yes");
  const [od, setOd] = useState<string>("");
  const [os, setOs] = useState<string>("");
  const [isNormal, setIsNormal] = useState<boolean>(false);

  const handleUpdateStudent = () => {
    // Handle update student logic here
    router.push("/(child-route)/(add-student)/add-student");
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={styles.overlay}
      >
        <TouchableWithoutFeedback>
          <View style={styles.bottomSheet}>
            <ScrollView
              style={styles.contentContainer}
              contentContainerStyle={{ paddingBottom: 100 }}
              showsVerticalScrollIndicator={false}
            >
              {/* Normal Checkbox */}
              <View
                style={{
                  marginBottom: 20,
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 10,
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() => setIsNormal(!isNormal)}
                >
                  <View style={styles.checkboxBox}>
                    {isNormal && <View style={styles.checkboxTick} />}
                  </View>
                  <Text style={styles.checkboxLabel}>Normal</Text>
                </TouchableOpacity>
              </View>

              {/* Spectacles Status */}
              <Text style={styles.sectionTitle}>Spectacles Status</Text>
              <Text style={styles.fieldLabel}>
                Do you use spectacle? <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.radioRow}>
                {optionsYesNo.map((opt) => (
                  <TouchableOpacity
                    key={opt.value}
                    onPress={() => setSpectacleUse(opt.value)}
                    style={styles.radioBtn}
                  >
                    <View style={styles.radioCircle}>
                      {spectacleUse === opt.value && (
                        <View style={styles.radioDot} />
                      )}
                    </View>
                    <Text>{opt.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Vision Status */}
              <Text style={styles.sectionTitle}>Vision Status</Text>
              <Text style={styles.fieldLabel}>
                Unable to perform vision test?{" "}
                <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.radioRow}>
                {optionsYesNo.map((opt) => (
                  <TouchableOpacity
                    key={opt.value}
                    onPress={() => setVisionTestAble(opt.value)}
                    style={styles.radioBtn}
                  >
                    <View style={styles.radioCircle}>
                      {visionTestAble === opt.value && (
                        <View style={styles.radioDot} />
                      )}
                    </View>
                    <Text>{opt.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Can read logmar */}
              <Text style={styles.sectionTitle}>
                Can Read LogMar 0.2 with Spectacle?{" "}
                <Text style={styles.required}>*</Text>
              </Text>

              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <TouchableOpacity style={styles.ocularCheckButton}>
                  <Text style={styles.ocularCheckText}>Ocular Check</Text>
                </TouchableOpacity>
              </View>

              {/* Dropdown + OcularCheck */}
              <View style={styles.dropdownRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.fieldLabel}>OD (Right Eye)</Text>
                  <Dropdown
                    style={styles.dropdown}
                    data={odOptions}
                    labelField="label"
                    valueField="value"
                    placeholder="OD(RE)"
                    value={od}
                    onChange={(item) => setOd(item.value)}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.fieldLabel}>OS (Left Eye)</Text>
                  <Dropdown
                    style={styles.dropdown}
                    data={osOptions}
                    labelField="label"
                    valueField="value"
                    placeholder="OS(LE)"
                    value={os}
                    onChange={(item) => setOs(item.value)}
                  />
                </View>
              </View>
            </ScrollView>

            {/* Fixed Bottom Buttons */}
            <View style={styles.fixedButtons}>
              <TouchableOpacity
                style={styles.updateBtn}
                onPress={handleUpdateStudent}
              >
                <Ionicons
                  name="person-circle-outline"
                  size={24}
                  color="white"
                />
                <Text style={styles.btnText}>Update Student</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.updateBtn}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={24}
                  color="white"
                />
                <Text style={styles.btnText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default PrimaryScreeningBottomSheet;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: SCREEN_HEIGHT * 0.9,
  },
  contentContainer: {
    flex: 1,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
    gap: 10,
    // width: "100%",
    justifyContent: "flex-start",
  },
  checkboxBox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxTick: {
    width: 10,
    height: 10,
    backgroundColor: "#0047AB",
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  sectionTitle: {
    fontWeight: "400",
    color: "#0047AB",
    marginTop: 10,
    // marginBottom: 7,
    fontSize: 18,
    borderBottomWidth: 2,
    borderBottomColor: "#8599ba",
    paddingBottom: 4,
    marginBottom: 3,
  },
  fieldLabel: {
    fontSize: 14,
    color: "#000",

    marginBottom: 10,
  },
  required: {
    color: "red",
  },
  radioRow: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 10,
  },
  radioBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  radioCircle: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#0047AB",
    alignItems: "center",
    justifyContent: "center",
  },
  radioDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "#0047AB",
  },
  dropdownRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginVertical: 10,
  },
  dropdown: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#0047AB",
    borderRadius: 4,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  ocularCheckButton: {
    backgroundColor: "#0047AB",
    borderRadius: 4,
    paddingHorizontal: 15,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  ocularCheckText: {
    color: "#fff",
    fontWeight: "600",
  },
  fixedButtons: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  updateBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#0047AB",
    paddingVertical: 12,
    borderRadius: 6,
    marginRight: 10,
    alignItems: "center",
  },
  checkoutBtn: {
    flex: 1,
    backgroundColor: "#0047AB",
    paddingVertical: 12,
    borderRadius: 6,
    marginLeft: 10,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
