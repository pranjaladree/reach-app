import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function HeaderTitle({ title }: { title: string }) {
  return (
    <View>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 18,
    padding: 5,
    paddingHorizontal: 12,
    fontWeight: "bold",
  },
});
