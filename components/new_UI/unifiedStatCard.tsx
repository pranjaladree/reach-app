import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface StatItem {
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  value: number;
}

interface Props {
  totalSchoolCount: number;
  psSchoolCount: number;
  cSSchoolCount: number;
  studentCount: number;
  unsyncedPsCount: number;
  unsyncedMRTagCount: number;
}

const UnifiedStatCard: React.FC<Props> = ({
  totalSchoolCount,
  psSchoolCount,
  cSSchoolCount,
  studentCount,
  unsyncedPsCount,
  unsyncedMRTagCount,
}) => {
  const stats: StatItem[] = [
    {
      iconName: "warehouse",
      title: "Number of Schools",
      value: totalSchoolCount,
    },
    {
      iconName: "school",
      title: "Schools Prepared for Primary Screening",
      value: psSchoolCount,
    },
    {
      iconName: "home-analytics",
      title: "Schools Prepared for Comprehensive Screening",
      value: cSSchoolCount,
    },
    {
      iconName: "account-group-outline",
      title: "Number of Students",
      value: studentCount,
    },
    {
      iconName: "account-search-outline",
      title: "Un-synced Primary Screening",
      value: unsyncedPsCount,
    },
    {
      iconName: "tag-arrow-down-outline",
      title: "Un-synced MR Tag",
      value: unsyncedMRTagCount,
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>
        {stats.map((item, index) => (
          <View key={index} style={styles.statRow}>
            <MaterialCommunityIcons
              name={item.iconName}
              size={24}
              color="#4F46E5"
              style={styles.icon}
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    marginRight: 12,
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  value: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
});

export default UnifiedStatCard;
