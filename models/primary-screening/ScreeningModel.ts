import { DropdownModel } from "../ui/DropdownModel";
import { GridDropdownModel } from "../ui/GridDropdownModel";

export class ScreeningModel {
  id: string;
  studentId: string;
  schoolId: string;
  isNormal: boolean;
  usingSpectacle: string;
  usingSpecHasError: boolean;
  usingSpecErrorMessage: string;
  haveSpecNow: string;
  haveSpecNowHasError: boolean;
  haveSpecNowErrorMessage: string;
  specCondition: string;
  specConditionHasError: boolean;
  specConditionErrorMessage: string;
  isVisionTestVisible: boolean;
  unableToPerformVisionTest: string;
  canReadLogmarLE: DropdownModel;
  canReadLogmarRE: DropdownModel;
  canReadLogmarLEHasError: boolean;
  canReadLogmarLEErrorMessage: string;
  canReadLogmarREHasError: boolean;
  canReadLogmarREErrorMessage: string;
  isAutoRefVisible: boolean;
  visionAutoRefLE: DropdownModel;
  visionAutoRefRE: DropdownModel;
  acceptanceSPHLE: GridDropdownModel;
  acceptanceSPHRE: GridDropdownModel;
  acceptanceCYLLE: GridDropdownModel;
  acceptanceCYLRE: GridDropdownModel;
  acceptanceAXISLE: DropdownModel;
  acceptanceAXISRE: DropdownModel;
  IPDBoth: string;
  isTorchlightVisible: boolean;
  torchlightCheckLE: DropdownModel;
  torchlightCheckRE: DropdownModel;
  torchlightFindings: string;
  isOcularComplaintVisible: boolean;
  ocularComplaint: string;
  ocularList: string;
  isBinucularTestVisible: boolean;
  isNpcTest: boolean;
  isCoverTest: boolean;
  isPlus2DTest: boolean;
  npcTest: DropdownModel;
  coverTest: DropdownModel;
  plus2DTestLE: DropdownModel;
  plus2DTestRE: DropdownModel;
  isColorVisionTestVisible: boolean;
  colorVisionLE: DropdownModel;
  colorVisionRE: DropdownModel;
  psStatus: string;
  referralReason: string;
  appointmentDate: string;
  mobileNo: string;
  facilityType: DropdownModel;
  facilityName: DropdownModel;
  otherReason: string;
  instructionForReferralCenter: string;
  isAutoRefRequired: boolean;
  isBinacularTestRequired: boolean;
  isColorVisionTestRequired: boolean;
  isTleRefer: boolean;
  isQCDone: boolean;
  isPsDone: boolean;
  isNonEditable: boolean;

