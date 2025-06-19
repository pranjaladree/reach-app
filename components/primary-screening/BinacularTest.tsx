import { BLANK_DROPDOWN_MODEL } from "@/constants/BlankModels";
import {
  NORMAL_ABNORMAL_DROPDOWN_ITEMS,
  YES_NO_DROPDOWN_ITEMS,
} from "@/constants/Data";
import { setScreeningItem } from "@/store/slices/student-slice";
import { RootState } from "@/store/store";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown from "../utils/CustomDropdown";

const BinacularTest = () => {
  const dispatch = useDispatch();
  const screeningItem = useSelector(
    (state: RootState) => state.studentSlice.screeningItem
  );
  console.log("ScreeningItem", screeningItem);

  const coverTestChangeHandler = (val?: string) => {
    if (val == "0") {
      dispatch(
        setScreeningItem({
          ...screeningItem,
          coverTest: BLANK_DROPDOWN_MODEL,
        })
      );
    } else {
      const foundItem = NORMAL_ABNORMAL_DROPDOWN_ITEMS.find(
        (item) => item.value == val
      );
      console.log(foundItem);
      if (foundItem) {
        dispatch(
          setScreeningItem({
            ...screeningItem,
            coverTest: foundItem,
          })
        );
      }
    }
  };

  const npcTestChangeHandler = (val?: string) => {
    if (val == "0") {
      dispatch(
        setScreeningItem({
          ...screeningItem,
          npcTest: BLANK_DROPDOWN_MODEL,
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
            npcTest: foundItem,
          })
        );
      }
    }
  };

  const plus2DTestLEChangeHandler = (val?: string) => {
    if (val == "0") {
      dispatch(
        setScreeningItem({
          ...screeningItem,
          plus2DTestLE: BLANK_DROPDOWN_MODEL,
        })
      );
    } else {
      const foundItem = YES_NO_DROPDOWN_ITEMS.find((item) => item.value == val);
      if (foundItem) {
        dispatch(
          setScreeningItem({
            ...screeningItem,
            plus2DTestLE: foundItem,
          })
        );
      }
    }
  };

  const plus2DTestREChangeHandler = (val?: string) => {
    if (val == "0") {
      dispatch(
        setScreeningItem({
          ...screeningItem,
          plus2DTestRE: BLANK_DROPDOWN_MODEL,
        })
      );
    } else {
      const foundItem = YES_NO_DROPDOWN_ITEMS.find((item) => item.id == val);
      if (foundItem) {
        dispatch(
          setScreeningItem({
            ...screeningItem,
            plus2DTestLE: foundItem,
          })
        );
      }
    }
  };

  return (
    <View>
      <View>
        <View>
          <Text>Cover Test</Text>
        </View>
        <View>
          <CustomDropdown
            items={[BLANK_DROPDOWN_MODEL, ...NORMAL_ABNORMAL_DROPDOWN_ITEMS]}
            label="Cover Test"
            selectedItem={screeningItem.coverTest}
            onChange={coverTestChangeHandler}
          />
        </View>
      </View>
      <View>
        <View>
          <Text>NPC</Text>
        </View>
        <View>
          <CustomDropdown
            items={[BLANK_DROPDOWN_MODEL, ...NORMAL_ABNORMAL_DROPDOWN_ITEMS]}
            label="NPC"
            selectedItem={screeningItem.npcTest}
            onChange={npcTestChangeHandler}
          />
        </View>
      </View>
      <View>
        <View>
          <Text>Can Student Read using +2.0D lens</Text>
        </View>
        <View>
          <View>
            <View>
              <CustomDropdown
                items={[BLANK_DROPDOWN_MODEL, ...YES_NO_DROPDOWN_ITEMS]}
                label="OD (LE)"
                selectedItem={screeningItem.plus2DTestLE}
                onChange={plus2DTestLEChangeHandler}
              />
            </View>
            <View>
              <CustomDropdown
                items={[BLANK_DROPDOWN_MODEL, ...YES_NO_DROPDOWN_ITEMS]}
                label="OD (RE)"
                selectedItem={screeningItem.plus2DTestRE}
                onChange={plus2DTestREChangeHandler}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BinacularTest;
