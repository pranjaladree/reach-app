import React from "react";
import { View } from "react-native";
import Stepper from "./steppers"; 

type StatusType = "pending" | "loading" | "success" | "failed";
type UpdateKey =
  | "Classes"
  | "VisionCenters"
  | "Hospitals"
  | "OtherFacilities"
  | "OcularComplaints"
  | "ReachConfigs"
  | "DVAs"
  | "NVAs"
  | "PHs"
  | "SPHs"
  | "ADDs"
  | "AXIS"
  | "CYLs"
  | "LensMaterials"
  | "FrameMaterials";

interface Props {
  status: Record<UpdateKey, StatusType>;
}
type StepStatus = "completed" | "current" | "upcoming" | "failed";

const StatusStepper: React.FC<Props> = ({ status }) => {
  const steps = Object.entries(status).map(([key, value], index) => {
    let stepStatus: StepStatus;

    if (value === "success") stepStatus = "completed";
    else if (value === "loading") stepStatus = "current";
    else if (value === "failed") stepStatus = "failed";
    else stepStatus = "upcoming";

    return {
      title: key,
      status: stepStatus,
      stepNumber: index + 1,
    };
  });

  return (
    <View>
      <Stepper steps={steps} />
    </View>
  );
};

export default StatusStepper;
