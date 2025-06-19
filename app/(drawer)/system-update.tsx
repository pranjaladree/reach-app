// import {
//   DISTANCE_DVA_URL,
//   HOSPITAL_URL,
//   NVA_URL,
//   OTHER_FACILITY_URL,
//   PH_URL,
//   VISION_CENTER_URL,
// } from "@/constants/Urls";
// import {
//   insertMasterDataToDB,
//   saveAdds,
//   saveAllClasses,
//   saveAxis,
//   saveCyls,
//   saveDvas,
//   saveFrameMaterials,
//   saveHospitals,
//   saveLensMaterials,
//   saveMasterDropdownToDB,
//   saveNvas,
//   saveOcularComplaints,
//   saveOtherFacilities,
//   savePhs,
//   saveReachConfigs,
//   saveSphs,
//   saveVisionCenters,
//   TABLES,
// } from "@/database/database";
// import { getAllAdds } from "@/http/add-http";
// import { getAllAxises } from "@/http/axis-http";
// import { getAllClasses } from "@/http/class-http";
// import { getAllCyls } from "@/http/cyl-http";
// import { getAllDistanceDvas } from "@/http/distance-dva-http";
// import { getAllFrameMaterials } from "@/http/frame-material-http";
// import { getAllHospitals } from "@/http/hospital-http";
// import { getAllLensMaterials } from "@/http/lens-material-http";
// import { getMasterData } from "@/http/master-http";
// import { getAllNvas } from "@/http/near-nva-http";
// import { getAllOculars } from "@/http/ocular-complaints-http";
// import { getOtherFacilities } from "@/http/other-facility-http";
// import { getAllPhs } from "@/http/ph-http";
// import { getReachConfiguration } from "@/http/reach-configuration-http";
// import { getAllSphs } from "@/http/sph-http";
// import { getVisionCenters } from "@/http/vision-center-http";
// import { RootState } from "@/store/store";
// import { useSQLiteContext } from "expo-sqlite";
// import { useState } from "react";
// import { View, Text } from "react-native";
// import { Button } from "react-native-paper";
// import { useSelector } from "react-redux";
// import {
//   saveAdds,
//   saveAllClasses,
//   saveAxis,
//   saveCyls,
//   saveDvas,
//   saveFrameMaterials,
//   saveHospitals,
//   saveLensMaterials,
//   saveLensSurfaceCoatings,
//   saveLensTints,
//   saveLensTypes,
//   saveMasterDropdownToDB,
//   saveModesOfWear,
//   saveNvas,
//   saveOcularComplaints,
//   saveOtherFacilities,
//   savePhs,
//   saveReachConfigs,
//   saveReasonForReferrals,
//   saveSpecialInstructions,
//   saveSpecialityLens,
//   saveSphs,
//   saveTorchligtFindings,
//   saveVisionCenters,
// } from "@/database/database";
// import { getAllAdds } from "@/http/add-http";
// import { getAllAxises } from "@/http/axis-http";
// import { getAllClasses } from "@/http/class-http";
// import { getAllCyls } from "@/http/cyl-http";
// import { getAllDistanceDvas } from "@/http/distance-dva-http";
// import { getAllFrameMaterials } from "@/http/frame-material-http";
// import { getAllHospitals } from "@/http/hospital-http";
// import { getAllLensMaterials } from "@/http/lens-material-http";
// import { getAllLensSurfaceCoating } from "@/http/lens-surface-coating-http";
// import { getAllLensTint } from "@/http/lens-tint-http";
// import { getAllLensTypes } from "@/http/lens-type-http";
// import { getMasterData } from "@/http/master-http";
// import { getAllModeOfwears } from "@/http/mode-of-wear-http";
// import { getAllNvas } from "@/http/near-nva-http";
// import { getAllOculars } from "@/http/ocular-complaints-http";
// import { getOtherFacilities } from "@/http/other-facility-http";
// import { getAllPhs } from "@/http/ph-http";
// import { getReachConfiguration } from "@/http/reach-configuration-http";
// import { getAllReasonForReferrals } from "@/http/reason-for-referral-http";
// import { getAllSpecialInstructions } from "@/http/special-instructions-http";
// import { getAllSpecialityLens } from "@/http/speciality-lens-http";
// import { getAllSphs } from "@/http/sph-http";
// import { getAllTorchLights } from "@/http/torchlight-http";
// import { getVisionCenters } from "@/http/vision-center-http";
// import { RootState } from "@/store/store";
// import { useSQLiteContext } from "expo-sqlite";
// import { useState } from "react";
// import { View, Text } from "react-native";
// import { Button } from "react-native-paper";
// import { useSelector } from "react-redux";

