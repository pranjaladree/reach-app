import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

type StepStatus = "completed" | "current" | "upcoming" | "failed";

interface Step {
  title: string;
  status: StepStatus;
  stepNumber: number;
}

interface Props {
  steps: Step[];
}

const Stepper: React.FC<Props> = ({ steps }) => {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <View key={index} style={styles.stepContainer}>
            <View style={styles.leftColumn}>
              {/* Top connector */}
              {index !== 0 && (
                <View
                  style={[
                    styles.verticalLine,
                    getLineColor(steps[index - 1].status),
                  ]}
                />
              )}

              {/* Step circle */}
              <View style={[styles.circle, getCircleStyle(step.status)]}>
                {step.status === "completed" ? (
                  <Text style={styles.icon}>✓</Text>
                ) : step.status === "current" ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : step.status === "failed" ? (
                  <Text style={styles.icon}>✗</Text>
                ) : (
                  <Text style={[styles.icon, { color: "#aaa" }]}>○</Text>
                )}
              </View>

              {/* Bottom connector */}
              {!isLast && (
                <View
                  style={[styles.verticalLine, getLineColor(step.status)]}
                />
              )}
            </View>

            {/* Step details */}
            <View style={styles.rightColumn}>
              <Text style={styles.stepNumber}>STEP {step.stepNumber}</Text>
              <Text style={[styles.title]}>{step.title}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Stepper;

// Utility Functions
const getCircleStyle = (status: StepStatus) => {
  switch (status) {
    case "completed":
      return { backgroundColor: "#4CAF50", borderColor: "#4CAF50" };
    case "current":
      return { backgroundColor: "#3B82F6", borderColor: "#3B82F6" };
    case "failed":
      return { backgroundColor: "#EF4444", borderColor: "#EF4444" };
    default:
      return { backgroundColor: "#E0E0E0", borderColor: "#BDBDBD" };
  }
};

const getLineColor = (status: StepStatus) => {
  switch (status) {
    case "completed":
      return { backgroundColor: "#4CAF50" };
    case "current":
      return { backgroundColor: "#3B82F6" };
    case "failed":
      return { backgroundColor: "#EF4444" };
    default:
      return { backgroundColor: "#BDBDBD" };
  }
};

const getTextStyle = (status: StepStatus) => {
  switch (status) {
    case "completed":
    case "current":
      return { color: "#000", fontWeight: "bold" };
    case "failed":
      return { color: "#EF4444", fontWeight: "bold" };
    default:
      return { color: "#999" };
  }
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  stepContainer: {
    flexDirection: "row",
    marginBottom: 0,
  },
  leftColumn: {
    alignItems: "center",
    width: 40,
  },
  rightColumn: {
    marginLeft: 16,
    justifyContent: "center",
  },
  verticalLine: {
    width: 2,
    height: 16,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  icon: {
    color: "#fff",
    fontSize: 14,
  },
  stepNumber: {
    fontSize: 12,
    color: "#aaa",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
  },
});
