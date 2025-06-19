import { DropdownModel } from "../ui/DropdownModel";
import { GridDropdownModel } from "../ui/GridDropdownModel";

export class ScreeningModel {
  id: number;
  studentId: string;
  schoolId: string;
  isNormal: boolean;
  usingSpectacle: string;
  haveSpecNow: string;
  specCondition: string;
  isVisionTestVisible: boolean;
  unableToPerformVisionTest: string;
  canReadLogmarLE: DropdownModel;
  canReadLogmarRE: DropdownModel;
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

  constructor({
    id,
    studentId,
    schoolId,
    isNormal,
    usingSpectacle,
    haveSpecNow,
    specCondition,
    isVisionTestVisible,
    unableToPerformVisionTest,
    canReadLogmarLE,
    canReadLogmarRE,
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
  }: {
    id: number;
    studentId: string;
    schoolId: string;
    isNormal: boolean;
    usingSpectacle: string;
    haveSpecNow: string;
    specCondition: string;
    isVisionTestVisible: boolean;
    unableToPerformVisionTest: string;
    canReadLogmarLE: DropdownModel;
    canReadLogmarRE: DropdownModel;
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
  }) {
    this.id = id;
    this.studentId = studentId;
    this.schoolId = schoolId;
    this.isNormal = isNormal;
    this.usingSpectacle = usingSpectacle;
    this.haveSpecNow = haveSpecNow;
    this.specCondition = specCondition;
    this.isVisionTestVisible = isVisionTestVisible;
    this.unableToPerformVisionTest = unableToPerformVisionTest;
    this.canReadLogmarLE = canReadLogmarLE;
    this.canReadLogmarRE = canReadLogmarRE;
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
  }
}