// const SystemUpdate = () => {
//   const db = useSQLiteContext();
//   const token = useSelector((state: RootState) => state.userSlice.token);
//   const [isLoading, setIsLoading] = useState(false);
//   const partnerId = useSelector(
//     (state: RootState) => state.userSlice.partnerId
//   );
//   console.log("PAARTNER ID", partnerId);

//   // const systemUpdateHandler = () => {
//   //   setIsLoading(true);
//   //   getClassesHandler();
//   //   getVisionCenterHandler();
//   //   getHospitalsHandler();
//   //   getOtherFacilitiesHandler();
//   //   getOcularComplaintsHandler();
//   //   getReachConfigsHandler();
//   //   //Visual Acuity
//   //   getDvasHandler();
//   //   getNvaHandler();
//   //   getPhHandler();
//   //   //Refraction
//   //   getSPHHandler();
//   //   getAddsHandler();
//   //   getAxisHandler();
//   //   getCylsHandler();
//   //   getLensMaterialHandler();
//   //   getFrameMaterialsHandler();
//   //   setIsLoading(false);
//   // };
// const systemUpdateHandler = () => {
//   setIsLoading(true);
//   getClassesHandler();
//   getVisionCenterHandler();
//   getHospitalsHandler();
//   getOtherFacilitiesHandler();
//   getOcularComplaintsHandler();
//   getReachConfigsHandler();
//   getTorchlightFindingsHandler();
//   getReasonForReferralsHandler();
//   //Visual Acuity
//   getDvasHandler();
//   getNvaHandler();
//   getPhHandler();
//   //Refraction
//   getSPHHandler();
//   getAddsHandler();
//   getAxisHandler();
//   getCylsHandler();
//   getLensMaterialHandler();
//   getFrameMaterialsHandler();
//   getLensTypeHandler();
//   getLensSurfaceCoatingHandler();
//   getLensTintHandler();
//   getModeOfWearHandler();
//   getSpecialityLensHandler();
//   getSpecialInstructionsHandler();
//   setIsLoading(false);
// };

//   const systemUpdateHandler = async () => {
//     setIsLoading(true);

//     const results = await Promise.allSettled([
//       getClassesHandler(),
//       getVisionCenterHandler(),
//       getHospitalsHandler(),
//       getOtherFacilitiesHandler(),
//       getOcularComplaintsHandler(),
//       getReachConfigsHandler(),
//       getDvasHandler(),
//       getNvaHandler(),
//       getPhHandler(),
//       getSPHHandler(),
//       getAddsHandler(),
//       getAxisHandler(),
//       getCylsHandler(),
//       getLensMaterialHandler(),
//       getFrameMaterialsHandler(),
//     ]);

//     results.forEach((result, index) => {
//       if (result.status === "rejected") {
//         console.warn(`Handler ${index + 1} failed:`, result.reason);
//       }
//     });

//     setIsLoading(false);
//   };

//   const getClassesHandler = async () => {
//     console.log("GETTING Classes ...");
//     const response = await getAllClasses(token);
//     if (response?.isError) {
//       console.log(response.data);
//     } else {
//       saveAllClasses(db, response?.data);
//     }
//   };

//   const getVisionCenterHandler = async () => {
//     console.log("GETTING Vision Centers ...");
//     const response = await getVisionCenters(token);
//     if (response?.isError) {
//       console.log(response.data);
//     } else {
//       saveVisionCenters(db, response?.data);
//     }
//   };
// const getTorchlightFindingsHandler = async () => {
//   console.log("GETTING Torchlight Findings ...");
//   const response = await getAllTorchLights(token);
//   if (response?.isError) {
//     console.log(response.data);
//   } else {
//     saveTorchligtFindings(db, response?.data);
//   }
// };

// const getReasonForReferralsHandler = async () => {
//   console.log("GETTING Referral Reasons ...");
//   const response = await getAllReasonForReferrals(token);
//   if (response?.isError) {
//     console.log(response.data);
//   } else {
//     saveReasonForReferrals(db, response?.data);
//   }
// };

// const getDvasHandler = async () => {
//   console.log("GETTING DVAs...");
//   const response = await getAllDistanceDvas(token);
//   if (response?.isError) {
//     console.log(response.data);
//   } else {
//     saveDvas(db, response?.data);
//   }
// };

