import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { GOOD_BAD_RADIO_ITEMS, YES_NO_RADIO_ITEMS } from "@/constants/Data";
import CustomRadioGroup from "../utils/CustomRadioGroup";
import { setScreeningItem } from "@/store/slices/student-slice";

const SpectacleStatus = () => {
  const screeningItem = useSelector(
    (state: RootState) => state.studentSlice.screeningItem
  );
  const dispatch = useDispatch();

  const usingSpectacleChangeHandler = (val: string) => {
    if (val == "NO") {
      dispatch(
        setScreeningItem({
          ...screeningItem,
          haveSpecNow: "",
          specCondition: "",
          usingSpectacle: val,
          usingSpecHasError: false,
          usingSpecErrorMessage: "",
        })
      );
    } else {
      dispatch(
        setScreeningItem({
          ...screeningItem,
          usingSpectacle: val,
          usingSpecHasError: false,
          usingSpecErrorMessage: "",
        })
      );
    }
  };

  const haveSpecNowChangeHandler = (val: string) => {
    if (val == "NO") {
      dispatch(
        setScreeningItem({
          ...screeningItem,
          haveSpecNow: val,
          specCondition: "",
          haveSpecNowHasError: false,
          haveSpecNowErrorMessage: "",
        })
      );
    } else {
      dispatch(
        setScreeningItem({
          ...screeningItem,
          haveSpecNow: val,
          haveSpecNowHasError: false,
          haveSpecNowErrorMessage: "",
        })
      );
    }
  };

  const spectacleConditionChangeHandler = (val: string) => {
    if (val == "GOOD") {
      dispatch(
        setScreeningItem({
          ...screeningItem,
          specCondition: val,
          specConditionHasError: false,
          specConditionErrorMessage: "",
        })
      );
    } else {
      dispatch(
        setScreeningItem({
          ...screeningItem,
          specCondition: val,
          isNormal: false,
          specConditionHasError: false,
          specConditionErrorMessage: "",
        })
      );
    }
  };
  return (
    <View>
      <View>
        <Text style={styles.headerTitle}>Spectacle Status</Text>
      </View>
      <View style={styles.divider}></View>
      <View>
        <View>
          <Text>Do you use spectacles</Text>
        </View>
        <View>
          <CustomRadioGroup
            label="Using Spectacle"
            items={YES_NO_RADIO_ITEMS}
            selectedOption={screeningItem.usingSpectacle}
            onChange={usingSpectacleChangeHandler}
            isError={screeningItem.usingSpecHasError}
            errorMessage={screeningItem.usingSpecErrorMessage}
          />
        </View>
      </View>
      {/* Row 2 */}
      {screeningItem.usingSpectacle == "YES" && (
        <View>
          <View>
            <Text>Do you have the spectacles now ?</Text>
          </View>
          <View>
            <CustomRadioGroup
              label="Have Spectacle"
              items={YES_NO_RADIO_ITEMS}
              selectedOption={screeningItem.haveSpecNow}
              onChange={haveSpecNowChangeHandler}
              isError={screeningItem.haveSpecNowHasError}
              errorMessage={screeningItem.haveSpecNowErrorMessage}
            />
          </View>
        </View>
      )}
      {screeningItem.haveSpecNow == "YES" && (
        <View>
          <View>
            <Text>Spectacles Condition</Text>
          </View>
          <View>
            <CustomRadioGroup
              label="Spectacle Condition"
              items={GOOD_BAD_RADIO_ITEMS}
              selectedOption={screeningItem.specCondition}
              onChange={spectacleConditionChangeHandler}
              isError={screeningItem.specConditionHasError}
              errorMessage={screeningItem.specConditionErrorMessage}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    borderWidth: 0.3,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default SpectacleStatus;
