import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { useSQLiteContext } from "expo-sqlite";
import { RootState } from "@/store/store";

import {
  saveAllClasses,
  saveVisionCenters,
  saveHospitals,
  saveOtherFacilities,
  saveOcularComplaints,
  saveReachConfigs,
  saveDvas,
  saveNvas,
  savePhs,
  saveSphs,
  saveAdds,
  saveAxis,
  saveCyls,
  saveLensMaterials,
  saveFrameMaterials,
  saveTorchligtFindings,
  saveUsers,
  saveLensTypes,
  saveSpecialityLens,
  saveModesOfWear,
  saveLensSurfaceCoatings,
  saveLensTints,
  saveSpecialInstructions,
  saveReasonForReferrals,
  saveDiagnosisMaster,
} from "@/database/database";
import { getVisionCenters } from "@/http/vision-center-http";
import { getAllHospitals } from "@/http/hospital-http";
import {
  getOtherFacilities,
  searchOtherFacilities,
} from "@/http/other-facility-http";
import { getAllOculars } from "@/http/ocular-complaints-http";
import { getReachConfiguration } from "@/http/reach-configuration-http";
import { getAllDistanceDvas } from "@/http/distance-dva-http";
import { getAllNvas } from "@/http/near-nva-http";
import { getAllPhs } from "@/http/ph-http";
import { getAllSphs } from "@/http/sph-http";
import { getAllAdds } from "@/http/add-http";
import { getAllAxises } from "@/http/axis-http";
import { getAllCyls } from "@/http/cyl-http";
import { getAllLensMaterials } from "@/http/lens-material-http";
import { getAllFrameMaterials } from "@/http/frame-material-http";
import { getAllClasses } from "@/http/class-http";
import AppButton from "@/components/new_UI/AppButton";
import StatusStepper from "@/components/new_UI/statusStaper";
import { getAllTorchLights } from "@/http/torchlight-http";
import { getAllUsers } from "@/http/user-http";
import { getAllLensTypes } from "@/http/lens-type-http";
import { getAllSpecialityLens } from "@/http/speciality-lens-http";
import { getAllModeOfwears } from "@/http/mode-of-wear-http";
import { getAllLensSurfaceCoating } from "@/http/lens-surface-coating-http";
import { getAllLensTint } from "@/http/lens-tint-http";
import { getAllSpecialInstructions } from "@/http/special-instructions-http";
import { getAllReasonForReferrals } from "@/http/reason-for-referral-http";
import { getAllDiagnosis } from "@/http/diagnosis-http";
import CustomButton from "@/components/utils/CustomButton";

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
  | "FrameMaterials"
  | "LensTypes"
  | "SpecialityLens"
  | "ModesOfWears"
  | "LensSurfaceCoating"
  | "LensTints"
  | "SpecialInstructions"
  | "ReasonForReferrals"
  | "DiagnosisMaster"
  | "TorchlightFindings"
  | "Users";

type StatusType = "pending" | "loading" | "success" | "failed";