  constructor({
    id,
    studentId,
    schoolId,
    isNormal,
    usingSpectacle,
    usingSpecHasError,
    usingSpecErrorMessage,
    haveSpecNow,
    haveSpecNowHasError,
    haveSpecNowErrorMessage,
    specCondition,
    specConditionHasError,
    specConditionErrorMessage,
    isVisionTestVisible,
    unableToPerformVisionTest,
    canReadLogmarLE,
    canReadLogmarRE,
    canReadLogmarLEHasError,
    canReadLogmarLEErrorMessage,
    canReadLogmarREHasError,
    canReadLogmarREErrorMessage,
    isAutoRefVisible,
    visionAutoRefLE,
    visionAutoRefRE,
    acceptanceSPHLE,
    acceptanceSPHRE,
    acceptanceCYLLE,
    acceptanceCYLRE,
    acceptanceAXISLE,
    acceptanceAXISRE,
    IPDBoth,
    isTorchlightVisible,
    torchlightCheckLE,
    torchlightCheckRE,
    torchlightFindings,
    isOcularComplaintVisible,
    ocularComplaint,
    ocularList,
    isBinucularTestVisible,
    isNpcTest,
    isCoverTest,
    isPlus2DTest,
    npcTest,
    coverTest,
    plus2DTestLE,
    plus2DTestRE,
    isColorVisionTestVisible,
    colorVisionLE,
    colorVisionRE,
    psStatus,
    referralReason,
    appointmentDate,
    mobileNo,
    facilityType,
    facilityName,
    otherReason,
    instructionForReferralCenter,
    isAutoRefRequired,
    isBinacularTestRequired,
    isColorVisionTestRequired,
    isTleRefer,
    isQCDone,
    isPsDone,
    isNonEditable,
  }: {
    id: string;
    studentId: string;
    schoolId: string;
    isNormal: boolean;
    usingSpectacle: string;
    usingSpecHasError: boolean;
    usingSpecErrorMessage: string;
    haveSpecNow: string;
    haveSpecNowHasError: boolean;
    haveSpecNowErrorMessage: string;
    specCondition: string;
    specConditionHasError: boolean;
    specConditionErrorMessage: string;
    isVisionTestVisible: boolean;
    unableToPerformVisionTest: string;
    canReadLogmarLE: DropdownModel;
    canReadLogmarRE: DropdownModel;
    canReadLogmarLEHasError: boolean;
    canReadLogmarLEErrorMessage: string;
    canReadLogmarREHasError: boolean;
    canReadLogmarREErrorMessage: string;
    isAutoRefVisible: boolean;
    visionAutoRefLE: DropdownModel;
    visionAutoRefRE: DropdownModel;
    acceptanceSPHLE: GridDropdownModel;
    acceptanceSPHRE: GridDropdownModel;
    acceptanceCYLLE: GridDropdownModel;
    acceptanceCYLRE: GridDropdownModel;
    acceptanceAXISLE: DropdownModel;
    acceptanceAXISRE: DropdownModel;
    IPDBoth: string;
    isTorchlightVisible: boolean;
    torchlightCheckLE: DropdownModel;
    torchlightCheckRE: DropdownModel;
    torchlightFindings: string;
    isOcularComplaintVisible: boolean;
    ocularComplaint: string;
    ocularList: string;
    isBinucularTestVisible: boolean;
    isNpcTest: boolean;
    isCoverTest: boolean;
    isPlus2DTest: boolean;
    npcTest: DropdownModel;
    coverTest: DropdownModel;
    plus2DTestLE: DropdownModel;
    plus2DTestRE: DropdownModel;
    isColorVisionTestVisible: boolean;
    colorVisionLE: DropdownModel;
    colorVisionRE: DropdownModel;
    psStatus: string;
    referralReason: string;
    appointmentDate: string;
    mobileNo: string;
    facilityType: DropdownModel;
    facilityName: DropdownModel;
    otherReason: string;
    instructionForReferralCenter: string;
    isAutoRefRequired: boolean;
    isBinacularTestRequired: boolean;
    isColorVisionTestRequired: boolean;
    isTleRefer: boolean;
    isQCDone: boolean;
    isPsDone: boolean;
    isNonEditable: boolean;
  }) {
    this.id = id;
    this.studentId = studentId;
    this.schoolId = schoolId;
    this.isNormal = isNormal;
    this.usingSpectacle = usingSpectacle;
    this.usingSpecHasError = usingSpecHasError;
    this.usingSpecErrorMessage = usingSpecErrorMessage;
    this.haveSpecNow = haveSpecNow;
    this.haveSpecNowHasError = haveSpecNowHasError;
    this.haveSpecNowErrorMessage = haveSpecNowErrorMessage;
    this.specCondition = specCondition;
    this.specConditionHasError = specConditionHasError;
    this.specConditionErrorMessage = specConditionErrorMessage;
    this.isVisionTestVisible = isVisionTestVisible;
    this.unableToPerformVisionTest = unableToPerformVisionTest;
    this.canReadLogmarLE = canReadLogmarLE;
    this.canReadLogmarRE = canReadLogmarRE;
    this.canReadLogmarLEHasError = canReadLogmarLEHasError;
    this.canReadLogmarLEErrorMessage = canReadLogmarLEErrorMessage;
    this.canReadLogmarREHasError = canReadLogmarREHasError;
    this.canReadLogmarREErrorMessage = canReadLogmarREErrorMessage;
    this.isAutoRefVisible = isAutoRefVisible;
    this.visionAutoRefLE = visionAutoRefLE;
    this.visionAutoRefRE = visionAutoRefRE;
    this.acceptanceSPHLE = acceptanceSPHLE;
    this.acceptanceSPHRE = acceptanceSPHRE;
    this.acceptanceCYLLE = acceptanceCYLLE;
    this.acceptanceCYLRE = acceptanceCYLRE;
    this.acceptanceAXISLE = acceptanceAXISLE;
    this.acceptanceAXISRE = acceptanceAXISRE;
    this.IPDBoth = IPDBoth;
    this.isTorchlightVisible = isTorchlightVisible;
    this.torchlightCheckLE = torchlightCheckLE;
    this.torchlightCheckRE = torchlightCheckRE;
    this.torchlightFindings = torchlightFindings;
    this.isOcularComplaintVisible = isOcularComplaintVisible;
    this.ocularComplaint = ocularComplaint;
    this.ocularList = ocularList;
    this.isBinucularTestVisible = isBinucularTestVisible;
    this.isNpcTest = isNpcTest;
    this.isCoverTest = isCoverTest;
    this.isPlus2DTest = isPlus2DTest;
    this.npcTest = npcTest;
    this.coverTest = coverTest;
    this.plus2DTestLE = plus2DTestLE;
    this.plus2DTestRE = plus2DTestRE;
    this.isColorVisionTestVisible = isColorVisionTestVisible;
    this.colorVisionLE = colorVisionLE;
    this.colorVisionRE = colorVisionRE;
    this.psStatus = psStatus;
    this.referralReason = referralReason;
    this.appointmentDate = appointmentDate;
    this.mobileNo = mobileNo;
    this.facilityType = facilityType;
    this.facilityName = facilityName;
    this.otherReason = otherReason;
    this.instructionForReferralCenter = instructionForReferralCenter;
    this.isAutoRefRequired = isAutoRefRequired;
    this.isBinacularTestRequired = isBinacularTestRequired;
    this.isColorVisionTestRequired = isColorVisionTestRequired;
    this.isTleRefer = isTleRefer;
    this.isQCDone = isQCDone;
    this.isPsDone = isPsDone;
    this.isNonEditable = isNonEditable;
  }
}
