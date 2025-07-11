import { ReachConfigurationModel } from "@/models/other-masters/ReachConfigurationModel";
import { ScreeningModel } from "@/models/primary-screening/ScreeningModel";

export const checkPSStatus = (
  screeningItem: ScreeningModel,
  reachConfigs: ReachConfigurationModel,
  isAutoRefAvailable: boolean
) => {
  let status = "";
  let reason = "";
  let spectacleStatus = "";

  if (screeningItem.haveSpecNow == "YES") {
    spectacleStatus = "( With Spectacle )";
  } else {
    spectacleStatus = "( Without Spectacle )";
  }

  //Workflow
  if (screeningItem.unableToPerformVisionTest == "YES") {
    //Check If autoavailable. No autoref Checkout
    if (isAutoRefAvailable) {
      //Check Auto Ref values
      if (
        screeningItem.visionAutoRefLE.value == "ABNORMAL" ||
        screeningItem.visionAutoRefRE.value == "ABNORMAL"
      ) {
        status = "REFER";
        reason = "Autoref test failed";
        return { status, reason };
      } else {
        //Check Torchlight Status
        if (
          screeningItem.torchlightCheckLE.value == "ABNORMAL" ||
          screeningItem.torchlightCheckRE.value == "ABNORMAL"
        ) {
          status = "REFER";
          reason = `Torchlight Examination Failed ( ${screeningItem.torchlightFindings} )`;
          return { status, reason };
        } else {
          // IF Torchlight also Normal
          status = "NORMAL";
          reason = "";
          return { status, reason };
        }
      }
    } else {
      //If No autoref available and unable to perform vision test
      status = "REFER";
      reason = `Unable to perform vision test ${spectacleStatus}`;
      return { status, reason };
    }
  } else {
    // Logmar 0.2
    if (
      screeningItem.canReadLogmarLE.value == "NO" ||
      screeningItem.canReadLogmarRE.value == "NO"
    ) {
      status = "REFER";
      reason = "Can not read logmar 0.2";
      return { status, reason };
    } else {
      // If logmar 0.2 passed
      console.log("Bina Check", screeningItem.isBinacularTestRequired);
      console.log("Reachconfigs", reachConfigs);
      if (
        screeningItem.ocularComplaint == "YES" &&
        screeningItem.isBinacularTestRequired
      ) {
        if (
          reachConfigs.isNpcTest ||
          reachConfigs.isCoverTest ||
          reachConfigs.isPlus2DTest
        ) {
          if (
            screeningItem.coverTest.value == "ABNORMAL" ||
            screeningItem.npcTest.value == "ABNORMAL" ||
            screeningItem.plus2DTestLE.value == "YES" ||
            screeningItem.plus2DTestRE.value == "YES"
          ) {
            status = "REFER";
            let failedTest = `( `;
            if (screeningItem.coverTest.value == "ABNORMAL") {
              failedTest += "Cover Test ,";
            }
            if (screeningItem.npcTest.value == "ABNORMAL") {
              failedTest += "NPC ,";
            }
            if (
              screeningItem.plus2DTestLE.value == "YES" ||
              screeningItem.plus2DTestRE.value == "YES"
            ) {
              failedTest += "+2D Test";
            }
            failedTest += " )";
            reason = `Binacular Test Failed ${failedTest}`;
            return { status, reason };
          } else {
            //CHECK TLE
          }
        } else {
          status = "REFER";
          reason = "Ocular Complaint ( Headche / Eye Strain)";
          return { status, reason };
        }
        //Check if Binacular Test available,if NPC, Cover Test & +2D Test Not available then REFER
      } else {
        // If No Ocular Complaints and other ocular complaints
        if (
          screeningItem.torchlightCheckLE.value == "ABNORMAL" ||
          screeningItem.torchlightCheckRE.value == "ABNORMAL"
        ) {
          //Check Torchlight findings for ADVICE / REFER
          if (screeningItem.isTleRefer) {
            status = "REFER";
            reason = `Torchlight Examination Failed ( ${screeningItem.torchlightFindings} )`;
            return { status, reason };
          } else {
            status = "ADVISE";
            reason = `Torchlight Examination Failed ( ${screeningItem.torchlightFindings} )`;
            return { status, reason };
          }
        } else {
          // If Torchlight Examination is NORMAL && Check if color vision test required
          if (screeningItem.isColorVisionTestRequired) {
          } else {
            // Color Vision Test Not Required
            if (screeningItem.specCondition == "BAD") {
              status = "ADVISE";
              reason = "Bad Spectacle Condition";
              return { status, reason };
            } else {
              status = "NORMAL";
              reason = "";
              return { status, reason };
            }
          }
        }
      }
    }
  }
  return { status, reason };
};

export const mapScreeningData = (screeningItem: ScreeningModel) => {
  const item = screeningItem;

  if (screeningItem.unableToPerformVisionTest !== "") {
    item.isVisionTestVisible = true;
  }
  return item;
};

// Step 1: Convert each string to valid JSON format
// export const convertStringDiagnosisItems = (items: any[]) => {
//   const output = items.map((str) => {
//     // Add double quotes around keys and values using RegEx
//     const jsonString = str
//       .replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":') // quote keys
//       .replace(/:\s*([^",}{\s]+)\s*/g, ': "$1"'); // quote values

//     console.log("JSON", jsonString);
//     return JSON.parse(jsonString);
//   });
//   return output;
// };
