export class PSStudentModel {
  id: number;
  sessionHistoryId: number;
  tempStudentId: string;
  usingSpectacles: string;
  haveSpecsNow: string;
  spectacleConditionGood: string;
  unableToPerformTest: string;
  notReadLogmarwithoutSpecsRe: string;
  notReadLogmarwithoutSpecsLe: string;
  readUsingLensWithoutSpecsRE: string;
  readUsingLensWithoutSpecsLE: string;
  ocularComplaint: string;
  ocularComplaintList: string[];
  torchLightCheckLe: string;
  torchLightCheckRe: string;
  coverTest: string;
  npcTest: string;
  colorVisionRe: string;
  colorVisionLe: string;
  visionWithAutoRefRe: string;
  visionWithAutoRefLe: string;
  acceptanceSphLe: string;
  acceptanceCylLe: string;
  acceptanceAxisLe: string;
  acceptanceSphRe: string;
  acceptanceCylRe: string;
  acceptanceAxisRe: string;
  ipdAutoRef: string;
  psStatus: string;
  qualityCheckDone: boolean;
  torchLightFindings: string;
  referralRequest?: any;
  psUpdatedAt: string;
  screenerType: string;
  studentData?: any;

  constructor({
    id,
    sessionHistoryId,
    tempStudentId,
    usingSpectacles,
    haveSpecsNow,
    spectacleConditionGood,
    unableToPerformTest,
    notReadLogmarwithoutSpecsRe,
    notReadLogmarwithoutSpecsLe,
    readUsingLensWithoutSpecsRE,
    readUsingLensWithoutSpecsLE,
    ocularComplaint,
    ocularComplaintList,
    torchLightCheckLe,
    torchLightCheckRe,
    coverTest,
    npcTest,
    colorVisionRe,
    colorVisionLe,
    visionWithAutoRefRe,
    visionWithAutoRefLe,
    acceptanceSphLe,
    acceptanceCylLe,
    acceptanceAxisLe,
    acceptanceSphRe,
    acceptanceCylRe,
    acceptanceAxisRe,
    ipdAutoRef,
    psStatus,
    qualityCheckDone,
    torchLightFindings,
    referralRequest,
    psUpdatedAt,
    screenerType,
    studentData,
  }: {
    id: number;
    sessionHistoryId: number;
    tempStudentId: string;
    usingSpectacles: string;
    haveSpecsNow: string;
    spectacleConditionGood: string;
    unableToPerformTest: string;
    notReadLogmarwithoutSpecsRe: string;
    notReadLogmarwithoutSpecsLe: string;
    readUsingLensWithoutSpecsRE: string;
    readUsingLensWithoutSpecsLE: string;
    ocularComplaint: string;
    ocularComplaintList: string[];
    torchLightCheckLe: string;
    torchLightCheckRe: string;
    coverTest: string;
    npcTest: string;
    colorVisionRe: string;
    colorVisionLe: string;
    visionWithAutoRefRe: string;
    visionWithAutoRefLe: string;
    acceptanceSphLe: string;
    acceptanceCylLe: string;
    acceptanceAxisLe: string;
    acceptanceSphRe: string;
    acceptanceCylRe: string;
    acceptanceAxisRe: string;
    ipdAutoRef: string;
    psStatus: string;
    qualityCheckDone: boolean;
    torchLightFindings: string;
    referralRequest?: any;
    psUpdatedAt: string;
    screenerType: string;
    studentData?: any;
  }) {
    this.id = id;
    this.sessionHistoryId = sessionHistoryId;
    this.tempStudentId = tempStudentId;
    this.usingSpectacles = usingSpectacles;
    this.haveSpecsNow = haveSpecsNow;
    this.spectacleConditionGood = spectacleConditionGood;
    this.unableToPerformTest = unableToPerformTest;
    this.notReadLogmarwithoutSpecsRe = notReadLogmarwithoutSpecsRe;
    this.notReadLogmarwithoutSpecsLe = notReadLogmarwithoutSpecsLe;
    this.readUsingLensWithoutSpecsRE = readUsingLensWithoutSpecsRE;
    this.readUsingLensWithoutSpecsLE = readUsingLensWithoutSpecsLE;
    this.ocularComplaint = ocularComplaint;
    this.ocularComplaintList = ocularComplaintList;
    this.torchLightCheckLe = torchLightCheckLe;
    this.torchLightCheckRe = torchLightCheckRe;
    this.coverTest = coverTest;
    this.npcTest = npcTest;
    this.colorVisionRe = colorVisionRe;
    this.colorVisionLe = colorVisionLe;
    this.visionWithAutoRefRe = visionWithAutoRefRe;
    this.visionWithAutoRefLe = visionWithAutoRefLe;
    this.acceptanceSphLe = acceptanceSphLe;
    this.acceptanceCylLe = acceptanceCylLe;
    this.acceptanceAxisLe = acceptanceAxisLe;
    this.acceptanceSphRe = acceptanceSphRe;
    this.acceptanceCylRe = acceptanceCylRe;
    this.acceptanceAxisRe = acceptanceAxisRe;
    this.ipdAutoRef = ipdAutoRef;
    this.psStatus = psStatus;
    this.qualityCheckDone = qualityCheckDone;
    this.torchLightFindings = torchLightFindings;
    this.referralRequest = referralRequest;
    this.psUpdatedAt = psUpdatedAt;
    this.screenerType = screenerType;
    this.studentData = studentData;
  }
}
