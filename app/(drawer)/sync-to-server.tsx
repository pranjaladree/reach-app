import { DropdownItem } from "@/components/new_UI/StyledDropdown";
import MRTagDataSync from "@/components/sync-to-server/mr-tag-data-sync";
import PrimaryDataSync from "@/components/sync-to-server/primary-data-sync";
import { setLoggedOut } from "@/store/slices/user-slice";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const SyncToServer = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"primary" | "detailed">("primary");

  const handleLogout = async () => {
    console.log("Logging Out....");
    try {
      dispatch(setLoggedOut());

      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("expiry");
      await AsyncStorage.removeItem("OfflineUserInfo");
      console.log(
        "from logged out",
        await AsyncStorage.getItem("OfflineUserInfo")
      );
    } catch (err) {
      console.log(err);
    }
    router.replace("/(auth)/login");
  };
  // schools[0]
  return (
    <View style={{ padding: 16 }}>
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "primary" && styles.activeTab]}
          onPress={() => setActiveTab("primary")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "primary" && styles.activeTabText,
            ]}
          >
            Primary screening Data sync
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "detailed" && styles.activeTab]}
          onPress={() => setActiveTab("detailed")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "detailed" && styles.activeTabText,
            ]}
          >
            Detailed Evaluation Data Sync
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        {activeTab == "primary" && <PrimaryDataSync onLogout={handleLogout} />}
        {activeTab == "detailed" && <MRTagDataSync onLogout={handleLogout} />}
      </View>
    </View>
  );
};

// });

export default SyncToServer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f5f9",
    padding: 16,
  },
  tabRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#004aad",
    // borderRadius: 6,
    overflow: "hidden",
    // marginBottom: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#eaeaea",
    // alignItems: "center",
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  tabText: {
    fontSize: 14,
    textAlign: "center",
    color: "#aaa",
    fontWeight: "bold",
  },
  activeTab: {
    backgroundColor: "#004aad",
    borderBottomWidth: 2,
    borderBottomColor: "#004aad",
  },
  activeTabText: {
    color: "#ffffff",
  },

  card: {
    borderWidth: 1,
    borderColor: "#004aad",
    // borderRadius: 8,
    backgroundColor: "#fff",
    // padding: 16,
    paddingTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 0,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    // borderBlockColor: "#004aad",
    // borderWidth: 1,
  },
  getDataButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#004aad",
    paddingHorizontal: 12,
    // paddingVertical: 10,
    height: 47,
    borderRadius: 6,
  },
  getDataText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "bold",
  },
  summaryText: {
    marginTop: 10,
    fontSize: 14,
    color: "#004aad",
    fontWeight: "700",
  },
  syncButton: {
    marginTop: 20,
    backgroundColor: "#004aad",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  syncText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "bold",
  },
});
