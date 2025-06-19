import {
  BLANK_DROPDOWN_MODEL,
  BLANK_GRID_DROPDOWN_MODEl,
} from "@/constants/BlankModels";
import { NORMAL_ABNORMAL_DROPDOWN_ITEMS } from "@/constants/Data";
import { GridDropdownModel } from "@/models/ui/GridDropdownModel";
import { setScreeningItem } from "@/store/slices/student-slice";
import { RootState } from "@/store/store";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown from "../utils/CustomDropdown";
import CustomGridDropdown from "../utils/CustomGridDropdown";
import InputBox from "../ui/InputBox";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { findAllAxis, findAllCyls, findAllSphs } from "@/database/database";
import { useSQLiteContext } from "expo-sqlite";
import { useFocusEffect } from "expo-router";

const AutoRef = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.userSlice.token);
  const screeningItem = useSelector(
    (state: RootState) => state.studentSlice.screeningItem
  );
  const db = useSQLiteContext();
  const [sphItems, setSphItems] = useState<GridDropdownModel[]>([]);
  const [cylItems, setCylItems] = useState<GridDropdownModel[]>([]);
  const [axisItems, setAxisItems] = useState<DropdownModel[]>([]);

  const visionWithAutoRefLEChangeHandler = (val?: string) => {
    if (val == "0") {
      dispatch(
        setScreeningItem({
          ...screeningItem,
          visionAutoRefLE: BLANK_DROPDOWN_MODEL,
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
            visionAutoRefLE: foundItem,
          })
        );
      }
    }
  };

  const visionWithAutoRefREChangeHandler = (val?: string) => {
    if (val == "0") {
      dispatch(
        setScreeningItem({
          ...screeningItem,
          visionAutoRefRE: BLANK_DROPDOWN_MODEL,
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
            visionAutoRefRE: foundItem,
          })
        );
      }
    }
  };

  const acceptance_SPH_LEChangeHandler = (item: GridDropdownModel) => {
    dispatch(
      setScreeningItem({
        ...screeningItem,
        acceptanceSPHLE: item,
      })
    );
  };

  const acceptance_CYL_LEChangeHandler = (item: GridDropdownModel) => {
    dispatch(
      setScreeningItem({
        ...screeningItem,
        acceptanceCYLLE: item,
      })
    );
  };

  const acceptance_Axis_LEChangeHandler = (val?: string) => {
    if (val == "0") {
      dispatch(
        setScreeningItem({
          ...screeningItem,
          acceptanceAXISLE: BLANK_DROPDOWN_MODEL,
        })
      );
    } else {
      const foundItem = axisItems.find((item) => item.value == val);
      if (foundItem) {
        dispatch(
          setScreeningItem({
            ...screeningItem,
            acceptanceAXISLE: foundItem,
          })
        );
      }
    }
  };

  const acceptance_SPH_REChangeHandler = (item: GridDropdownModel) => {
    dispatch(
      setScreeningItem({
        ...screeningItem,
        acceptanceSPHRE: item,
      })
    );
  };

  const acceptance_CYL_REChangeHandler = (item: GridDropdownModel) => {
    dispatch(
      setScreeningItem({
        ...screeningItem,
        acceptanceCYLRE: item,
      })
    );
  };

  const acceptance_Axis_REChangeHandler = (val?: string) => {
    if (val == "0") {
      dispatch(
        setScreeningItem({
          ...screeningItem,
          acceptanceAXISRE: BLANK_DROPDOWN_MODEL,
        })
      );
    } else {
      const foundItem = axisItems.find((item) => item.value == val);
      if (foundItem) {
        dispatch(
          setScreeningItem({
            ...screeningItem,
            acceptanceAXISRE: foundItem,
          })
        );
      }
    }
  };

  const IPD_AutoRefChangeHandler = (val: string) => {
    dispatch(
      setScreeningItem({
        ...screeningItem,
        IPDBoth: val,
      })
    );
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

  // useEffect(() => {
  //   if (
  //     screeningItem.visionAutoRefLE.value == "NORMAL" &&
  //     screeningItem.visionAutoRefRE.value == "NORMAL"
  //   ) {
  //     dispatch(
  //       setScreeningItem({
  //         ...screeningItem,
  //       })
  //     );
  //   } else {
  //     dispatch(
  //       setScreeningItem({
  //         ...screeningItem,
  //       })
  //     );
  //   }
  // }, [screeningItem.visionAutoRefLE, screeningItem.visionAutoRefRE]);

  useFocusEffect(
    useCallback(() => {
      getSPHHandler();
      getCylHandler();
      getAxisHandler();
      return () => {};
    }, [])
  );

  return (
    <View>
      <View>
        <Text>Vision With Autoref</Text>
      </View>

      {/* Row 1 */}
      <View>
        <View>
          <Text>Autoref Reading</Text>
        </View>
        <View>
          <View>
            <View>
              <CustomDropdown
                items={[
                  BLANK_DROPDOWN_MODEL,
                  ...NORMAL_ABNORMAL_DROPDOWN_ITEMS,
                ]}
                label="OD (LE )"
                selectedItem={screeningItem.visionAutoRefLE}
                onChange={visionWithAutoRefLEChangeHandler}
              />
            </View>
            <View>
              <CustomDropdown
                items={[
                  BLANK_DROPDOWN_MODEL,
                  ...NORMAL_ABNORMAL_DROPDOWN_ITEMS,
                ]}
                label="OD (RE )"
                selectedItem={screeningItem.visionAutoRefRE}
                onChange={visionWithAutoRefREChangeHandler}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Row 2 */}
      <View>
        <View>
          <Text>Acceptance OD ( LE )</Text>
        </View>
        <View>
          <View>
            <View>
              <CustomGridDropdown
                label="SPH"
                items={[BLANK_GRID_DROPDOWN_MODEl, ...sphItems]}
                selectedItem={screeningItem.acceptanceSPHLE.title}
                onSelect={acceptance_SPH_LEChangeHandler}
              />
            </View>
            <View>
              <CustomGridDropdown
                label="CYL"
                items={[BLANK_GRID_DROPDOWN_MODEl, ...cylItems]}
                selectedItem={screeningItem.acceptanceCYLLE.title}
                onSelect={acceptance_CYL_LEChangeHandler}
              />
            </View>
            <View>
              <CustomDropdown
                items={[BLANK_DROPDOWN_MODEL, ...axisItems]}
                label="AXIS"
                selectedItem={screeningItem.acceptanceAXISLE}
                onChange={acceptance_Axis_LEChangeHandler}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Row 3 */}
      <View>
        <View>
          <Text>Acceptance OD ( RE )</Text>
        </View>
        <View>
          <View>
            <View>
              <CustomGridDropdown
                label="SPH"
                items={sphItems}
                selectedItem={screeningItem.acceptanceSPHRE.title}
                onSelect={acceptance_SPH_REChangeHandler}
              />
            </View>
            <View>
              <CustomGridDropdown
                label="CYL"
                items={cylItems}
                selectedItem={screeningItem.acceptanceCYLRE.title}
                onSelect={acceptance_CYL_REChangeHandler}
              />
            </View>
            <View>
              <CustomDropdown
                items={[BLANK_DROPDOWN_MODEL, ...axisItems]}
                label="AXIS"
                selectedItem={screeningItem.acceptanceAXISRE}
                onChange={acceptance_Axis_REChangeHandler}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Row 4 */}
      <View>
        <View>
          <Text>IPD ( Both )</Text>
        </View>
        <View>
          <View>
            <InputBox
              placeholder="IPD"
              value={screeningItem.IPDBoth}
              onChangeText={IPD_AutoRefChangeHandler}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
export default AutoRef;
