import { View, Text } from "react-native";
import CustomDropdown from "../utils/CustomDropdown";
import { useDispatch, useSelector } from "react-redux";
import { setScreeningItem } from "@/store/slices/student-slice";
import { RootState } from "@/store/store";
import { BLANK_DROPDOWN_MODEL } from "@/constants/BlankModels";
import {
  COLOR_VISION_DROPDOWN_ITEMS,
  NORMAL_ABNORMAL_DROPDOWN_ITEMS,
} from "@/constants/Data";

const ColorVisionTest = () => {
  const dispatch = useDispatch();
  const screeningItem = useSelector(
    (state: RootState) => state.studentSlice.screeningItem
  );
  const colorVisionLEChangeHandler = (val?: string) => {
    if (val == "SELECT") {
      dispatch(
        setScreeningItem({
          ...screeningItem,
          canReadLogmarLE: BLANK_DROPDOWN_MODEL,
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
            canReadLogmarLE: foundItem,
          })
        );
      }
    }
  };

  const colorVisionREChangeHandler = (val?: string) => {
    if (val == "SELECT") {
      dispatch(
        setScreeningItem({
          ...screeningItem,
          canReadLogmarLE: BLANK_DROPDOWN_MODEL,
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
            canReadLogmarRE: foundItem,
          })
        );
      }
    }
  };

  return (
    <View>
      <View>
        <View>
          <Text>Color Vision</Text>
        </View>
        <View>
          <View>
            <CustomDropdown
              items={[BLANK_DROPDOWN_MODEL, ...COLOR_VISION_DROPDOWN_ITEMS]}
              label="OS (LE )"
              selectedItem={screeningItem.colorVisionLE}
              onChange={colorVisionLEChangeHandler}
            />
          </View>

          <View>
            <CustomDropdown
              items={[BLANK_DROPDOWN_MODEL, ...COLOR_VISION_DROPDOWN_ITEMS]}
              label="OD (RE )"
              selectedItem={screeningItem.colorVisionRE}
              onChange={colorVisionREChangeHandler}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ColorVisionTest;
