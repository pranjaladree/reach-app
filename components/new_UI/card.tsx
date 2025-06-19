import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type StatCardProps = {
  iconName: string;
  title: string;
  value: string | number;
  percentage?: string;
  changeText?: string;
  isPositive?: boolean;
};

const StatCard: React.FC<StatCardProps> = ({
  iconName,
  title,
  value,
  percentage,
  changeText,
  isPositive,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconWrapper}>
          <Icon name={iconName} size={20} color="#6c63ff" />
        </View>
        <Text style={styles.title}>{title}</Text>
        {/* <Icon
          name="dots-horizontal"
          size={20}
          color="#999"
          style={styles.moreIcon}
        /> */}
      </View>

      <Text style={styles.value}>{value}</Text>

      {/* <View style={styles.changeRow}>
        <Text style={[styles.percent, isPositive ? styles.green : styles.red]}>
          {isPositive ? "↑" : "↓"} {percentage}
        </Text>
        <Text style={styles.changeText}>{changeText}</Text>
      </View> */}
    </View>
  );
};

export default StatCard;
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: "#f3f1ff",
    padding: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    color: "#888",
    flex: 1,
  },
  moreIcon: {
    marginLeft: "auto",
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 12,
    color: "#111",
  },
  changeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  percent: {
    fontWeight: "600",
    marginRight: 6,
  },
  green: {
    color: "#16c784",
  },
  red: {
    color: "#f44336",
  },
  changeText: {
    color: "#888",
    fontSize: 13,
  },
});
