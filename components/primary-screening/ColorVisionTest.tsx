import { View, Text, StyleSheet } from "react-native";
import CustomDropdown from "../utils/CustomDropdown";
import { useDispatch, useSelector } from "react-redux";
import { setScreeningItem } from "@/store/slices/student-slice";
import { RootState } from "@/store/store";
import { BLANK_DROPDOWN_MODEL } from "@/constants/BlankModels";
import {
  COLOR_VISION_DROPDOWN_ITEMS,
  NORMAL_ABNORMAL_DROPDOWN_ITEMS,
} from "@/constants/Data";
import StyledDropdown from "../new_UI/StyledDropdown";
import { Colors } from "@/constants/Colors";

interface Props {
  isColorVisionTest: boolean;
}

const ColorVisionTest = ({ isColorVisionTest }: Props) => {
  const dispatch = useDispatch();
  const screeningItem = useSelector(
    (state: RootState) => state.studentSlice.screeningItem
  );
  const colorVisionLEChangeHandler = (val?: string) => {
    if (val == "SELECT") {
      dispatch(
        setScreeningItem({
          ...screeningItem,
          colorVisionLE: BLANK_DROPDOWN_MODEL,
        })
      );
    } else {
      const foundItem = COLOR_VISION_DROPDOWN_ITEMS.find(
        (item) => item.value == val
      );
      if (foundItem) {
        dispatch(
          setScreeningItem({
            ...screeningItem,
            colorVisionLE: foundItem,
            isColorVisionTestRequired: isColorVisionTest,
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
          colorVisionRE: BLANK_DROPDOWN_MODEL,
        })
      );
    } else {
      const foundItem = COLOR_VISION_DROPDOWN_ITEMS.find(
        (item) => item.value == val
      );
      if (foundItem) {
        dispatch(
          setScreeningItem({
            ...screeningItem,
            colorVisionRE: foundItem,
            isColorVisionTestRequired: isColorVisionTest,
          })
        );
      }
    }
  };

  return (
    <View style={styles.box}>
      <View>
        <Text style={styles.headerTitle}>Color Vision Test</Text>
      </View>
      <View style={styles.divider}></View>
      <View style={styles.row}>
        <View style={styles.rowItem}>
          <StyledDropdown
            items={[BLANK_DROPDOWN_MODEL, ...COLOR_VISION_DROPDOWN_ITEMS]}
            label="OS (LE )"
            selectedItem={screeningItem.colorVisionLE}
            onChange={colorVisionLEChangeHandler}
          />
        </View>

        <View style={styles.rowItem}>
          <StyledDropdown
            items={[BLANK_DROPDOWN_MODEL, ...COLOR_VISION_DROPDOWN_ITEMS]}
            label="OD (RE )"
            selectedItem={screeningItem.colorVisionRE}
            onChange={colorVisionREChangeHandler}
          />
        </View>
      </View>
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

export default ColorVisionTest;
