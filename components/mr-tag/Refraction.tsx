import {
  findAllAdds,
  findAllAxis,
  findAllCyls,
  findAllFrameMaterials,
  findAllLensMaterials,
  findAllLensSurfaceCoatings,
  findAllLensTints,
  findAllLensTypes,
  findAllModeOfWears,
  findAllNvas,
  findAllSpecialInstructions,
  findAllSpecialityLens,
  findAllSphs,
  findRefractionByMrId,
  saveRefraction,
} from "@/database/database";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import CustomGridDropdown from "../utils/CustomGridDropdown";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  BLANK_DROPDOWN_MODEL,
  BLANK_GRID_DROPDOWN_MODEl,
} from "@/constants/BlankModels";
import { GridDropdownModel } from "@/models/ui/GridDropdownModel";
import {
  Button,
  Checkbox,
  Dialog,
  Portal,
  TextInput,
} from "react-native-paper";
import CustomDropdown from "../utils/CustomDropdown";
import { ACTIVITY_TYPE_ITEMS } from "@/constants/Data";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { Collapsible } from "../Collapsible";
import { RefractionModel } from "@/models/patient-at-fixed-facilty/RefractionModel";
import { useFocusEffect } from "expo-router";

//
interface Props {
  mrId: string;
}

const Refraction = ({ mrId }: Props) => {
  const db = useSQLiteContext();

  const [sphItems, setSphItems] = useState<GridDropdownModel[]>([]);
  const [cylItems, setCylItems] = useState<GridDropdownModel[]>([]);
  const [axisItems, setAxisItems] = useState<DropdownModel[]>([]);
  const [addItems, setAddItems] = useState<DropdownModel[]>([]);
  const [nvaItems, setNvaItems] = useState<GridDropdownModel[]>([]);

  const [refraction_PGP_SPH_RE, setRefraction_PGP_SPH_RE] = useState(
    BLANK_GRID_DROPDOWN_MODEl
  );

  const refraction_PGP_SPH_REHandler = (item: GridDropdownModel) => {
    setRefraction_PGP_SPH_RE(item);
  };

  const [refraction_PGP_CYL_RE, setRefraction_PGP_CYL_RE] = useState(
    BLANK_GRID_DROPDOWN_MODEl
  );

  const refraction_PGP_CYL_REHandler = (item: GridDropdownModel) => {
    setRefraction_PGP_CYL_RE(item);
  };

  const [refraction_PGP_Axis_RE, setRefraction_PGP_Axis_RE] =
    useState(BLANK_DROPDOWN_MODEL);

  const refraction_PGP_Axis_REHandler = (val?: string) => {
    if (val == "0") {
      setRefraction_PGP_Axis_RE(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = axisItems.find((item) => item.value == val);
      if (foundItem) {
        setRefraction_PGP_Axis_RE(foundItem);
      }
    }
  };

  const [refraction_PGP_Add_RE, setRefraction_PGP_Add_RE] =
    useState(BLANK_DROPDOWN_MODEL);

  const refraction_PGP_Add_REHandler = (val?: string) => {
    if (val == "0") {
      setRefraction_PGP_Add_RE(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = addItems.find((item) => item.value == val);
      if (foundItem) {
        setRefraction_PGP_Add_RE(foundItem);
      }
    }
  };

  //RE Dry Retinscopy
  const [refraction_Dry_SPH_RE, setRefraction_Dry_SPH_RE] = useState(
    BLANK_GRID_DROPDOWN_MODEl
  );

  const refraction_Dry_SPH_REHandler = (item: GridDropdownModel) => {
    setRefraction_Dry_SPH_RE(item);
  };

  const [refraction_Dry_CYL_RE, setRefraction_Dry_CYL_RE] = useState(
    BLANK_GRID_DROPDOWN_MODEl
  );

  const refraction_Dry_CYL_REHandler = (item: GridDropdownModel) => {
    setRefraction_Dry_CYL_RE(item);
  };

  const [refraction_Dry_Axis_RE, setRefraction_Dry_Axis_RE] =
    useState(BLANK_DROPDOWN_MODEL);

  const refraction_Dry_Axis_REHandler = (val?: string) => {
    if (val == "0") {
      setRefraction_Dry_Axis_RE(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = axisItems.find((item) => item.value == val);
      if (foundItem) {
        setRefraction_Dry_Axis_RE(foundItem);
      }
    }
  };

  //RE Cyclo Retinscopy
  const [refraction_Cyclo_SPH_RE, setRefraction_Cyclo_SPH_RE] = useState(
    BLANK_GRID_DROPDOWN_MODEl
  );

  const refraction_Cyclo_SPH_REHandler = (item: GridDropdownModel) => {
    setRefraction_Cyclo_SPH_RE(item);
  };

  const [refraction_Cyclo_CYL_RE, setRefraction_Cyclo_CYL_RE] = useState(
    BLANK_GRID_DROPDOWN_MODEl
  );

  const refraction_Cyclo_CYL_REHandler = (item: GridDropdownModel) => {
    setRefraction_Cyclo_CYL_RE(item);
  };

  const [refraction_Cyclo_Axis_RE, setRefraction_Cyclo_Axis_RE] =
    useState(BLANK_DROPDOWN_MODEL);

  const refraction_Cyclo_Axis_REHandler = (val?: string) => {
    if (val == "0") {
      setRefraction_Cyclo_Axis_RE(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = axisItems.find((item) => item.value == val);
      if (foundItem) {
        setRefraction_Cyclo_Axis_RE(foundItem);
      }
    }
  };

  //RE  Acceptance
  const [refraction_Acceptance_SPH_RE, setRefraction_Acceptance_SPH_RE] =
    useState(BLANK_GRID_DROPDOWN_MODEl);

  const refraction_Acceptance_SPH_REHandler = (item: GridDropdownModel) => {
    setRefraction_Acceptance_SPH_RE(item);
  };

  const [refraction_Acceptance_CYL_RE, setRefraction_Acceptance_CYL_RE] =
    useState(BLANK_GRID_DROPDOWN_MODEl);

  const refraction_Acceptance_CYL_REHandler = (item: GridDropdownModel) => {
    setRefraction_Acceptance_CYL_RE(item);
  };

  const [refraction_Acceptance_Axis_RE, setRefraction_Acceptance_Axis_RE] =
    useState(BLANK_DROPDOWN_MODEL);

  const refraction_Acceptance_Axis_REHandler = (val?: string) => {
    if (val == "0") {
      setRefraction_Acceptance_Axis_RE(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = axisItems.find((item) => item.value == val);
      if (foundItem) {
        setRefraction_Acceptance_Axis_RE(foundItem);
      }
    }
  };

  //LE
  const [refraction_PGP_SPH_LE, setRefraction_PGP_SPH_LE] = useState(
    BLANK_GRID_DROPDOWN_MODEl
  );

  const refraction_PGP_SPH_LEHandler = (item: GridDropdownModel) => {
    setRefraction_PGP_SPH_LE(item);
  };

  const [refraction_PGP_CYL_LE, setRefraction_PGP_CYL_LE] = useState(
    BLANK_GRID_DROPDOWN_MODEl
  );

  const refraction_PGP_CYL_LEHandler = (item: GridDropdownModel) => {
    setRefraction_PGP_CYL_LE(item);
  };

  const [refraction_PGP_Axis_LE, setRefraction_PGP_Axis_LE] =
    useState(BLANK_DROPDOWN_MODEL);

  const refraction_PGP_Axis_LEHandler = (val?: string) => {
    if (val == "0") {
      setRefraction_PGP_Axis_LE(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = axisItems.find((item) => item.value == val);
      if (foundItem) {
        setRefraction_PGP_Axis_LE(foundItem);
      }
    }
  };

  const [refraction_PGP_Add_LE, setRefraction_PGP_Add_LE] =
    useState(BLANK_DROPDOWN_MODEL);

  const refraction_PGP_Add_LEHandler = (val?: string) => {
    if (val == "0") {
      setRefraction_PGP_Add_LE(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = addItems.find((item) => item.value == val);
      if (foundItem) {
        setRefraction_PGP_Add_LE(foundItem);
      }
    }
  };

  //LE Dry Retinscopy
  const [refraction_Dry_SPH_LE, setRefraction_Dry_SPH_LE] = useState(
    BLANK_GRID_DROPDOWN_MODEl
  );

  const refraction_Dry_SPH_LEHandler = (item: GridDropdownModel) => {
    setRefraction_Dry_SPH_LE(item);
  };

  const [refraction_Dry_CYL_LE, setRefraction_Dry_CYL_LE] = useState(
    BLANK_GRID_DROPDOWN_MODEl
  );

  const refraction_Dry_CYL_LEHandler = (item: GridDropdownModel) => {
    setRefraction_Dry_CYL_LE(item);
  };

  const [refraction_Dry_Axis_LE, setRefraction_Dry_Axis_LE] =
    useState(BLANK_DROPDOWN_MODEL);

  const refraction_Dry_Axis_LEHandler = (val?: string) => {
    if (val == "0") {
      setRefraction_Dry_Axis_LE(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = axisItems.find((item) => item.value == val);
      if (foundItem) {
        setRefraction_Dry_Axis_LE(foundItem);
      }
    }
  };

  //LE Cyclo Retinscopy
  const [refraction_Cyclo_SPH_LE, setRefraction_Cyclo_SPH_LE] = useState(
    BLANK_GRID_DROPDOWN_MODEl
  );

  const refraction_Cyclo_SPH_LEHandler = (item: GridDropdownModel) => {
    setRefraction_Cyclo_SPH_LE(item);
  };

  const [refraction_Cyclo_CYL_LE, setRefraction_Cyclo_CYL_LE] = useState(
    BLANK_GRID_DROPDOWN_MODEl
  );

  const refraction_Cyclo_CYL_LEHandler = (item: GridDropdownModel) => {
    setRefraction_Cyclo_CYL_LE(item);
  };

  const [refraction_Cyclo_Axis_LE, setRefraction_Cyclo_Axis_LE] =
    useState(BLANK_DROPDOWN_MODEL);

  const refraction_Cyclo_Axis_LEHandler = (val?: string) => {
    if (val == "0") {
      setRefraction_Cyclo_Axis_LE(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = axisItems.find((item) => item.value == val);
      if (foundItem) {
        setRefraction_Cyclo_Axis_LE(foundItem);
      }
    }
  };

  //LE  Acceptance
  const [refractionAcceptanceSphLe, setrefractionAcceptanceSphLe] =
    useState(BLANK_DROPDOWN_MODEL);

  const refractionAcceptanceSphLeHandler = (item: DropdownModel) => {
    setrefractionAcceptanceSphLe(item);
  };

  const [refraction_Acceptance_CYL_LE, setRefraction_Acceptance_CYL_LE] =
    useState(BLANK_GRID_DROPDOWN_MODEl);

  const refraction_Acceptance_CYL_LEHandler = (item: GridDropdownModel) => {
    setRefraction_Acceptance_CYL_LE(item);
  };

  const [refraction_Acceptance_Axis_LE, setRefraction_Acceptance_Axis_LE] =
    useState(BLANK_DROPDOWN_MODEL);

  const refraction_Acceptance_Axis_LEHandler = (val?: string) => {
    if (val == "0") {
      setRefraction_Acceptance_Axis_LE(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = axisItems.find((item) => item.value == val);
      if (foundItem) {
        setRefraction_Acceptance_Axis_LE(foundItem);
      }
    }
  };

  //BCVA
  const [bcva_RE, setBcva_RE] = useState(BLANK_GRID_DROPDOWN_MODEl);

  const bcva_REHandler = (item: GridDropdownModel) => {
    setBcva_RE(item);
  };

  const [bcva_LE, setBcva_LE] = useState(BLANK_GRID_DROPDOWN_MODEl);

  const bcva_LEHandler = (item: GridDropdownModel) => {
    setBcva_LE(item);
  };

  //Add SPH
  const [add_sph_RE, setAdd_SPH_RE] = useState(BLANK_GRID_DROPDOWN_MODEl);

  const add_sph_REHandler = (item: GridDropdownModel) => {
    setAdd_SPH_RE(item);
  };

  const [add_sph_LE, setAdd_SPH_LE] = useState(BLANK_GRID_DROPDOWN_MODEl);

  const add_sph_LEHandler = (item: GridDropdownModel) => {
    setAdd_SPH_LE(item);
  };

  const [remarksRE, setRemarksRE] = useState("");

  const remarksREChangeHandler = (val: string) => {
    setRemarksRE(val);
  };

  //Add NVA
  const [add_nva_RE, setAdd_Nva_RE] = useState(BLANK_GRID_DROPDOWN_MODEl);

  const add_Nva_REHandler = (item: GridDropdownModel) => {
    setAdd_Nva_RE(item);
  };

  const [add_nva_LE, setAdd_Nva_LE] = useState(BLANK_GRID_DROPDOWN_MODEl);

  const add_nva_LEHandler = (item: GridDropdownModel) => {
    setAdd_Nva_LE(item);
  };

  const [pupilaryDistanceRE, setPupilaryDistanceRE] = useState("");
  const [pupilaryDistanceBoth, setPupilaryDistanceBoth] = useState("");
  const [pupilaryDistanceLE, setPupilaryDistanceLE] = useState("");

  const pupilaryDistanceREChangeHandler = (val: string) => {
    if (isNaN(+val)) {
      return;
    }
    setPupilaryDistanceRE(val);
  };

  const pupilaryDistanceBothChangeHandler = (val: string) => {
    if (isNaN(+val)) {
      return;
    }
    setPupilaryDistanceBoth(val);
    setPupilaryDistanceLE("");
    setPupilaryDistanceRE("");
  };

  const pupilaryDistanceLEChangeHandler = (val: string) => {
    if (isNaN(+val)) {
      return;
    }
    setPupilaryDistanceLE(val);
  };

  useEffect(() => {
    if (isNaN(+pupilaryDistanceRE)) {
      return;
    }
    if (isNaN(+pupilaryDistanceLE)) {
      return;
    }
    let pupilaryDist = +pupilaryDistanceRE + +pupilaryDistanceLE;
    if (pupilaryDist == 0) {
      setPupilaryDistanceBoth("");
    } else {
      setPupilaryDistanceBoth(pupilaryDist.toString());
    }
  }, [pupilaryDistanceRE, pupilaryDistanceLE]);

  const [remarksLE, setRemarksLE] = useState("");
  const remarksLEChangeHandler = (val: string) => {
    setRemarksLE(val);
  };

  const [frameMaterial, setFrameMaterial] = useState(BLANK_DROPDOWN_MODEL);

  const frameMaterialChanageHandler = (val?: string) => {
    if (val == "0") {
      setFrameMaterial(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = frameMaterialItems.find((item) => item.value == val);
      if (foundItem) {
        setFrameMaterial(foundItem);
      }
    }
  };

  const [lensMaterial, setLensMaterial] = useState(BLANK_DROPDOWN_MODEL);

  const lensMaterialChanageHandler = (val?: string) => {
    console.log(val);
    if (val == "0") {
      setLensMaterial(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = lensMaterialItems.find((item) => item.value == val);
      if (foundItem) {
        setLensMaterial(foundItem);
      }
    }
  };

  const [lensSurfaceCoating, setLensSurfaceCoating] =
    useState(BLANK_DROPDOWN_MODEL);

  const lensSurfaceCoatingChanageHandler = (val?: string) => {
    if (val == "0") {
      setLensSurfaceCoating(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = lensSurfaceCoatingItems.find(
        (item) => item.value == val
      );
      if (foundItem) {
        setLensSurfaceCoating(foundItem);
      }
    }
  };

  const [lensTint, setLensTint] = useState(BLANK_DROPDOWN_MODEL);

  const lensTintChanageHandler = (val?: string) => {
    if (val == "0") {
      setLensTint(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = lensTintItems.find((item) => item.value == val);
      if (foundItem) {
        setLensTint(foundItem);
      }
    }
  };

  const [frameMaterialItems, setFrameMaterialItems] = useState<DropdownModel[]>(
    []
  );
  const [lensMaterialItems, setLensMaterialItems] = useState<DropdownModel[]>(
    []
  );
  const [lensSurfaceCoatingItems, setLensSurfaceCoatingItems] = useState<
    DropdownModel[]
  >([]);
  const [lensTintItems, setLensTintItems] = useState<DropdownModel[]>([]);

  const [lensTypeItems, setLensTypeItems] = useState<DropdownModel[]>([]);
  const [specialityLensItems, setspecialityLensItems] = useState<
    DropdownModel[]
  >([]);
  const [specialInstructionItems, setSpecialInstructionItems] = useState<
    DropdownModel[]
  >([]);
  const [modeOfWearItems, setModeOfWearItems] = useState<DropdownModel[]>([]);

  const [lensType, setLensType] = useState(BLANK_DROPDOWN_MODEL);

  const lensTypeChanageHandler = (val?: string) => {
    if (val == "0") {
      setLensType(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = lensTypeItems.find((item) => item.value == val);
      if (foundItem) {
        setLensType(foundItem);
      }
    }
  };

  const [specialityLens, setSpecialityLens] = useState(BLANK_DROPDOWN_MODEL);

  const specialityLensChanageHandler = (val?: string) => {
    if (val == "0") {
      setSpecialityLens(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = specialityLensItems.find((item) => item.value == val);
      if (foundItem) {
        setSpecialityLens(foundItem);
      }
    }
  };

  const [specialInstruction, setSpecialInstruction] =
    useState(BLANK_DROPDOWN_MODEL);

  const specialInstructionChanageHandler = (val?: string) => {
    if (val == "0") {
      setSpecialInstruction(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = specialInstructionItems.find(
        (item) => item.value == val
      );
      if (foundItem) {
        setSpecialInstruction(foundItem);
      }
    }
  };
  const [isPrescribed, setIsPrescribed] = useState(false);

  const [modeOfWears, setModeOfWears] = useState(BLANK_DROPDOWN_MODEL);

  const modeOfWearChanageHandler = (val?: string) => {
    if (val == "0") {
      setModeOfWears(BLANK_DROPDOWN_MODEL);
    } else {
      const foundItem = modeOfWearItems.find((item) => item.value == val);
      if (foundItem) {
        setModeOfWears(foundItem);
      }
    }
  };

  const getSPHHandler = async () => {
    const response = await findAllSphs(db);
    if (response) {
      setSphItems(response);
    }
  };

  const getCylHandler = async () => {
    const response = await findAllCyls(db);
    console.log("CYLS", response);
    if (response) {
      setCylItems(response);
    }
  };

  const getAxisHandler = async () => {
    const response = await findAllAxis(db);
    if (response) {
      setAxisItems(response);
    }
  };

  const getAddsHandler = async () => {
    const response = await findAllAdds(db);
    console.log("ADDS", response);
    if (response) {
      setAddItems(response);
    }
  };

  const getNvaHandler = async () => {
    const response = await findAllNvas(db);
    console.log("ADDS", response);
    if (response) {
      setNvaItems(response);
    }
  };

  const getLensMaterialHandler = async () => {
    const response = await findAllLensMaterials(db);
    if (response) {
      setLensMaterialItems(response);
    }
  };

  const getFrameMaterialHandler = async () => {
    const response = await findAllFrameMaterials(db);
    if (response) {
      setFrameMaterialItems(response);
    }
  };

  const getLensTypeHandler = async () => {
    const response = await findAllLensTypes(db);
    if (response) {
      setLensTypeItems(response);
    }
  };

  const getSpecialityLensHandler = async () => {
    const response = await findAllSpecialityLens(db);
    if (response) {
      setspecialityLensItems(response);
    }
  };

  const getModeOfHandler = async () => {
    const response = await findAllModeOfWears(db);
    if (response) {
      setModeOfWearItems(response);
    }
  };

  const getLensSurfaceCoatingHandler = async () => {
    const response = await findAllLensSurfaceCoatings(db);
    if (response) {
      setLensSurfaceCoatingItems(response);
    }
  };

  const getLensTintHandler = async () => {
    const response = await findAllLensTints(db);
    if (response) {
      setLensTintItems(response);
    }
  };

  const getSpecialInstructionsHandler = async () => {
    const response = await findAllSpecialInstructions(db);
    if (response) {
      setSpecialInstructionItems(response);
    }
  };

  const saveRefractionHandler = async () => {
    const response = await saveRefraction(
      db,
      new RefractionModel({
        id: mrId,
        refractionPgpSphLe:
          refraction_PGP_SPH_LE.id !== "0" ? refraction_PGP_SPH_LE.title : "",
        refractionPgpSphRe:
          refraction_PGP_SPH_RE.id !== "0" ? refraction_PGP_SPH_RE.title : "",
        refractionPgpCylLe:
          refraction_PGP_CYL_LE.id !== "0" ? refraction_PGP_CYL_LE.title : "",
        refractionPgpCylRe:
          refraction_PGP_CYL_RE.id !== "0" ? refraction_PGP_CYL_RE.title : "",
        refractionPgpAxisLe:
          refraction_PGP_Axis_LE.id != "0" ? refraction_PGP_Axis_LE.value : "",
        refractionPgpAxisRe:
          refraction_PGP_Axis_RE.id !== "0" ? refraction_PGP_Axis_RE.value : "",
        refractionPgpAddLe:
          refraction_PGP_Add_LE.id !== "0" ? refraction_PGP_Add_LE.value : "",
        refractionPgpAddRe:
          refraction_PGP_Add_RE.id !== "0" ? refraction_PGP_Add_RE.value : "",
        refractionDRYRETINOSphRe:
          refraction_Dry_SPH_RE.id !== "0" ? refraction_Dry_SPH_RE.title : "",
        refractionDRYRETINOSphLe:
          refraction_Dry_SPH_LE.id !== "0" ? refraction_Dry_SPH_LE.title : "",
        refractionDRYRETINOCylRe:
          refraction_Dry_CYL_RE.id !== "0" ? refraction_Dry_CYL_RE.title : "",
        refractionDRYRETINOCylLe:
          refraction_Dry_CYL_LE.id !== "0" ? refraction_Dry_CYL_LE.title : "",
        refractionDRYRETINOAXIS_RE:
          refraction_Dry_Axis_RE.id !== "0" ? refraction_Dry_Axis_RE.value : "",
        refractionDRYRETINOAXIS_LE:
          refraction_Dry_Axis_LE.id !== "0" ? refraction_Dry_Axis_LE.value : "",
        refractionCYCLORETINOSphRe:
          refraction_Cyclo_SPH_RE.id !== "0"
            ? refraction_Cyclo_SPH_RE.title
            : "",
        refractionCYCLORETINOSphLe:
          refraction_Cyclo_SPH_LE.id !== "0"
            ? refraction_Cyclo_SPH_LE.title
            : "",
        refractionCYCLORETINOCylRe:
          refraction_Cyclo_CYL_RE.id !== "0"
            ? refraction_Cyclo_CYL_RE.title
            : "",
        refractionCYCLORETINOCylLe:
          refraction_Cyclo_CYL_LE.id !== "0"
            ? refraction_Cyclo_CYL_LE.title
            : "",
        refractionCYCLORETINO_AXIS_RE:
          refraction_Cyclo_Axis_RE.id !== "0"
            ? refraction_Cyclo_Axis_RE.value
            : "",
        refractionCYCLORETINO_AXIS_LE:
          refraction_Cyclo_Axis_LE.id !== "0"
            ? refraction_Cyclo_Axis_LE.value
            : "",
        refractionAcceptanceSphRe:
          refraction_Acceptance_SPH_RE.id !== "0"
            ? refraction_Acceptance_SPH_RE.title
            : "",
        refractionAcceptanceSphLe:
          refractionAcceptanceSphLe.id !== "0"
            ? refraction_PGP_SPH_LE.title
            : "",
        refractionAcceptanceCylRe:
          refraction_Acceptance_CYL_RE.id !== "0"
            ? refraction_Acceptance_CYL_RE.title
            : "",
        refractionAcceptanceCylLe:
          refraction_Acceptance_CYL_LE.id !== "0"
            ? refraction_Acceptance_CYL_LE.title
            : "",
        refractionAcceptanceAxisRe:
          refraction_Acceptance_Axis_RE.id !== "0"
            ? refraction_Acceptance_Axis_RE.value
            : "",
        refractionAcceptanceAxisLe:
          refraction_Acceptance_Axis_LE.id !== "0"
            ? refraction_Acceptance_Axis_LE.value
            : "",
        refractionBCVARe: bcva_RE.id != "0" ? bcva_RE.title : "",
        refractionBCVASphLe: bcva_LE.id != "0" ? bcva_LE.title : "",
        refractionAddSphRe: add_sph_RE.id != "0" ? add_sph_RE.title : "",
        refractionAddSphLe: add_sph_LE.id != "0" ? add_sph_LE.title : "",
        refractionAddNvaRe: add_nva_RE.id != "0" ? add_nva_RE.title : "",
        refractionAddNvaLe: add_nva_LE.id != "0" ? add_nva_LE.title : "",
        refractionPapillaryDistSPhRe: pupilaryDistanceRE,
        refractionPapillaryDistIPdRe: pupilaryDistanceBoth,
        refractionPapillaryDistSPhLe: pupilaryDistanceLE,
        refractionRemarksRe: remarksRE,
        refractionRemarksLe: remarksLE,
        refractionLensMaterial: lensMaterial.id !== "0" ? lensMaterial.id : "",
        refractionFrameMaterial:
          frameMaterial.id !== "0" ? frameMaterial.id : "",
        refractionLensType: lensType.id !== "0" ? lensType.id : "",
        refractionSpecialityLens:
          specialityLens.id !== "0" ? specialityLens.id : "",
        refractionModeOfWear: modeOfWears.id !== "0" ? modeOfWears.id : "",
        refractionLensSurface_Coating:
          lensSurfaceCoating.id !== "0" ? lensSurfaceCoating.id : "",
        refractionLensTint: lensTint.id != "0" ? lensTint.id : "",
        specialInstruction:
          specialInstruction.id !== "0" ? specialInstruction.id : "",
        refractionRemarks2: "",
        spectaclesPrescribed: isPrescribed,

        // refractionPgpSphLe: refraction_PGP_SPH_LE.title,
        // refractionPgpSphRe: refraction_PGP_SPH_RE.title,
        // refractionPgpCylLe: refraction_PGP_CYL_LE.title,
        // refractionPgpCylRe: refraction_PGP_CYL_RE.title,
        // refractionPgpAxisLe: refraction_PGP_Axis_LE.value,
        // refractionPgpAxisRe: refraction_PGP_Axis_RE.value,
        // refractionPgpAddLe: refraction_PGP_Add_LE.value,
        // refractionPgpAddRe: refraction_PGP_Add_RE.value,
        // refractionDRYRETINOSphRe: refraction_Dry_SPH_RE.title,
        // refractionDRYRETINOSphLe: refraction_Dry_SPH_LE.title,
        // refractionDRYRETINOCylRe: "",
        // refractionDRYRETINOCylLe: "",
        // refractionDRYRETINOAXIS_RE: "",
        // refractionDRYRETINOAXIS_LE: "",
        // refractionCYCLORETINOSphRe: "",
        // refractionCYCLORETINOSphLe: "",
        // refractionCYCLORETINOCylRe: "",
        // refractionCYCLORETINOCylLe: "",
        // refractionCYCLORETINO_AXIS_RE: "",
        // refractionCYCLORETINO_AXIS_LE: "",
        // refractionAcceptanceSphRe: "",
        // refractionAcceptanceSphLe: "",
        // refractionAcceptanceCylRe: "",
        // refractionAcceptanceCylLe: "",
        // refractionAcceptanceAxisRe: "",
        // refractionAcceptanceAxisLe: "",
        // refractionBCVARe: "",
        refractionBCVALe: "",
        // refractionAddSphRe: "",
        // refractionAddSphLe: "",
        // refractionBCVASphLe: "",
        // refractionAddNvaRe: "",
        // refractionAddNvaLe: "",
        // refractionPapillaryDistSPhRe: "",
        // refractionPapillaryDistIPdRe: "",
        // refractionPapillaryDistSPhLe: "",
        // refractionRemarksRe: "",
        // refractionRemarksLe: "",
        // refractionLensMaterial: "",
        // refractionFrameMaterial: "",
        // refractionLensType: "",
        // refractionSpecialityLens: "",
        // refractionModeOfWear: "",
        // refractionLensSurface_Coating: "",
        // refractionLensTint: "",
        refractionSpecialInstruction: "",
        // refractionRemarks2: "",
        // spectaclesPrescribed: isPrescribed,
        // specialInstruction: "",
        mrId: mrId,
      })
    );
    if (response) {
      showDialog();
      setDialogMessage("Refraction Saved !");
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [diaglogMessage, setDialogMessage] = useState("");

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  useEffect(() => {
    getSPHHandler();
    getCylHandler();
    getAxisHandler();
    getAddsHandler();
    getLensMaterialHandler();
    getFrameMaterialHandler();
    getLensTypeHandler();
    getSpecialityLensHandler();
    getLensTintHandler();
    getModeOfHandler();
    getLensSurfaceCoatingHandler();
    getSpecialInstructionsHandler();
    getNvaHandler();
  }, []);

  const [refractionItem, setRefractionItem] = useState<any>();

  const getExistingData = async () => {
    const response = await findRefractionByMrId(db, mrId);
    if (response) {
      setRefractionItem(response);
    }
  };

  useEffect(() => {
    if (refractionItem) {
      const foundSPH_PGP_RE = sphItems.find(
        (item) => item.title == refractionItem.refractionPgpSphRe
      );
      if (foundSPH_PGP_RE) {
        setRefraction_PGP_SPH_RE(foundSPH_PGP_RE);
      }

      const foundSPH_DRY_RE = sphItems.find(
        (item) => item.title == refractionItem.refractionDRYRETINOSphRe
      );
      if (foundSPH_DRY_RE) {
        setRefraction_Dry_SPH_RE(foundSPH_DRY_RE);
      }

      const foundSPH_Cyclo_RE = sphItems.find(
        (item) => item.title == refractionItem.refractionCYCLORETINOSphRe
      );
      if (foundSPH_Cyclo_RE) {
        setRefraction_Cyclo_SPH_RE(foundSPH_Cyclo_RE);
      }

      const foundSPH_Acceptance_RE = sphItems.find(
        (item) => item.title == refractionItem.refractionAcceptanceSphRe
      );
      if (foundSPH_Acceptance_RE) {
        setRefraction_Acceptance_SPH_RE(foundSPH_Acceptance_RE);
      }

      const foundSPH_Add_RE = sphItems.find(
        (item) => item.title == refractionItem.refractionAddSphRe
      );
      if (foundSPH_Add_RE) {
        setAdd_SPH_RE(foundSPH_Add_RE);
      }

      //LE
      const foundSPH_PGP_LE = sphItems.find(
        (item) => item.title == refractionItem.refractionPgpSphLe
      );
      if (foundSPH_PGP_LE) {
        setRefraction_PGP_SPH_LE(foundSPH_PGP_LE);
      }

      const foundSPH_DRY_LE = sphItems.find(
        (item) => item.title == refractionItem.refractionDRYRETINOSphLe
      );
      if (foundSPH_DRY_LE) {
        setRefraction_Dry_SPH_LE(foundSPH_DRY_LE);
      }

      const foundSPH_Cyclo_LE = sphItems.find(
        (item) => item.title == refractionItem.refractionCYCLORETINOSphLe
      );
      if (foundSPH_Cyclo_LE) {
        setRefraction_Cyclo_SPH_LE(foundSPH_Cyclo_LE);
      }

      // const foundSPH_Acceptance_LE = sphItems.find(
      //   (item) => item.title == refractionItem.refractionAcceptanceSphle
      // );
      // if (foundSPH_Acceptance_LE) {
      //   acccec(foundSPH_Acceptance_LE);
      // }

      const foundSPH_Add_LE = sphItems.find(
        (item) => item.title == refractionItem.refractionAddSphle
      );
      if (foundSPH_Add_LE) {
        setAdd_SPH_LE(foundSPH_Add_LE);
      }
    }
  }, [refractionItem, sphItems]);

  useEffect(() => {
    if (refractionItem) {
      const foundCYL_PGP_RE = cylItems.find(
        (item) => item.title == refractionItem.refractionPgpCylRe
      );
      if (foundCYL_PGP_RE) {
        setRefraction_PGP_CYL_RE(foundCYL_PGP_RE);
      }

      const foundCYL_DRY_RE = cylItems.find(
        (item) => item.title == refractionItem.refractionDRYRETINOCylRe
      );
      if (foundCYL_DRY_RE) {
        setRefraction_Dry_CYL_RE(foundCYL_DRY_RE);
      }

      const foundCYL_Cyclo_RE = cylItems.find(
        (item) => item.title == refractionItem.refractionCYCLORETINOCylRe
      );
      if (foundCYL_Cyclo_RE) {
        setRefraction_Cyclo_CYL_RE(foundCYL_Cyclo_RE);
      }

      const foundCYL_Acceptance_RE = cylItems.find(
        (item) => item.title == refractionItem.refractionAcceptanceCylRe
      );
      if (foundCYL_Acceptance_RE) {
        setRefraction_Acceptance_CYL_RE(foundCYL_Acceptance_RE);
      }

      //LE
      const foundCYL_PGP_LE = cylItems.find(
        (item) => item.title == refractionItem.refractionPgpCylRe
      );
      if (foundCYL_PGP_LE) {
        setRefraction_PGP_CYL_LE(foundCYL_PGP_LE);
      }

      const foundCYL_DRY_LE = cylItems.find(
        (item) => item.title == refractionItem.refractionDRYRETINOCylRe
      );
      if (foundCYL_DRY_LE) {
        setRefraction_Dry_CYL_LE(foundCYL_DRY_LE);
      }

      const foundCYL_Cyclo_LE = cylItems.find(
        (item) => item.title == refractionItem.refractionCYCLORETINOCylRe
      );
      if (foundCYL_Cyclo_LE) {
        setRefraction_Cyclo_CYL_LE(foundCYL_Cyclo_LE);
      }

      const foundCYL_Acceptance_LE = cylItems.find(
        (item) => item.title == refractionItem.refractionAcceptanceCylLe
      );
      if (foundCYL_Acceptance_LE) {
        setRefraction_Acceptance_CYL_LE(foundCYL_Acceptance_LE);
      }
    }
  }, [refractionItem, cylItems]);

  useEffect(() => {
    if (refractionItem) {
      const found_PGP_Axis_RE = axisItems.find(
        (item) => item.value == refractionItem.refractionPgpAxisRe
      );
      if (found_PGP_Axis_RE) {
        setRefraction_PGP_Axis_RE(found_PGP_Axis_RE);
      }

      const found_DRY_Axis_RE = axisItems.find(
        (item) => item.value == refractionItem.refractionDRYRETINOAXIS_RE
      );
      if (found_DRY_Axis_RE) {
        setRefraction_Dry_Axis_RE(found_DRY_Axis_RE);
      }

      const found_Cyclo_Axis_RE = axisItems.find(
        (item) => item.value == refractionItem.refractionCYCLORETINO_AXIS_RE
      );
      if (found_Cyclo_Axis_RE) {
        setRefraction_Cyclo_Axis_RE(found_Cyclo_Axis_RE);
      }

      const found_Acceptance_Axis_RE = axisItems.find(
        (item) => item.value == refractionItem.refractionAcceptanceAxisRe
      );
      if (found_Acceptance_Axis_RE) {
        setRefraction_Acceptance_Axis_RE(found_Acceptance_Axis_RE);
      }

      //LE

      const found_PGP_Axis_LE = axisItems.find(
        (item) => item.value == refractionItem.refractionPgpAxisLe
      );
      if (found_PGP_Axis_LE) {
        setRefraction_PGP_Axis_LE(found_PGP_Axis_LE);
      }

      const found_DRY_Axis_LE = axisItems.find(
        (item) => item.value == refractionItem.refractionDRYRETINOAXIS_LE
      );
      if (found_DRY_Axis_LE) {
        setRefraction_Dry_Axis_LE(found_DRY_Axis_LE);
      }

      const found_Cyclo_Axis_LE = axisItems.find(
        (item) => item.value == refractionItem.refractionCYCLORETINO_AXIS_LE
      );
      if (found_Cyclo_Axis_LE) {
        setRefraction_Cyclo_Axis_LE(found_Cyclo_Axis_LE);
      }

      const found_Acceptance_Axis_LE = axisItems.find(
        (item) => item.value == refractionItem.refractionAcceptanceAxisLe
      );
      if (found_Acceptance_Axis_LE) {
        setRefraction_Acceptance_Axis_LE(found_Acceptance_Axis_LE);
      }
    }
  }, [axisItems, refractionItem]);

  useEffect(() => {
    if (refractionItem) {
      const found_PGP_Add_RE = addItems.find(
        (item) => item.value == refractionItem.refractionPgpAddRe
      );
      if (found_PGP_Add_RE) {
        setRefraction_PGP_Add_RE(found_PGP_Add_RE);
      }

      //LE

      const found_PGP_Add_LE = addItems.find(
        (item) => item.value == refractionItem.refractionPgpAddLe
      );
      if (found_PGP_Add_LE) {
        setRefraction_PGP_Add_LE(found_PGP_Add_LE);
      }
    }
  }, [addItems, refractionItem]);

  useEffect(() => {
    if (refractionItem) {
      const found_Add_NVA_RE = nvaItems.find(
        (item) => item.title == refractionItem.refractionAddNvaRe
      );
      if (found_Add_NVA_RE) {
        setAdd_Nva_RE(found_Add_NVA_RE);
      }

      const found_BCVA_RE = nvaItems.find(
        (item) => item.title == refractionItem.refractionBCVARe
      );
      if (found_BCVA_RE) {
        setBcva_RE(found_BCVA_RE);
      }

      //LE
      const found_Add_NVA_LE = nvaItems.find(
        (item) => item.title == refractionItem.refractionAddNvaLe
      );
      if (found_Add_NVA_LE) {
        setAdd_Nva_LE(found_Add_NVA_LE);
      }

      const found_BCVA_LE = nvaItems.find(
        (item) => item.title == refractionItem.refractionBCVALe
      );
      if (found_BCVA_LE) {
        setBcva_LE(found_BCVA_LE);
      }
    }
  }, [nvaItems, refractionItem]);

  useEffect(() => {
    if (refractionItem) {
      setPupilaryDistanceRE(refractionItem.refractionPapillaryDistSPhRe);
      setPupilaryDistanceLE(refractionItem.refractionPapillaryDistSPhLe);
      setPupilaryDistanceBoth(refractionItem.refractionPapillaryDistIPdRe);
      setRemarksRE(refractionItem.refractionRemarksRe);
      setRemarksLE(refractionItem.refractionRemarksLe);
      setIsPrescribed(refractionItem.spectaclesPrescribed);
    }
  }, [refractionItem]);

  useEffect(() => {
    if (refractionItem) {
      const foundItem = lensMaterialItems.find(
        (item) => item.id == refractionItem.refractionLensMaterial
      );
      if (foundItem) {
        setLensMaterial(foundItem);
      }
    }
  }, [refractionItem, lensMaterialItems]);

  useEffect(() => {
    if (refractionItem) {
      const foundItem = frameMaterialItems.find(
        (item) => item.id == refractionItem.refractionFrameMaterial
      );
      if (foundItem) {
        setFrameMaterial(foundItem);
      }
    }
  }, [refractionItem, frameMaterialItems]);

  useEffect(() => {
    if (refractionItem) {
      const foundItem = lensTypeItems.find(
        (item) => item.id == refractionItem.refractionLensType
      );
      if (foundItem) {
        setLensType(foundItem);
      }
    }
  }, [refractionItem, lensTypeItems]);

  useEffect(() => {
    if (refractionItem) {
      const foundItem = specialityLensItems.find(
        (item) => item.id == refractionItem.refractionSpecialityLens
      );
      if (foundItem) {
        setSpecialityLens(foundItem);
      }
    }
  }, [refractionItem, specialityLensItems]);

  useEffect(() => {
    if (refractionItem) {
      const foundItem = modeOfWearItems.find(
        (item) => item.id == refractionItem.refractionModeOfWear
      );
      if (foundItem) {
        setModeOfWears(foundItem);
      }
    }
  }, [refractionItem, modeOfWearItems]);

  useEffect(() => {
    if (refractionItem) {
      const foundItem = lensSurfaceCoatingItems.find(
        (item) => item.id == refractionItem.refractionLensSurface_Coating
      );
      if (foundItem) {
        setLensSurfaceCoating(foundItem);
      }
    }
  }, [refractionItem, lensSurfaceCoatingItems]);

  useEffect(() => {
    if (refractionItem) {
      const foundItem = lensTintItems.find(
        (item) => item.id == refractionItem.refractionLensTint
      );
      if (foundItem) {
        setLensTint(foundItem);
      }
    }
  }, [refractionItem, lensTintItems]);

  useEffect(() => {
    if (refractionItem) {
      const foundItem = specialInstructionItems.find(
        (item) => item.id == refractionItem.specialInstruction
      );
      if (foundItem) {
        setSpecialInstruction(foundItem);
      }
    }
  }, [refractionItem, specialInstructionItems]);

  useFocusEffect(
    useCallback(() => {
      getExistingData();
      return () => {
        console.log("Screen unfocused");
      };
    }, [])
  );

  return (
    <View style={styles.screen}>
      {/* Box 1 */}
      <Collapsible title="OD ( RE )">
        <View style={styles.box}>
          {/* Row 1 */}
          <View>
            <Text>PGP</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="SPH"
                items={sphItems}
                onSelect={refraction_PGP_SPH_REHandler}
                selectedItem={refraction_PGP_SPH_RE.title}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="CYL"
                items={cylItems}
                onSelect={refraction_PGP_CYL_REHandler}
                selectedItem={refraction_PGP_CYL_RE.title}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomDropdown
                label="AXIS"
                items={[BLANK_DROPDOWN_MODEL, ...axisItems]}
                selectedItem={refraction_PGP_Axis_RE}
                onChange={refraction_PGP_Axis_REHandler}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomDropdown
                label="ADD"
                items={[BLANK_DROPDOWN_MODEL, ...addItems]}
                selectedItem={refraction_PGP_Add_RE}
                onChange={refraction_PGP_Add_REHandler}
              />
            </View>
          </View>
          {/* Row 2 */}
          <View>
            <Text>DRY RETINOSCOPY</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="SPH"
                items={sphItems}
                onSelect={refraction_Dry_SPH_REHandler}
                selectedItem={refraction_Dry_SPH_RE.title}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="CYL"
                items={cylItems}
                onSelect={refraction_Dry_CYL_REHandler}
                selectedItem={refraction_Dry_CYL_RE.title}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomDropdown
                label="AXIS"
                items={[BLANK_DROPDOWN_MODEL, ...axisItems]}
                selectedItem={refraction_Dry_Axis_RE}
                onChange={refraction_Dry_Axis_REHandler}
              />
            </View>
          </View>
          {/* Row 3 */}
          <View>
            <Text>CYCLO RETINOSCOPY</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="SPH"
                items={sphItems}
                onSelect={refraction_Cyclo_SPH_REHandler}
                selectedItem={refraction_Cyclo_SPH_RE.title}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="CYL"
                items={cylItems}
                onSelect={refraction_Cyclo_CYL_REHandler}
                selectedItem={refraction_Cyclo_CYL_RE.title}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomDropdown
                label="AXIS"
                items={[BLANK_DROPDOWN_MODEL, ...axisItems]}
                selectedItem={refraction_Cyclo_Axis_RE}
                onChange={refraction_Cyclo_Axis_REHandler}
              />
            </View>
          </View>
          {/* Row 4 */}
          <View>
            <Text>ACCEPTANCE</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="SPH"
                items={sphItems}
                onSelect={refraction_Acceptance_SPH_REHandler}
                selectedItem={refraction_Acceptance_SPH_RE.title}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="CYL"
                items={cylItems}
                onSelect={refraction_Acceptance_CYL_REHandler}
                selectedItem={refraction_Acceptance_CYL_RE.title}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomDropdown
                label="AXIS"
                items={[BLANK_DROPDOWN_MODEL, ...axisItems]}
                selectedItem={refraction_Acceptance_Axis_RE}
                onChange={refraction_Acceptance_Axis_REHandler}
              />
            </View>
          </View>
          {/* Row 5 */}
          <View>
            <Text>BCVA</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="BCVA"
                items={nvaItems}
                onSelect={bcva_REHandler}
                selectedItem={bcva_RE.title}
              />
            </View>
          </View>

          {/* Row 6 */}
          <View>
            <Text>ADD</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="SPH"
                items={sphItems}
                onSelect={setAdd_SPH_RE}
                selectedItem={add_sph_RE.title}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="NVA"
                items={nvaItems}
                onSelect={add_Nva_REHandler}
                selectedItem={add_nva_RE.title}
              />
            </View>
          </View>
          {/* Row 7 */}
          <View>
            <Text>Pupilary Distance</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <TextInput
                label="Pupilary Distance ( RE )"
                value={pupilaryDistanceRE}
                onChangeText={pupilaryDistanceREChangeHandler}
                mode="outlined"
              />
            </View>
            <View style={styles.rowItem}>
              <TextInput
                label="IPD Both"
                value={pupilaryDistanceBoth}
                onChangeText={pupilaryDistanceBothChangeHandler}
                mode="outlined"
              />
            </View>
          </View>
          {/* Row 8 */}
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <TextInput
                label="Remarks ( RE )"
                value={remarksRE}
                onChangeText={remarksREChangeHandler}
                mode="outlined"
              />
            </View>
          </View>
        </View>
      </Collapsible>

      <Collapsible title="OS ( LE )">
        {/* Box 2 */}
        <View style={styles.box}>
          {/* Row 1 */}
          <View>
            <Text>PGP</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="SPH"
                items={sphItems}
                onSelect={refraction_PGP_SPH_LEHandler}
                selectedItem={refraction_PGP_SPH_LE.title}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="CYL"
                items={cylItems}
                onSelect={refraction_PGP_CYL_LEHandler}
                selectedItem={refraction_PGP_CYL_LE.title}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomDropdown
                label="AXIS"
                items={[BLANK_DROPDOWN_MODEL, ...axisItems]}
                selectedItem={refraction_PGP_Axis_LE}
                onChange={refraction_PGP_Axis_LEHandler}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomDropdown
                label="ADD"
                items={[BLANK_DROPDOWN_MODEL, ...addItems]}
                selectedItem={refraction_PGP_Add_LE}
                onChange={refraction_PGP_Add_LEHandler}
              />
            </View>
          </View>
          {/* Row 2 */}
          <View>
            <Text>DRY RETINOSCOPY</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="SPH"
                items={sphItems}
                onSelect={refraction_Dry_SPH_LEHandler}
                selectedItem={refraction_PGP_SPH_LE.title}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="CYL"
                items={cylItems}
                onSelect={refraction_Dry_CYL_LEHandler}
                selectedItem={refraction_Dry_CYL_LE.title}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomDropdown
                label="AXIS"
                items={[BLANK_DROPDOWN_MODEL, ...axisItems]}
                selectedItem={refraction_Dry_Axis_LE}
                onChange={refraction_Dry_Axis_LEHandler}
              />
            </View>
          </View>
          {/* Row 3 */}
          <View>
            <Text>CYCLO RETINOSCOPY</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="SPH"
                items={sphItems}
                onSelect={refraction_Cyclo_SPH_LEHandler}
                selectedItem={refraction_Cyclo_SPH_LE.title}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="CYL"
                items={cylItems}
                onSelect={refraction_Cyclo_CYL_LEHandler}
                selectedItem={refraction_Cyclo_CYL_LE.title}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomDropdown
                label="AXIS"
                items={[BLANK_DROPDOWN_MODEL, ...axisItems]}
                selectedItem={refraction_Cyclo_Axis_LE}
                onChange={refraction_Cyclo_Axis_LEHandler}
              />
            </View>
          </View>
          {/* Row 4 */}
          <View>
            <Text>ACCEPTANCE</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="SPH"
                items={sphItems}
                onSelect={refraction_Acceptance_SPH_REHandler}
                selectedItem={refraction_Acceptance_SPH_RE.title}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="CYL"
                items={cylItems}
                onSelect={refraction_Acceptance_CYL_LEHandler}
                selectedItem={refraction_Acceptance_CYL_LE.title}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomDropdown
                label="AXIS"
                items={[BLANK_DROPDOWN_MODEL, ...axisItems]}
                selectedItem={refraction_Acceptance_Axis_LE}
                onChange={refraction_Acceptance_Axis_LEHandler}
              />
            </View>
          </View>
          {/* Row 5 */}
          <View>
            <Text>BCVA</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="BCVA"
                items={nvaItems}
                onSelect={bcva_LEHandler}
                selectedItem={bcva_LE.title}
              />
            </View>
          </View>

          {/* Row 6 */}
          <View>
            <Text>ADD</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="SPH"
                items={sphItems}
                onSelect={add_sph_LEHandler}
                selectedItem={add_sph_LE.title}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="NVA"
                items={nvaItems}
                onSelect={add_nva_LEHandler}
                selectedItem={add_nva_LE.title}
              />
            </View>
          </View>
          {/* Row 7 */}
          <View>
            <Text>Pupilary Distance</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <TextInput
                label="Pupilary Distance ( LE )"
                value={pupilaryDistanceLE}
                onChangeText={pupilaryDistanceLEChangeHandler}
                mode="outlined"
              />
            </View>
          </View>
          {/* Row 8 */}
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <TextInput
                label="Remarks ( RE )"
                value={remarksLE}
                onChangeText={remarksLEChangeHandler}
                mode="outlined"
              />
            </View>
          </View>
        </View>
      </Collapsible>

      {/* Box 3 */}
      <Collapsible title="Lens Information">
        <View style={styles.box}>
          {/* Row 1 */}
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <CustomDropdown
                label="Lens Material"
                items={[BLANK_DROPDOWN_MODEL, ...lensMaterialItems]}
                selectedItem={lensMaterial}
                onChange={lensMaterialChanageHandler}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomDropdown
                label="Frame Material"
                items={[BLANK_DROPDOWN_MODEL, ...frameMaterialItems]}
                selectedItem={frameMaterial}
                onChange={frameMaterialChanageHandler}
              />
            </View>
          </View>
          {/* Row 2 */}
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <CustomDropdown
                label="Lens Type"
                items={[BLANK_DROPDOWN_MODEL, ...lensTypeItems]}
                selectedItem={lensType}
                onChange={lensTypeChanageHandler}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomDropdown
                label="Speciality Lens"
                items={[BLANK_DROPDOWN_MODEL, ...specialityLensItems]}
                selectedItem={specialityLens}
                onChange={specialityLensChanageHandler}
              />
            </View>
          </View>
          {/* Row 3 */}
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <CustomDropdown
                label="Mode Of Wear"
                items={[BLANK_DROPDOWN_MODEL, ...modeOfWearItems]}
                selectedItem={modeOfWears}
                onChange={modeOfWearChanageHandler}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomDropdown
                label="Lens Surface Coating"
                items={[BLANK_DROPDOWN_MODEL, ...lensSurfaceCoatingItems]}
                selectedItem={lensSurfaceCoating}
                onChange={lensSurfaceCoatingChanageHandler}
              />
            </View>
          </View>
          {/* Row 4 */}
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <CustomDropdown
                label="Lens Tint"
                items={[BLANK_DROPDOWN_MODEL, ...lensTintItems]}
                selectedItem={lensTint}
                onChange={lensTintChanageHandler}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomDropdown
                label="Special Instructions"
                items={[BLANK_DROPDOWN_MODEL, ...specialInstructionItems]}
                selectedItem={specialInstruction}
                onChange={specialInstructionChanageHandler}
              />
            </View>
          </View>
          {/* Row 5 */}
          <View style={styles.row}>
            <Checkbox
              status={isPrescribed ? "checked" : "unchecked"}
              onPress={() => {
                setIsPrescribed(!isPrescribed);
              }}
            />
            <Text>Spectacle Prescribed</Text>
          </View>
        </View>
      </Collapsible>

      <View style={styles.action}>
        <Button onPress={saveRefractionHandler} mode="contained">
          Save
        </Button>
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text>{diaglogMessage}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} loading={isLoading}>
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: "white",
    flex: 1,
  },
  box: {
    borderWidth: 0.5,
    padding: 10,
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowItem: {
    flexBasis: 1,
    flexGrow: 1,
    padding: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
  },
  action: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default Refraction;
