import { OcularModel } from "@/models/other-masters/OcularModel";
import { setScreeningItem } from "@/store/slices/student-slice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import CustomRadioGroup from "../utils/CustomRadioGroup";
import { useCallback, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { YES_NO_RADIO_ITEMS } from "@/constants/Data";
import { Checkbox, Modal, Portal } from "react-native-paper";
import OcularList from "./modals/OcularList";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { findAllOcularComplaints, findReachConfigs } from "@/database/database";
import { setAllOculars, uncheckAllOculars } from "@/store/slices/ocular-slice";
import { BLANK_REACH_CONFIGURATION_MODEL } from "@/constants/BlankModels";

const OcularTest = () => {
  const dispatch = useDispatch();
  const db = useSQLiteContext();
  const ocularTypes = useSelector(
    (state: RootState) => state.ocularSlice.ocularTypes
  );
  const [reachConfigs, setReachConfigs] = useState(
    BLANK_REACH_CONFIGURATION_MODEL
  );
  console.log("Reach Configs", reachConfigs);
  const screeningItem = useSelector(
    (state: RootState) => state.studentSlice.screeningItem
  );

  const [isOcularModal, setIsOcularModal] = useState(false);

  const openOcularModal = () => {
    setIsOcularModal(true);
  };

  const closeOcularModal = () => {
    setIsOcularModal(false);
  };

  const ocularComplaintChangeHandler = (val: string) => {
    if (val == "NO") {
      dispatch(
        setScreeningItem({
          ...screeningItem,
          ocularComplaint: val,
          isBinucularTestVisible: false,
          ocularList: "",
        })
      );
      dispatch(uncheckAllOculars());
    } else {
      dispatch(
        setScreeningItem({
          ...screeningItem,
          ocularComplaint: val,
        })
      );
      openOcularModal();
    }
  };

  const ocularComplaintDataChangeHandler = (item: OcularModel) => {
    // // let arr2: string[] = [];
    // let arr = ocularTypes.map((item2) => {
    //   if (item2.id == item.id) {
    //     let data = { ...item2 };
    //     data.isSelected = !data.isSelected;
    //     return data;
    //   } else {
    //     return item2;
    //   }
    // });
    // dispatch(setAllOculars(arr));
    // // setOcularComplaintList(arr);
    // let arr2: string[] = [];
    // // let isBinacular = false;

    // arr.map((item: any) => {
    //   if (item.isSelected) {
    //     arr2.push(item.ocularName);
    //   }
    // });

    let arr = ocularTypes.map((item2) => {
      if (item2.id == item.id) {
        let data = { ...item2 };
        data.isSelected = !data.isSelected;
        return data;
      } else {
        return item2;
      }
    });

    dispatch(setAllOculars(arr));

    let isBinacularRequired = false;
    let ocularList = "";
    arr.map((item: any, index: number) => {
      console.log("other ocular", item);
      if (item.isSelected) {
        if (item.isBinacular) {
          isBinacularRequired = true;
        }
        if (index == 0) {
          ocularList = item.ocularName;
        } else {
          ocularList = ocularList + "," + item.ocularName;
        }
      }
    });
    let isBinacular = false;
    let isTle = false;

    if (
      isBinacularRequired &&
      (reachConfigs.isNpcTest ||
        reachConfigs.isCoverTest ||
        reachConfigs.isPlus2DTest)
    ) {
      isBinacular = true;
    } else {
      isBinacular = false;
    }

    if (isBinacularRequired) {
      isTle = false;
    } else {
      isTle = true;
    }

    dispatch(
      setScreeningItem({
        ...screeningItem,
        isBinacularTestRequired: isBinacularRequired,
        isBinucularTestVisible: isBinacular,
        isTorchlightVisible: isTle,
        ocularList: ocularList,
      })
    );
  };

  const getOcularComplaintsHandler = async () => {
    const response: any = await findAllOcularComplaints(db);
    if (response) {
      dispatch(setAllOculars(response));
    }
  };

  const getReachConfigsHandler = async () => {
    const response: any = await findReachConfigs(db);
    if (response) {
      setReachConfigs(response);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getOcularComplaintsHandler();
      getReachConfigsHandler();
      return () => {};
    }, [])
  );

  return (
    <View style={styles.box}>
      <View>
        <Text style={styles.headerTitle}>Ocular Detail</Text>
      </View>
      <View style={styles.divider}></View>
      <View>
        <View>
          <CustomRadioGroup
            label="Ocular Complaint"
            items={YES_NO_RADIO_ITEMS}
            selectedOption={screeningItem.ocularComplaint}
            onChange={ocularComplaintChangeHandler}
          />
        </View>
        {screeningItem.ocularList !== "" && (
          <Pressable onPress={openOcularModal}>
            <View style={{ borderWidth: 0.3, padding: 10, borderRadius: 5 }}>
              <Text>{screeningItem.ocularList}</Text>
            </View>
          </Pressable>
        )}
      </View>
      {screeningItem.ocularComplaint == "YES" && <View></View>}
      <Portal>
        <Modal visible={isOcularModal}>
          <OcularList
            ocularTypes={ocularTypes}
            onChange={ocularComplaintDataChangeHandler}
            onClose={closeOcularModal}
          />
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    borderWidth: 0.3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowItem: {
    flexBasis: 1,
    flexGrow: 1,
  },
});

export default OcularTest;
