import { setScreeningItem } from "@/store/slices/student-slice";
import { RootState } from "@/store/store";
import { Text, View, StyleSheet, Alert, NativeModules } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomRadioGroup from "../utils/CustomRadioGroup";
import { YES_NO_DROPDOWN_ITEMS, YES_NO_RADIO_ITEMS } from "@/constants/Data";
import CustomDropdown from "../utils/CustomDropdown";
import { BLANK_DROPDOWN_MODEL } from "@/constants/BlankModels";
// import { NativeModules } from "react-native";
import { Button } from "react-native-paper";
import { useEffect } from "react";
import StyledDropdown from "../new_UI/StyledDropdown";

const { IntentLauncher } = NativeModules;

const VisionTest = () => {
  const screeningItem = useSelector(
    (state: RootState) => state.studentSlice.screeningItem
  );
  const dispatch = useDispatch();

  const unableToPerformTestChangeHandler = (val: string) => {
    dispatch(
      setScreeningItem({
        ...screeningItem,
        unableToPerformVisionTest: val,
      })
    );
  };

  const canReadLogMARLEChangeHandler = (value?: string) => {
    console.log("value", value);
    if (value == "SELECT") {
      dispatch(
        setScreeningItem({
          ...screeningItem,
          canReadLogmarLE: BLANK_DROPDOWN_MODEL,
        })
      );
    } else {
      const foundItem = YES_NO_DROPDOWN_ITEMS.find(
        (item) => item.value == value
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

  const canReadLogMARREChangeHandler = (value?: string) => {
    if (value == "SELECT") {
      dispatch(
        setScreeningItem({
          ...screeningItem,
          canReadLogmarRE: BLANK_DROPDOWN_MODEL,
        })
      );
    } else {
      const foundItem = YES_NO_DROPDOWN_ITEMS.find(
        (item) => item.value == value
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

  const openOccularApp = async () => {
    console.log("Opening Ocular app ...");
    let isExist = await IntentLauncher.isAppInstalled("me.vgsoham.eyeapp");
    if (isExist == true) {
      const params = {
        packageName: "me.vgsoham.eyeapp", // Package name of the external app
        className: "me.vgsoham.eyeapp.TakeD2DFarVisionTestActivity", // Class name of the activity
        extra: {
          chart: "ETDRS",
          row: 5,
          crowding: true,
          crowdingSpacer: 1.0,
          currentEye: "OD",
          screenBothEyes: true,
        },
      };

      try {
        const result = await IntentLauncher.startActivity(params);
        let data = result.data;
        let dataObj = JSON.parse(data);
        if (dataObj?.completed == true) {
          let od = dataObj?.OD;
          let os = dataObj?.OS;
          let correct = true;
          let odValue = "";
          if (od == "correct") {
            odValue = "Yes";
          } else {
            odValue = "No";
          }
          let osValue = "";
          if (os == "correct") {
            osValue = "YES";
          } else {
            osValue = "NO";
          }

          console.log("ODRE", odValue);
          console.log("OSLE", osValue);

          const foundItemRE = YES_NO_DROPDOWN_ITEMS.find(
            (item) => item.value == odValue
          );

          const foundItemLE = YES_NO_DROPDOWN_ITEMS.find(
            (item) => item.value == osValue
          );

          if (foundItemLE && foundItemRE) {
            dispatch(
              setScreeningItem({
                ...screeningItem,
                canReadLogmarRE: foundItemRE,
                canReadLogmarLE: foundItemLE,
              })
            );
          }

          // handleInputChange(odValue, "withoutSpcOdRe");
          // handleInputChange(osValue, "withoutSpcOsLe");
          // if (odValue == "Yes" && osValue == "Yes") {
          //   setOccularTestVisible(true);
          // } else {
          //   setOccularTestVisible(false);
          // }

          // handleInputChange("", "ocularComplaintData");
          // handleInputChange([], "ocularComplaintList");
          // if (odValue == "No" || osValue == "No") {
          //   setNormalCase(false);
          //   setIsTle(false);
          //   setIsColorVisionTest(false);
          //   handleInputChange("", "colorVisionRe");
          //   handleInputChange("", "colorVisionLe");
          // }
        } else {
        }
      } catch (error) {
        console.error("Failed to launch activity:", error);
      }
    } else {
      Alert.alert("Alert", "OcularCheck App is not installed");
    }
  };

  return (
    <View style={styles.box}>
      <View>
        <Text style={styles.headerTitle}>
          Vision Test{" "}
          {`${
            screeningItem.haveSpecNow == "YES"
              ? "With Spectacle"
              : "Without Spectacle"
          }`}
        </Text>
      </View>
      <View style={styles.divider}></View>
      <View>
        <View>
          <Text>Unable to perform vision test</Text>
        </View>
        <View>
          <CustomRadioGroup
            label="Vision Test"
            items={YES_NO_RADIO_ITEMS}
            selectedOption={screeningItem.unableToPerformVisionTest}
            onChange={unableToPerformTestChangeHandler}
          />
        </View>
      </View>

      {screeningItem.unableToPerformVisionTest == "NO" && (
        <>
          {/* View 2 */}
          <View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Button mode="outlined" onPress={openOccularApp}>
                Ocular Check
              </Button>
            </View>
            <View>
              <Text>Can Read LogMar 0.2 ( RE ) ?</Text>
            </View>
            <View>
              <View style={styles.row}>
                <View style={styles.rowItem}>
                  <StyledDropdown
                    label="OS ( LE )"
                    items={[BLANK_DROPDOWN_MODEL, ...YES_NO_DROPDOWN_ITEMS]}
                    selectedItem={screeningItem.canReadLogmarLE}
                    onChange={canReadLogMARLEChangeHandler}
                  />
                </View>
                <View style={styles.rowItem}>
                  <StyledDropdown
                    label="OD ( RE )"
                    items={[BLANK_DROPDOWN_MODEL, ...YES_NO_DROPDOWN_ITEMS]}
                    selectedItem={screeningItem.canReadLogmarRE}
                    onChange={canReadLogMARREChangeHandler}
                  />
                </View>
              </View>
            </View>
          </View>
        </>
      )}
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
  },
  rowItem: {
    flexBasis: 1,
    flexGrow: 1,
    padding: 5,
  },
});

export default VisionTest;
