import {
  insertMasterDataToDB,
  saveAdds,
  saveAllClasses,
  saveAxis,
  saveCyls,
  saveDvas,
  saveFrameMaterials,
  saveHospitals,
  saveLensMaterials,
  saveMasterDropdownToDB,
  saveNvas,
  saveOcularComplaints,
  saveOtherFacilities,
  savePhs,
  saveReachConfigs,
  saveSphs,
  saveVisionCenters,
  TABLES,
} from "@/database/database";
import { getAllAdds } from "@/http/add-http";
import { getAllAxises } from "@/http/axis-http";
import { getAllClasses } from "@/http/class-http";
import { getAllCyls } from "@/http/cyl-http";
import { getAllDistanceDvas } from "@/http/distance-dva-http";
import { getAllFrameMaterials } from "@/http/frame-material-http";
import { getAllHospitals } from "@/http/hospital-http";
import { getAllLensMaterials } from "@/http/lens-material-http";
import { getMasterData } from "@/http/master-http";
import { getAllNvas } from "@/http/near-nva-http";
import { getAllOculars } from "@/http/ocular-complaints-http";
import { getOtherFacilities } from "@/http/other-facility-http";
import { getAllPhs } from "@/http/ph-http";
import { getReachConfiguration } from "@/http/reach-configuration-http";
import { getAllSphs } from "@/http/sph-http";
import { getVisionCenters } from "@/http/vision-center-http";
import { RootState } from "@/store/store";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";

const SystemUpdate = () => {
  const db = useSQLiteContext();
  const token = useSelector((state: RootState) => state.userSlice.token);
  const [isLoading, setIsLoading] = useState(false);
  const partnerId = useSelector(
    (state: RootState) => state.userSlice.partnerId
  );
  console.log("PAARTNER ID", partnerId);

  const systemUpdateHandler = () => {
    setIsLoading(true);
    getClassesHandler();
    getVisionCenterHandler();
    getHospitalsHandler();
    getOtherFacilitiesHandler();
    getOcularComplaintsHandler();
    getReachConfigsHandler();
    //Visual Acuity
    getDvasHandler();
    getNvaHandler();
    getPhHandler();
    //Refraction
    getSPHHandler();
    getAddsHandler();
    getAxisHandler();
    getCylsHandler();
    getLensMaterialHandler();
    getFrameMaterialsHandler();
    setIsLoading(false);
  };

  const getClassesHandler = async () => {
    console.log("GETTING Classes ...");
    const response = await getAllClasses(token);
    if (response?.isError) {
      console.log(response.data);
    } else {
      saveAllClasses(db, response?.data);
    }
  };

  const getVisionCenterHandler = async () => {
    console.log("GETTING Vision Centers ...");
    const response = await getVisionCenters(token);
    if (response?.isError) {
      console.log(response.data);
    } else {
      saveVisionCenters(db, response?.data);
    }
  };

  const getHospitalsHandler = async () => {
    console.log("GETTING Hospitals ...");
    const response = await getAllHospitals(token);
    if (response?.isError) {
      console.log(response.data);
    } else {
      saveHospitals(db, response?.data);
    }
  };

  const getOtherFacilitiesHandler = async () => {
    console.log("GETTING Other Facilities...");
    const response = await getOtherFacilities(token);
    if (response?.isError) {
      console.log(response.data);
    } else {
      saveOtherFacilities(db, response?.data);
    }
  };

  const getOcularComplaintsHandler = async () => {
    console.log("GETTING Ocular Complaints ...");
    const response = await getAllOculars(token);
    if (response?.isError) {
      console.log(response.data);
    } else {
      saveOcularComplaints(db, response?.data);
    }
  };

  const getDvasHandler = async () => {
    console.log("GETTING DVAs...");
    const response = await getAllDistanceDvas(token);
    if (response?.isError) {
      console.log(response.data);
    } else {
      saveDvas(db, response?.data);
    }
  };

  const getNvaHandler = async () => {
    console.log("GETTING NVAs...");
    const response = await getAllNvas(token);
    if (response?.isError) {
      console.log(response.data);
    } else {
      saveNvas(db, response?.data);
    }
  };

  const getPhHandler = async () => {
    console.log("GETTING PH...");
    const response = await getAllPhs(token);
    if (response?.isError) {
      console.log(response.data);
    } else {
      savePhs(db, response?.data);
    }
  };

  const getSPHHandler = async () => {
    console.log("GETTING SPH ...");
    const response = await getAllSphs(token);
    if (response?.isError) {
      console.log(response.data);
    } else {
      saveSphs(db, response?.data);
    }
  };

  const getCylsHandler = async () => {
    console.log("GETTING Cyls...");
    const response = await getAllCyls(token);
    if (response?.isError) {
      console.log(response.data);
    } else {
      saveCyls(db, response?.data);
    }
  };

  const getAddsHandler = async () => {
    console.log("GETTING Adds ...");
    const response = await getAllAdds(token);
    if (response?.isError) {
      console.log(response.data);
    } else {
      saveAdds(db, response?.data);
    }
  };

  const getAxisHandler = async () => {
    console.log("GETTING Axises...");
    const response = await getAllAxises(token);
    if (response?.isError) {
      console.log(response.data);
    } else {
      saveAxis(db, response?.data);
    }
  };

  const getReachConfigsHandler = async () => {
    console.log("GETTING Reach Congfigs...");
    const response = await getReachConfiguration(token, partnerId.toString());
    if (response?.isError) {
      console.log(response.data);
    } else {
      saveReachConfigs(db, response?.data);
    }
  };

  const getLensMaterialHandler = async () => {
    console.log("GETTING Axises...");
    const response = await getAllLensMaterials(token);
    if (response?.isError) {
      console.log(response.data);
    } else {
      saveLensMaterials(db, response?.data);
    }
  };

  const getFrameMaterialsHandler = async () => {
    console.log("GETTING Axises...");
    const response = await getAllFrameMaterials(token);
    if (response?.isError) {
      console.log(response.data);
    } else {
      saveFrameMaterials(db, response?.data);
    }
  };

  return (
    <View>
      <Text>System Update</Text>
      <Button
        onPress={systemUpdateHandler}
        mode="contained"
        loading={isLoading}
      >
        System Update
      </Button>
    </View>
  );
};

export default SystemUpdate;