const SystemUpdate = () => {
  const db = useSQLiteContext();
  const token = useSelector((state: RootState) => state.userSlice.token);
  const partnerId = useSelector(
    (state: RootState) => state.userSlice.partnerId
  );
  const [isLoading, setIsLoading] = useState(false);
  const [visiable, setVisiable] = useState<boolean>(false);
  const [status, setStatus] = useState<Record<UpdateKey, StatusType>>({
    Classes: "pending",
    VisionCenters: "pending",
    Hospitals: "pending",
    OtherFacilities: "pending",
    OcularComplaints: "pending",
    ReachConfigs: "pending",
    DVAs: "pending",
    NVAs: "pending",
    PHs: "pending",
    SPHs: "pending",
    ADDs: "pending",
    AXIS: "pending",
    CYLs: "pending",
    LensMaterials: "pending",
    FrameMaterials: "pending",
    LensTypes: "pending",
    SpecialityLens: "pending",
    ModesOfWears: "pending",
    LensSurfaceCoating: "pending",
    LensTints: "pending",
    SpecialInstructions: "pending",
    ReasonForReferrals: "pending",
    DiagnosisMaster: "pending",
    TorchlightFindings: "pending",
    Users: "pending",
  });

  const updateStatus = (key: UpdateKey, value: StatusType) => {
    setStatus((prev) => ({ ...prev, [key]: value }));
  };

  const handlerMap: Record<UpdateKey, () => Promise<void>> = {
    Classes: async () => {
      updateStatus("Classes", "loading");
      try {
        const res = await getAllClasses(token);
        if (!res?.isError) {
          saveAllClasses(db, res.data);
          updateStatus("Classes", "success");
        } else throw new Error("Classes error");
      } catch {
        updateStatus("Classes", "failed");
      }
    },
    VisionCenters: async () => {
      updateStatus("VisionCenters", "loading");
      try {
        const res = await getVisionCenters(token);
        if (!res?.isError) {
          saveVisionCenters(db, res.data);
          updateStatus("VisionCenters", "success");
        } else throw new Error("Vision Center error");
      } catch {
        updateStatus("VisionCenters", "failed");
      }
    },
    Hospitals: async () => {
      updateStatus("Hospitals", "loading");
      try {
        const res = await getAllHospitals(token);
        if (!res?.isError) {
          saveHospitals(db, res.data);
          updateStatus("Hospitals", "success");
        } else throw new Error("Hospital error");
      } catch {
        updateStatus("Hospitals", "failed");
      }
    },
    OtherFacilities: async () => {
      updateStatus("OtherFacilities", "loading");
      try {
        const res = await searchOtherFacilities(token);
        if (!res?.isError) {
          saveOtherFacilities(db, res.data);
          updateStatus("OtherFacilities", "success");
        } else throw new Error("Facility error");
      } catch {
        updateStatus("OtherFacilities", "failed");
      }
    },
    OcularComplaints: async () => {
      updateStatus("OcularComplaints", "loading");
      try {
        const res = await getAllOculars(token);
        if (!res?.isError) {
          saveOcularComplaints(db, res.data);
          updateStatus("OcularComplaints", "success");
        } else throw new Error("Ocular error");
      } catch {
        updateStatus("OcularComplaints", "failed");
      }
    },
    ReachConfigs: async () => {
      updateStatus("ReachConfigs", "loading");
      try {
        const res = await getReachConfiguration(token, partnerId.toString());
        console.log(
          "CONFIGS ****************************************",
          res.data
        );
        if (!res?.isError) {
          saveReachConfigs(db, res.data);
          updateStatus("ReachConfigs", "success");
        } else throw new Error("Reach error");
      } catch {
        updateStatus("ReachConfigs", "failed");
      }
    },
    DVAs: async () => {
      updateStatus("DVAs", "loading");
      try {
        const res = await getAllDistanceDvas(token);
        if (!res?.isError) {
          saveDvas(db, res.data);
          updateStatus("DVAs", "success");
        } else throw new Error("DVA error");
      } catch {
        updateStatus("DVAs", "failed");
      }
    },
    NVAs: async () => {
      updateStatus("NVAs", "loading");
      try {
        const res = await getAllNvas(token);
        if (!res?.isError) {
          saveNvas(db, res.data);
          updateStatus("NVAs", "success");
        } else throw new Error("NVA error");
      } catch {
        updateStatus("NVAs", "failed");
      }
    },
    PHs: async () => {
      updateStatus("PHs", "loading");
      try {
        const res = await getAllPhs(token);
        if (!res?.isError) {
          savePhs(db, res.data);
          updateStatus("PHs", "success");
        } else throw new Error("PH error");
      } catch {
        updateStatus("PHs", "failed");
      }
    },
    SPHs: async () => {
      updateStatus("SPHs", "loading");
      try {
        const res = await getAllSphs(token);
        if (!res?.isError) {
          saveSphs(db, res.data);
          updateStatus("SPHs", "success");
        } else throw new Error("SPH error");
      } catch {
        updateStatus("SPHs", "failed");
      }
    },
    ADDs: async () => {
      updateStatus("ADDs", "loading");
      try {
        const res = await getAllAdds(token);
        if (!res?.isError) {
          saveAdds(db, res.data);
          updateStatus("ADDs", "success");
        } else throw new Error("Add error");
      } catch {
        updateStatus("ADDs", "failed");
      }
    },
    AXIS: async () => {
      updateStatus("AXIS", "loading");
      try {
        const res = await getAllAxises(token);
        if (!res?.isError) {
          saveAxis(db, res.data);
          updateStatus("AXIS", "success");
        } else throw new Error("Axis error");
      } catch {
        updateStatus("AXIS", "failed");
      }
    },
    CYLs: async () => {
      updateStatus("CYLs", "loading");
      try {
        const res = await getAllCyls(token);
        if (!res?.isError) {
          saveCyls(db, res.data);
          updateStatus("CYLs", "success");
        } else throw new Error("Cyl error");
      } catch {
        updateStatus("CYLs", "failed");
      }
    },
    LensMaterials: async () => {
      updateStatus("LensMaterials", "loading");
      try {
        const res = await getAllLensMaterials(token);
        if (!res?.isError) {
          saveLensMaterials(db, res.data);
          updateStatus("LensMaterials", "success");
        } else throw new Error("Lens error");
      } catch {
        updateStatus("LensMaterials", "failed");
      }
    },
    FrameMaterials: async () => {
      updateStatus("FrameMaterials", "loading");
      try {
        const res = await getAllFrameMaterials(token);
        if (!res?.isError) {
          saveFrameMaterials(db, res.data);
          updateStatus("FrameMaterials", "success");
        } else throw new Error("Frame error");
      } catch {
        updateStatus("FrameMaterials", "failed");
      }
    },
    LensTypes: async () => {
      updateStatus("LensTypes", "loading");
      try {
        const res = await getAllLensTypes(token);
        if (!res?.isError) {
          saveLensTypes(db, res.data);
          updateStatus("LensTypes", "success");
        } else throw new Error("Frame error");
      } catch {
        updateStatus("LensTypes", "failed");
      }
    },
    SpecialityLens: async () => {
      updateStatus("SpecialityLens", "loading");
      try {
        const res = await getAllSpecialityLens(token);
        if (!res?.isError) {
          saveSpecialityLens(db, res.data);
          updateStatus("SpecialityLens", "success");
        } else throw new Error("Frame error");
      } catch {
        updateStatus("SpecialityLens", "failed");
      }
    },
    ModesOfWears: async () => {
      updateStatus("ModesOfWears", "loading");
      try {
        const res = await getAllModeOfwears(token);
        if (!res?.isError) {
          saveModesOfWear(db, res.data);
          updateStatus("ModesOfWears", "success");
        } else throw new Error("ModesOfWears error");
      } catch {
        updateStatus("ModesOfWears", "failed");
      }
    },
    LensSurfaceCoating: async () => {
      updateStatus("LensSurfaceCoating", "loading");
      try {
        const res = await getAllLensSurfaceCoating(token);
        if (!res?.isError) {
          saveLensSurfaceCoatings(db, res.data);
          updateStatus("LensSurfaceCoating", "success");
        } else throw new Error("LensSurfaceCoating error");
      } catch {
        updateStatus("LensSurfaceCoating", "failed");
      }
    },
    LensTints: async () => {
      updateStatus("LensTints", "loading");
      try {
        const res = await getAllLensTint(token);
        if (!res?.isError) {
          saveLensTints(db, res.data);
          updateStatus("LensTints", "success");
        } else throw new Error("LensTints error");
      } catch {
        updateStatus("LensTints", "failed");
      }
    },
    SpecialInstructions: async () => {
      updateStatus("SpecialInstructions", "loading");
      try {
        const res = await getAllSpecialInstructions(token);
        if (!res?.isError) {
          saveSpecialInstructions(db, res.data);
          updateStatus("SpecialInstructions", "success");
        } else throw new Error("SpecialInstructions error");
      } catch {
        updateStatus("SpecialInstructions", "failed");
      }
    },
    ReasonForReferrals: async () => {
      updateStatus("ReasonForReferrals", "loading");
      try {
        const res = await getAllReasonForReferrals(token);
        if (!res?.isError) {
          saveReasonForReferrals(db, res.data);
          updateStatus("ReasonForReferrals", "success");
        } else throw new Error("ReasonForReferrals error");
      } catch {
        updateStatus("ReasonForReferrals", "failed");
      }
    },
    DiagnosisMaster: async () => {
      updateStatus("DiagnosisMaster", "loading");
      try {
        const res = await getAllDiagnosis(token);
        if (!res?.isError) {
          saveDiagnosisMaster(db, res.data);
          updateStatus("DiagnosisMaster", "success");
        } else throw new Error("DiagnosisMaster error");
      } catch {
        updateStatus("DiagnosisMaster", "failed");
      }
    },
    TorchlightFindings: async () => {
      updateStatus("TorchlightFindings", "loading");
      try {
        const res = await getAllTorchLights(token);
        if (!res?.isError) {
          saveTorchligtFindings(db, res.data);
          updateStatus("TorchlightFindings", "success");
        } else throw new Error("TorchlightFindings error");
      } catch {
        updateStatus("TorchlightFindings", "failed");
      }
    },
    Users: async () => {
      updateStatus("Users", "loading");
      try {
        const res = await getAllUsers(token);
        if (!res?.isError) {
          saveUsers(db, res.data);
          updateStatus("Users", "success");
        } else throw new Error("Users error");
      } catch {
        updateStatus("Users", "failed");
      }
    },
  };

  const systemUpdateHandler = async () => {
    setIsLoading(true);
    setVisiable(true);

    await Promise.all(Object.entries(handlerMap).map(([key, fn]) => fn()));

    setIsLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16, marginTop: 20 }}>
      {/* <AppButton
        title="System Update"
        onPress={systemUpdateHandler}
        loading={isLoading}
        disabled={isLoading}
      /> */}
      <CustomButton title="System Update" onPress={systemUpdateHandler} />
      {/* <Button onPress={systemUpdateHandler} mode="contained" loading={isLoading}>
        System Update
      </Button> */}
      {visiable && (
        <View style={{ marginTop: 10 }}>
          <StatusStepper status={status} />
        </View>
      )}
    </ScrollView>
  );
};

export default SystemUpdate;
