import { BLANK_DROPDOWN_MODEL } from "@/constants/BlankModels";
import {
  NORMAL_ABNORMAL_DROPDOWN_ITEMS,
  YES_NO_DROPDOWN_ITEMS,
} from "@/constants/Data";
import { setScreeningItem } from "@/store/slices/student-slice";
import { RootState } from "@/store/store";
import { View, Text, Alert, NativeModules } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown from "../utils/CustomDropdown";
import StyledDropdown from "../new_UI/StyledDropdown";
import { Button } from "react-native-paper";
const { IntentLauncher } = NativeModules;

const BinacularTest = () => {
  const dispatch = useDispatch();
  const screeningItem = useSelector(
    (state: RootState) => state.studentSlice.screeningItem
  );

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
    console.log("***********", val);
    if (val == "0") {
      dispatch(
        setScreeningItem({
          ...screeningItem,
          plus2DTestRE: BLANK_DROPDOWN_MODEL,
        })
      );
    } else {
      const foundItem = YES_NO_DROPDOWN_ITEMS.find((item) => item.value == val);
      if (foundItem) {
        dispatch(
          setScreeningItem({
            ...screeningItem,
            plus2DTestRE: foundItem,
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
            odValue = "YES";
          } else {
            odValue = "NO";
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
                plus2DTestRE: foundItemRE,
                plus2DTestLE: foundItemLE,
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
    <View>
      <View>
        <View>
          <StyledDropdown
            items={[BLANK_DROPDOWN_MODEL, ...NORMAL_ABNORMAL_DROPDOWN_ITEMS]}
            label="Cover Test"
            selectedItem={screeningItem.coverTest}
            onChange={coverTestChangeHandler}
          />
        </View>
      </View>
      <View>
        <View>
          <StyledDropdown
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
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Button mode="outlined" onPress={openOccularApp}>
            Ocular Check
          </Button>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexBasis: 1, flexGrow: 1, padding: 5 }}>
            <StyledDropdown
              items={[BLANK_DROPDOWN_MODEL, ...YES_NO_DROPDOWN_ITEMS]}
              label="OD (LE)"
              selectedItem={screeningItem.plus2DTestLE}
              onChange={plus2DTestLEChangeHandler}
            />
          </View>
          <View style={{ flexBasis: 1, flexGrow: 1, padding: 5 }}>
            <StyledDropdown
              items={[BLANK_DROPDOWN_MODEL, ...YES_NO_DROPDOWN_ITEMS]}
              label="OD (RE)"
              selectedItem={screeningItem.plus2DTestRE}
              onChange={plus2DTestREChangeHandler}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default BinacularTest;
