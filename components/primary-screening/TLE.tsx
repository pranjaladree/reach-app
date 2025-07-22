import { BLANK_DROPDOWN_MODEL } from "@/constants/BlankModels";
import { NORMAL_ABNORMAL_DROPDOWN_ITEMS } from "@/constants/Data";
import { setScreeningItem } from "@/store/slices/student-slice";
import { RootState } from "@/store/store";
import { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown from "../utils/CustomDropdown";
import { TorchLightModel } from "@/models/other-masters/TorchLightModel";
import {
  setAllTorchLights,
  uncheckAllTles,
} from "@/store/slices/torch-light-slice";
import { getAllTorchLights } from "@/http/torchlight-http";
import { Checkbox, Modal, Portal } from "react-native-paper";
import { findAllTorchlightFindings } from "@/database/database";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import TorchlightList from "./modals/TorchlightList";
import StyledDropdown from "../new_UI/StyledDropdown";
import { Colors } from "@/constants/Colors";

const TLE = () => {
  const db = useSQLiteContext();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.userSlice.token);

  const [isOcularModal, setIsOcularModal] = useState(false);

  const openOcularModal = () => {
    setIsOcularModal(true);
  };

  const closeOcularModal = () => {
    setIsOcularModal(false);
  };

  const screeningItem = useSelector(
    (state: RootState) => state.studentSlice.screeningItem
  );
  const torchlightFindings = useSelector(
    (state: RootState) => state.torchLightSlice.torchlightFindings
  );

  const torchLightCheckLEChangeHandler = (val?: string) => {
    setIsInitial(false);
    if (val == "0") {
      dispatch(
        setScreeningItem({
          ...screeningItem,
          torchlightCheckLE: BLANK_DROPDOWN_MODEL,
        })
      );
    } else {
      const foundItem = NORMAL_ABNORMAL_DROPDOWN_ITEMS.find(
        (item) => item.value == val
      );
      if (foundItem) {
        dispatch(
          setScreeningItem({
            ...screeningItem,
            torchlightCheckLE: foundItem,
          })
        );
      }
    }
  };

  const torchLightCheckREChangeHandler = (val?: string) => {
    setIsInitial(false);
    if (val == "0") {
      dispatch(
        setScreeningItem({
          ...screeningItem,
          torchlightCheckRE: BLANK_DROPDOWN_MODEL,
        })
      );
    } else {
      const foundItem = NORMAL_ABNORMAL_DROPDOWN_ITEMS.find(
        (item) => item.value == val
      );
      if (foundItem) {
        dispatch(
          setScreeningItem({
            ...screeningItem,
            torchlightCheckRE: foundItem,
          })
        );
      }
    }
  };

  const [tleFindings, setTleFindings] = useState("");

  const torchLightFindingChangeHandler = (item: TorchLightModel) => {
    // let arr2: string[] = [];
    let arr = torchlightFindings.map((item2: any) => {
      if (item2.id == item.id) {
        let data = { ...item2 };
        data.isSelected = !data.isSelected;
        return data;
      } else {
        return item2;
      }
    });
    dispatch(setAllTorchLights(arr));

    let arr2: string[] = [];
    let isRefer = false;
    arr.map((item: any) => {
      if (item.isSelected) {
        if (item.action == "Refer") {
          isRefer = true;
        }
        arr2.push(item.finding);
      }
    });
    console.log("TLE REFER *****************", isRefer);

    let tleItem = "";
    let count = 0;
    arr2.map((item) => {
      console.log("TLE ********ER", item);
      if (count == 0) {
        tleItem = tleItem + item;
      } else {
        tleItem = tleItem + " , " + item;
      }
      count++;
    });
    setTleFindings(tleItem);
    dispatch(
      setScreeningItem({
        ...screeningItem,
        torchlightFindings: tleItem,
        isTleRefer: isRefer,
      })
    );
  };

  const getTorchlightFindings = async () => {
    const response: any = await findAllTorchlightFindings(db);
    console.log("TLEEE *******", response);
    if (response) {
      dispatch(setAllTorchLights(response));
    }
  };

  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    if (
      screeningItem.torchlightCheckLE.value == "ABNORMAL" ||
      screeningItem.torchlightCheckRE.value == "ABNORMAL"
    ) {
      if (!isInitial) {
        openOcularModal();
      }
    }
  }, [screeningItem.torchlightCheckLE, screeningItem.torchlightCheckRE]);

  useEffect(() => {
    if (
      screeningItem.torchlightCheckLE.value == "NORMAL" &&
      screeningItem.torchlightCheckRE.value == "NORMAL"
    ) {
      setTleFindings("");
      dispatch(uncheckAllTles());
      if (!screeningItem.isAutoRefVisible) {
        dispatch(
          setScreeningItem({
            ...screeningItem,
            isColorVisionTestVisible: true,
          })
        );
      }
    }
  }, [screeningItem.torchlightCheckLE, screeningItem.torchlightCheckRE]);

  useFocusEffect(
    useCallback(() => {
      getTorchlightFindings();
      return () => {};
    }, [])
  );

  return (
    <View style={styles.box}>
      <View>
        <Text style={styles.headerTitle}>TLE</Text>
      </View>
      <View style={styles.divider}></View>
      <View>
        <View>
          <Text>Torch Light Examination</Text>
        </View>
        <View>
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <StyledDropdown
                label="OD ( LE )"
                items={[
                  BLANK_DROPDOWN_MODEL,
                  ...NORMAL_ABNORMAL_DROPDOWN_ITEMS,
                ]}
                selectedItem={screeningItem.torchlightCheckLE}
                onChange={torchLightCheckLEChangeHandler}
              />
            </View>
            <View style={styles.rowItem}>
              <StyledDropdown
                label="OD ( RE )"
                items={[
                  BLANK_DROPDOWN_MODEL,
                  ...NORMAL_ABNORMAL_DROPDOWN_ITEMS,
                ]}
                selectedItem={screeningItem.torchlightCheckRE}
                onChange={torchLightCheckREChangeHandler}
              />
            </View>
          </View>
        </View>
      </View>

      {tleFindings !== "" && (
        <View>
          <Text>Torch Light Findings</Text>
          <Pressable onPress={openOcularModal}>
            <View style={{ borderWidth: 0.3, padding: 10, borderRadius: 5 }}>
              <Text>{tleFindings}</Text>
            </View>
          </Pressable>
        </View>
      )}
      <Portal>
        <Modal visible={isOcularModal}>
          <TorchlightList
            torchlightFindings={torchlightFindings}
            onChange={torchLightFindingChangeHandler}
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
    fontWeight: "700",
    color: Colors.primary,
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    borderWidth: 0.3,
    borderColor: Colors.primary,
  },
  row: {
    flexDirection: "row",
  },
  rowItem: {
    flexBasis: 1,
    flexGrow: 1,
    padding: 5,
  },
});

export default TLE;
