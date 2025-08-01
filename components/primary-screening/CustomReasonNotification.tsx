import { View, Text, StyleSheet } from "react-native";
import { Modal, Portal } from "react-native-paper";
import CustomNegativeButton from "../utils/CustomNegativeButton";
import CustomButton from "../utils/CustomButton";
import { Colors } from "@/constants/Colors";
import CustomSuccessButton from "../utils/CustomSuccessButton";

interface Props {
  visible: boolean;
  onClose: () => void;
  onViewQr: () => void;
  message: string;
  variant: string;
}

const CustomReasonNotification = ({
  visible,
  onClose,
  message,
  variant,
  onViewQr,
}: Props) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <View style={styles.screen}>
          <View
            style={variant == "success" ? styles.header : styles.headerError}
          >
            <Text style={styles.headerTitle}>REACHLite</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.message}>
              <Text>{message}</Text>
            </View>
          </View>
          <View style={styles.action}>
            <View style={styles.actionItem}>
              <CustomButton title="View QR Code" onPress={onViewQr} />
            </View>
            <View style={styles.actionItem}>
              {variant == "success" ? (
                <CustomSuccessButton title="OK" onPress={onClose} />
              ) : (
                <CustomNegativeButton title="OK" onPress={onClose} />
              )}
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: "70%",
    alignSelf: "center",
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: Colors.success,
    padding: 20,
  },
  headerError: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: Colors.error,
    padding: 20,
  },
  headerTitle: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    borderWidth: 0.3,
    borderColor: Colors.primary,
  },
  message: {
    paddingVertical: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  action: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f2f2f2",
  },
  actionItem: {
    width: 100,
    margin: 5,
  },
});

export default CustomReasonNotification;