//   const getHospitalsHandler = async () => {
//     console.log("GETTING Hospitals ...");
//     const response = await getAllHospitals(token);
//     if (response?.isError) {
//       console.log(response.data);
//     } else {
//       saveHospitals(db, response?.data);
//     }
//   };

//   const getOtherFacilitiesHandler = async () => {
//     console.log("GETTING Other Facilities...");
//     const response = await getOtherFacilities(token);
//     if (response?.isError) {
//       console.log(response.data);
//     } else {
//       saveOtherFacilities(db, response?.data);
//     }
//   };

//   const getOcularComplaintsHandler = async () => {
//     console.log("GETTING Ocular Complaints ...");
//     const response = await getAllOculars(token);
//     if (response?.isError) {
//       console.log(response.data);
//     } else {
//       saveOcularComplaints(db, response?.data);
//     }
//   };

//   const getDvasHandler = async () => {
//     console.log("GETTING DVAs...");
//     const response = await getAllDistanceDvas(token);
//     if (response?.isError) {
//       console.log(response.data);
//     } else {
//       saveDvas(db, response?.data);
//     }
//   };

//   const getNvaHandler = async () => {
//     console.log("GETTING NVAs...");
//     const response = await getAllNvas(token);
//     if (response?.isError) {
//       console.log(response.data);
//     } else {
//       saveNvas(db, response?.data);
//     }
//   };

//   const getPhHandler = async () => {
//     console.log("GETTING PH...");
//     const response = await getAllPhs(token);
//     if (response?.isError) {
//       console.log(response.data);
//     } else {
//       savePhs(db, response?.data);
//     }
//   };

//   const getSPHHandler = async () => {
//     console.log("GETTING SPH ...");
//     const response = await getAllSphs(token);
//     if (response?.isError) {
//       console.log(response.data);
//     } else {
//       saveSphs(db, response?.data);
//     }
//   };

//   const getCylsHandler = async () => {
//     console.log("GETTING Cyls...");
//     const response = await getAllCyls(token);
//     if (response?.isError) {
//       console.log(response.data);
//     } else {
//       saveCyls(db, response?.data);
//     }
//   };

//   const getAddsHandler = async () => {
//     console.log("GETTING Adds ...");
//     const response = await getAllAdds(token);
//     if (response?.isError) {
//       console.log(response.data);
//     } else {
//       saveAdds(db, response?.data);
//     }
//   };

//   const getAxisHandler = async () => {
//     console.log("GETTING Axises...");
//     const response = await getAllAxises(token);
//     if (response?.isError) {
//       console.log(response.data);
//     } else {
//       saveAxis(db, response?.data);
//     }
//   };

//   const getReachConfigsHandler = async () => {
//     console.log("GETTING Reach Congfigs...");
//     const response = await getReachConfiguration(token, partnerId.toString());
//     if (response?.isError) {
//       console.log(response.data);
//     } else {
//       saveReachConfigs(db, response?.data);
//     }
//   };

//   const getLensMaterialHandler = async () => {
//     console.log("GETTING Axises...");
//     const response = await getAllLensMaterials(token);
//     if (response?.isError) {
//       console.log(response.data);
//     } else {
//       saveLensMaterials(db, response?.data);
//     }
//   };

//   const getFrameMaterialsHandler = async () => {
//     console.log("GETTING Axises...");
//     const response = await getAllFrameMaterials(token);
//     if (response?.isError) {
//       console.log(response.data);
//     } else {
//       saveFrameMaterials(db, response?.data);
//     }
//   };

//   return (
//     <View>
//       <Text>System Update</Text>
//       <Button
//         onPress={systemUpdateHandler}
//         mode="contained"
//         loading={isLoading}
//       >
//         System Update
//       </Button>
//     </View>
//   );
// };

// export default SystemUpdate;

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
} from "@/database/database";
import { getVisionCenters } from "@/http/vision-center-http";
import { getAllHospitals } from "@/http/hospital-http";
import { getOtherFacilities } from "@/http/other-facility-http";
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
        const res = await getOtherFacilities(token);
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
  };

  const systemUpdateHandler = async () => {
    setIsLoading(true);
    setVisiable(true);

    await Promise.all(Object.entries(handlerMap).map(([key, fn]) => fn()));

    setIsLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16, marginTop: 20 }}>
      <AppButton
        title="System Update"
        onPress={systemUpdateHandler}
        loading={isLoading}
        disabled={isLoading}
      />
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
