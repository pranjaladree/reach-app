import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

interface Props {
  activeTab: string;
  items: string[];
  onPress: (item: string) => void;
}

const CustomTabs = ({ activeTab, items, onPress }: Props) => {
  return (
    <View style={styles.row}>
      {items.map((item) => (
        <View style={styles.tabRow} key={item}>
          <TouchableOpacity
            style={[styles.tab, activeTab === item && styles.activeTab]}
            onPress={() => {
              onPress(item);
            }}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === item && styles.activeTabText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f5f9",
    padding: 16,
  },
  row: {
    flexDirection: "row",
  },
  tabRow: {
    flexDirection: "row",
    borderWidth: 1,
    flexBasis: 1,
    flexGrow: 1,
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
});

export default CustomTabs;
