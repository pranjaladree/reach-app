import { View, Text, StyleSheet } from "react-native";
import CustomNegativeButton from "../utils/CustomNegativeButton";

interface Props {
  onClose: () => void;
  item: any;
}

const ViewLastResult = ({ onClose, item }: Props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Last Screening Result</Text>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.box}>
          <Text style={styles.label}>PS Status </Text>
          <Text style={styles.value}>: {item.lastPSStatus}</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.label}>Reason For Referral </Text>
          <Text>: {item.lastReasonForReferral}</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.label}>Reported At </Text>
          <Text>: {item.lastReportDate}</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.label}>Reported Date </Text>
          <Text>: {item.lastReportDate}</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.label}>Spectacle Status </Text>
          <Text>: {item.lastSpectacleStatus}</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.label}>Surgery Done </Text>
          <Text>: {item.lastAnySurgeryDone}</Text>
        </View>
        <View style={styles.actions}>
          <View style={{ width: 120 }}>
            <CustomNegativeButton title="Close" onPress={onClose} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    borderWidth: 1,
    padding: 20,
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    minWidth: 300,
  },
  header: {
    width: "100%",
    padding: 10,
    alignItems: "center",
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 0.3,
  },
  box: {
    padding: 10,
    flexDirection: "row",
  },
  label: {
    width: "40%",
  },
  value: {
    width: "60%",
  },
});

export default ViewLastResult;
