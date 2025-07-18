import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

export type TabItem = {
  title: string;
  disabled: boolean;
  isDone: boolean;
};

interface Props {
  activeTab: string;
  items: TabItem[];
  onPress: (item: TabItem) => void;
}

const CustomTabs = ({ activeTab, items, onPress }: Props) => {
  console.log("KSKkkkkkS&&&&&&&&&&&&&&&&&&&&&&&&&&&", items);
  return (
    <View style={styles.row}>
      {items.map((item) => (
        <View style={styles.tabRow} key={item.title}>
          <TouchableOpacity
            style={[styles.tab, activeTab === item.title && styles.activeTab]}
            onPress={() => {
              if (!item.disabled) {
                onPress(item);
              }
            }}
          >
            <Text
              style={[
                styles.tabText,
                item.isDone && activeTab != item.title
                  ? styles.doneText
                  : activeTab === item.title && styles.activeTabText,
                ,
              ]}
            >
              {item.title}
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
    backgroundColor: "white",
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
  doneText: {
    color: "#04691f",
    fontWeight: "bold",
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
