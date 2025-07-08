import {
  findAllDvas,
  findAllNvas,
  findAllPhs,
  findOneMRTag,
  findOneVisualAcuity,
  getMasterDataFromDB,
  saveVisualAcuity,
  TABLES,
} from "@/database/database";
import { DistanceDvaModel } from "@/models/other-masters/DistanceDvaModel";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomGridDropdown from "../utils/CustomGridDropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  BLANK_GRID_DROPDOWN_MODEl,
  BLANK_VISUAL_ACUITY_MODEL,
} from "@/constants/BlankModels";
import { GridDropdownModel } from "@/models/ui/GridDropdownModel";
import { Button, Dialog, Portal } from "react-native-paper";
import { VisualAcuityModel } from "@/models/patient-at-fixed-facilty/VisualAcuityModel";
import { useFocusEffect } from "expo-router";
import CustomButton from "../utils/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import CustomTabs, { TabItem } from "../utils/CustomTabs";

const TAB_ITEMS = [
  { title: "With Spectacle", disabled: false },
  { title: "Without Spectacle", disabled: false },
];
//
interface Props {
  mrId: string;
  isMRTagDone: boolean;
}

const VisualAcuity = ({ mrId, isMRTagDone }: Props) => {
  console.log("MR ID", mrId);
  const [activeTab, setActiveTab] = useState(TAB_ITEMS[0]);
  const db = useSQLiteContext();
  const [distanceDvaItems, setDistanceDvaItems] = useState<GridDropdownModel[]>(
    []
  );
  const [phItems, setPhItems] = useState<GridDropdownModel[]>([]);
  const [nvaItems, setNvaItems] = useState<GridDropdownModel[]>([]);
  const dispatch = useDispatch();
  // Without Specs
  const [distanceDvaWithoutSpecLE, setDistanceDvaWithouSpecLE] = useState(
    BLANK_GRID_DROPDOWN_MODEl
  );
  const [distanceDvaWithoutSpecRE, setDistanceDvaWithoutSpecRE] = useState(
    BLANK_GRID_DROPDOWN_MODEl
  );
  const [visualExam_WithoutSpecs_PH_LE, setVisualExam_WithoutSpecs_PH_LE] =
    useState(BLANK_GRID_DROPDOWN_MODEl);
  const [visualExam_WithoutSpecs_PH_RE, setVisualExam_WithoutSpecs_PH_RE] =
    useState(BLANK_GRID_DROPDOWN_MODEl);
  const [visualExam_WithoutSpecs_NVA_RE, setVisualExam_WithoutSpecs_NVA_RE] =
    useState(BLANK_GRID_DROPDOWN_MODEl);
  const [visualExam_WithoutSpecs_NVA_LE, setVisualExam_WithoutSpecs_NVA_LE] =
    useState(BLANK_GRID_DROPDOWN_MODEl);

  // With Specs
  const [distanceDvaWithSpecLE, setDistanceDvaWithSpecLE] = useState(
    BLANK_GRID_DROPDOWN_MODEl
  );
  const [distanceDvaWithSpecRE, setDistanceDvaWithSpecRE] = useState(
    BLANK_GRID_DROPDOWN_MODEl
  );
  const [visualExam_WithSpecs_PH_LE, setVisualExam_WithSpecs_PH_LE] = useState(
    BLANK_GRID_DROPDOWN_MODEl
  );
  const [visualExam_WithSpecs_PH_RE, setVisualExam_WithSpecs_PH_RE] = useState(
    BLANK_GRID_DROPDOWN_MODEl
  );
  const [visualExam_WithSpecs_NVA_RE, setVisualExam_WithSpecs_NVA_RE] =
    useState(BLANK_GRID_DROPDOWN_MODEl);
  const [visualExam_WithSpecs_NVA_LE, setVisualExam_WithSpecs_NVA_LE] =
    useState(BLANK_GRID_DROPDOWN_MODEl);

  const tabChangeHandler = (item: TabItem) => {
    setActiveTab(item);
  };

  // Without Specs

  const distanceDvaWithoutSpecLEHandler = (item: GridDropdownModel) => {
    setDistanceDvaWithouSpecLE(item);
  };

  const distanceDvaWithoutSpecREHandler = (item: GridDropdownModel) => {
    setDistanceDvaWithoutSpecRE(item);
  };

  const visualExam_WithoutSpecs_PH_LEHandler = (item: GridDropdownModel) => {
    setVisualExam_WithoutSpecs_PH_LE(item);
  };

  const visualExam_WithoutSpecs_PH_REHandler = (item: GridDropdownModel) => {
    setVisualExam_WithoutSpecs_PH_RE(item);
  };

  const visualExam_WithoutSpecs_NVA_REHandler = (item: GridDropdownModel) => {
    setVisualExam_WithoutSpecs_NVA_RE(item);
  };

  const visualExam_WithoutSpecs_NVA_LEHandler = (item: GridDropdownModel) => {
    setVisualExam_WithoutSpecs_NVA_LE(item);
  };

  // With Specs

  const selectDistanceDvaWithSpecLEHandler = (item: GridDropdownModel) => {
    setDistanceDvaWithSpecLE(item);
  };

  const selectDistanceDvaWithSpecREHandler = (item: GridDropdownModel) => {
    setDistanceDvaWithSpecRE(item);
  };

  const selectVisualExam_WithSpecs_PH_LEHandler = (item: GridDropdownModel) => {
    setVisualExam_WithSpecs_PH_LE(item);
  };

  const selectVisualExam_WithSpecs_PH_REHandler = (item: GridDropdownModel) => {
    setVisualExam_WithSpecs_PH_RE(item);
  };

  const selectVisualExam_WithSpecs_NVA_REHandler = (
    item: GridDropdownModel
  ) => {
    setVisualExam_WithSpecs_NVA_RE(item);
  };

  const selectVisualExam_WithSpecs_NVA_LEHandler = (
    item: GridDropdownModel
  ) => {
    setVisualExam_WithSpecs_NVA_LE(item);
  };

  const [isLoading, setIsLoading] = useState(false);

  const saveVisualAcuityHandler = async () => {
    const response = await saveVisualAcuity(
      db,
      new VisualAcuityModel({
        id: mrId,
        visualExamWithSpecsDvaLe:
          distanceDvaWithSpecLE.id == "0" ? "" : distanceDvaWithSpecLE.title,
        visualExamWithSpecsDvaRe:
          distanceDvaWithSpecRE.id == "0" ? "" : distanceDvaWithSpecRE.title,
        visualExamWithSpecsNvaLe:
          visualExam_WithSpecs_NVA_LE.id == "0"
            ? ""
            : visualExam_WithSpecs_NVA_LE.title,
        visualExamWithSpecsNvaRe:
          visualExam_WithSpecs_NVA_RE.id == "0"
            ? ""
            : visualExam_WithSpecs_NVA_RE.title,
        visualExamWithSpecsPhLe:
          visualExam_WithSpecs_PH_LE.id == "0"
            ? ""
            : visualExam_WithSpecs_PH_LE.title,
        visualExamWithSpecsPhRe:
          visualExam_WithSpecs_PH_RE.id == "0"
            ? ""
            : visualExam_WithSpecs_PH_RE.title,
        visualExamWithoutSpecsDvaLe:
          distanceDvaWithoutSpecLE.id == "0"
            ? ""
            : distanceDvaWithoutSpecLE.title,
        visualExamWithoutSpecsDvaRe:
          distanceDvaWithoutSpecRE.id == "0"
            ? ""
            : distanceDvaWithoutSpecRE.title,
        visualExamWithoutSpecsNvaLe:
          visualExam_WithoutSpecs_NVA_LE.id == "0"
            ? ""
            : visualExam_WithoutSpecs_NVA_LE.title,
        visualExamWithoutSpecsNvaRe:
          visualExam_WithoutSpecs_NVA_RE.id == "0"
            ? ""
            : visualExam_WithoutSpecs_NVA_RE.title,
        visualExamWithoutSpecsPhLe:
          visualExam_WithoutSpecs_PH_LE.id == "0"
            ? ""
            : visualExam_WithoutSpecs_PH_LE.title,
        visualExamWithoutSpecsPhRe:
          visualExam_WithoutSpecs_PH_RE.id == "0"
            ? ""
            : visualExam_WithoutSpecs_PH_RE.title,
        mrId: mrId,
      })
    );
    if (response) {
      showDialog();
      setDialogMessage("Visual Acuity Saved !");
    }
  };

  const getDistanceDvaHandler = async () => {
    const response: any = await findAllDvas(db);
    if (response) {
      setDistanceDvaItems(response);
    }
  };

  const getPHHandler = async () => {
    const response: any = await findAllPhs(db);
    if (response) {
      setPhItems(response);
    }
  };

  const getNVAHandler = async () => {
    const response: any = await findAllNvas(db);
    if (response) {
      setNvaItems(response);
    }
  };

  useEffect(() => {
    getDistanceDvaHandler();
    getPHHandler();
    getNVAHandler();
  }, []);

  const [visualItem, setVisualItem] = useState(BLANK_VISUAL_ACUITY_MODEL);

  const setExistingData = async () => {
    const response = await findOneVisualAcuity(db, mrId);
    console.log("EXISTING", response);
    if (response) {
      setVisualItem(response.data);
    }
  };

  useEffect(() => {
    console.log("visual Item", visualItem);
    if (visualItem.id != "0" && distanceDvaItems) {
      const foundDvaWithoutSpecLE = distanceDvaItems.find(
        (item) => item.title == visualItem.visualExamWithoutSpecsDvaLe
      );
      if (foundDvaWithoutSpecLE) {
        setDistanceDvaWithouSpecLE(foundDvaWithoutSpecLE);
      }
      const foundDvaWithoutSpeRE = distanceDvaItems.find(
        (item) => item.title == visualItem.visualExamWithoutSpecsDvaRe
      );
      if (foundDvaWithoutSpeRE) {
        setDistanceDvaWithoutSpecRE(foundDvaWithoutSpeRE);
      }
      const foundDvaWithSpecLE = distanceDvaItems.find(
        (item) => item.title == visualItem.visualExamWithSpecsDvaLe
      );
      if (foundDvaWithSpecLE) {
        setDistanceDvaWithSpecLE(foundDvaWithSpecLE);
      }
      const foundDvaWithSpeRE = distanceDvaItems.find(
        (item) => item.title == visualItem.visualExamWithSpecsDvaRe
      );
      if (foundDvaWithSpeRE) {
        setDistanceDvaWithSpecRE(foundDvaWithSpeRE);
      }
    }
  }, [distanceDvaItems, visualItem]);

  useEffect(() => {
    console.log("visual Item", visualItem);
    if (visualItem.id != "0" && phItems) {
      const foundPhWithoutSpecLE = phItems.find(
        (item) => item.title == visualItem.visualExamWithoutSpecsDvaLe
      );
      if (foundPhWithoutSpecLE) {
        setVisualExam_WithoutSpecs_PH_LE(foundPhWithoutSpecLE);
      }
      const foundDvaWithoutSpeRE = phItems.find(
        (item) => item.title == visualItem.visualExamWithoutSpecsPhRe
      );
      if (foundDvaWithoutSpeRE) {
        setVisualExam_WithoutSpecs_PH_RE(foundDvaWithoutSpeRE);
      }
      const foundDvaWithSpecLE = phItems.find(
        (item) => item.title == visualItem.visualExamWithSpecsPhLe
      );
      if (foundDvaWithSpecLE) {
        setVisualExam_WithSpecs_PH_LE(foundDvaWithSpecLE);
      }
      const foundDvaWithSpeRE = phItems.find(
        (item) => item.title == visualItem.visualExamWithSpecsPhRe
      );
      if (foundDvaWithSpeRE) {
        setVisualExam_WithSpecs_PH_RE(foundDvaWithSpeRE);
      }
    }
  }, [phItems, visualItem]);

  useEffect(() => {
    console.log("visual Item", visualItem);
    if (visualItem.id != "0" && nvaItems) {
      const foundPhWithoutSpecLE = nvaItems.find(
        (item) => item.title == visualItem.visualExamWithoutSpecsNvaLe
      );
      if (foundPhWithoutSpecLE) {
        setVisualExam_WithoutSpecs_NVA_LE(foundPhWithoutSpecLE);
      }
      const foundDvaWithoutSpeRE = nvaItems.find(
        (item) => item.title == visualItem.visualExamWithoutSpecsNvaRe
      );
      if (foundDvaWithoutSpeRE) {
        setVisualExam_WithoutSpecs_NVA_RE(foundDvaWithoutSpeRE);
      }
      const foundDvaWithSpecLE = nvaItems.find(
        (item) => item.title == visualItem.visualExamWithSpecsNvaLe
      );
      if (foundDvaWithSpecLE) {
        setVisualExam_WithSpecs_NVA_LE(foundDvaWithSpecLE);
      }
      const foundDvaWithSpeRE = nvaItems.find(
        (item) => item.title == visualItem.visualExamWithSpecsNvaRe
      );
      if (foundDvaWithSpeRE) {
        setVisualExam_WithSpecs_NVA_RE(foundDvaWithSpeRE);
      }
    }
  }, [nvaItems, visualItem]);

  const [diaglogMessage, setDialogMessage] = useState("");

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  useFocusEffect(
    useCallback(() => {
      getDistanceDvaHandler();
      getPHHandler();
      getNVAHandler();
      setExistingData();
      return () => {
        console.log("Screen unfocused");
      };
    }, [])
  );

  return (
    <View style={styles.screen}>
      {/* Tabs */}
      <CustomTabs
        items={TAB_ITEMS}
        activeTab={activeTab.title}
        onPress={tabChangeHandler}
      />
      {/* Box 1 */}
      {activeTab == TAB_ITEMS[0] && (
        <View style={styles.box}>
          {/* Row 1 */}
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="Distance DVA (OD RE)"
                items={distanceDvaItems}
                onSelect={selectDistanceDvaWithSpecREHandler}
                selectedItem={distanceDvaWithSpecRE.title}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="Distance DVA (OS LE)"
                items={distanceDvaItems}
                onSelect={selectDistanceDvaWithSpecLEHandler}
                selectedItem={distanceDvaWithSpecLE.title}
              />
            </View>
          </View>
          {/* Row 2 */}
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="PH (OD RE)"
                items={phItems}
                onSelect={selectVisualExam_WithSpecs_PH_REHandler}
                selectedItem={visualExam_WithSpecs_PH_RE.title}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="PH (OS LE)"
                items={phItems}
                onSelect={selectVisualExam_WithSpecs_PH_LEHandler}
                selectedItem={visualExam_WithSpecs_PH_LE.title}
              />
            </View>
          </View>
          {/* Row 3 */}
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="Near NVA (OD RE)"
                items={nvaItems}
                onSelect={selectVisualExam_WithSpecs_NVA_REHandler}
                selectedItem={visualExam_WithSpecs_NVA_RE.title}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="Near NVA (OS LE)"
                items={nvaItems}
                onSelect={selectVisualExam_WithSpecs_NVA_LEHandler}
                selectedItem={visualExam_WithSpecs_NVA_LE.title}
              />
            </View>
          </View>
        </View>
      )}
      {/* Box 2 */}
      {activeTab == TAB_ITEMS[1] && (
        <View style={styles.box}>
          {/* Row 1 */}
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="Distance DVA (OD RE)"
                items={distanceDvaItems}
                onSelect={distanceDvaWithoutSpecREHandler}
                selectedItem={distanceDvaWithoutSpecRE.title}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="Distance DVA (OS LE)"
                items={distanceDvaItems}
                onSelect={distanceDvaWithoutSpecLEHandler}
                selectedItem={distanceDvaWithoutSpecLE.title}
              />
            </View>
          </View>
          {/* Row 2 */}
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="PH(OD RE)"
                items={phItems}
                onSelect={visualExam_WithoutSpecs_PH_REHandler}
                selectedItem={visualExam_WithoutSpecs_PH_RE.title}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="PH (OS LE)"
                items={phItems}
                onSelect={visualExam_WithoutSpecs_PH_LEHandler}
                selectedItem={visualExam_WithoutSpecs_PH_LE.title}
              />
            </View>
          </View>
          {/* Row 3 */}
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="Near NVA (OD RE)"
                items={nvaItems}
                onSelect={visualExam_WithoutSpecs_NVA_REHandler}
                selectedItem={visualExam_WithoutSpecs_NVA_RE.title}
              />
            </View>
            <View style={styles.rowItem}>
              <CustomGridDropdown
                label="Near NVA (OS LE)"
                items={nvaItems}
                onSelect={visualExam_WithoutSpecs_NVA_LEHandler}
                selectedItem={visualExam_WithoutSpecs_NVA_LE.title}
              />
            </View>
          </View>
        </View>
      )}

      <View style={{ marginTop: 10 }}>
        <CustomButton
          title="Save"
          onPress={saveVisualAcuityHandler}
          icon={
            <Ionicons name="checkmark-circle-outline" size={20} color="white" />
          }
          disabled={!isMRTagDone}
        />
      </View>
      {/* <View style={styles.action}>
        <Button onPress={saveVisualAcuityHandler} mode="contained">
          Save
        </Button>
      </View> */}

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>REACHLite</Dialog.Title>
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
  },
  box: {
    borderWidth: 0.5,
    padding: 10,
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
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

export default VisualAcuity;
