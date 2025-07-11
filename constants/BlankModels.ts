import { ReachConfigurationModel } from "@/models/other-masters/ReachConfigurationModel";
import { MRTagModel } from "@/models/patient-at-fixed-facilty/MRTagModel";
import { VisualAcuityModel } from "@/models/patient-at-fixed-facilty/VisualAcuityModel";
import { ScreeningModel } from "@/models/primary-screening/ScreeningModel";
import { SchoolModel } from "@/models/school/SchoolModel";
import { StudentModel } from "@/models/school/StudentModel";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { FilterModel } from "@/models/ui/FilterModel";
import { GridDropdownModel } from "@/models/ui/GridDropdownModel";
import { UserModel } from "@/models/user/UserModel";

export const BLANK_DROPDOWN_MODEL = new DropdownModel({
  id: "0",
  value: "SELECT",
  label: "Select",
  displayOrder: 0,
});

export const BLANK_GRID_DROPDOWN_MODEl = new GridDropdownModel({
  id: "0",
  title: "",
  description: "",
  displayOrder: 0,
});

export const BLANK_SCHOOL_MODEL = new SchoolModel({
  id: 0,
  schoolId: "",
  schoolName: "",
  classFromId: "",
  classUptoId: "",
  latitude: 0,
  longitude: 0,
  visionCenterId: "",
  projectId: "",
  isAutorefAvailable: false,
  activityType: "",
  isFollowupSchool: false,
});

export const BLANK_STUDENT_MODEL = new StudentModel({
  id: "0",
  studentId: "",
  tempId: "",
  firstName: "",
  middleName: "",
  lastName: "",
  classId: "",
  classTitle: "",
  section: "",
  rollNo: "",
  gender: "",
  age: "",
  dob: "",
  relation: "",
  nextOfKin: "",
  specialNeed: "",
  session: "",
  contactPersonName: "",
  contactPersonMobileNo: "",
  relationshipWithStudent: "",
  schoolId: 0,
  schoolName: "",
  isActive: "",
  psStatus: "",
  isMarkForQC: false,
  mrNo: "",
  facilityType: "",
  facilityName: "",
  isUpdated: false,
  targetGroup: "",
  lastPSStatus: "",
  lastReasonForReferral: "",
  lastReportDate: "",
  lastSpectacleStatus: "",
  lastAnySurgeryDone: "",
});

export const BLANK_SCREENING_MODEL = new ScreeningModel({
  id: "",
  studentId: "",
  schoolId: "",
  isNormal: false,
  usingSpectacle: "",
  haveSpecNow: "",
  specCondition: "",
  isVisionTestVisible: false,
  unableToPerformVisionTest: "",
  canReadLogmarLE: BLANK_DROPDOWN_MODEL,
  canReadLogmarRE: BLANK_DROPDOWN_MODEL,
  isAutoRefVisible: false,
  visionAutoRefLE: BLANK_DROPDOWN_MODEL,
  visionAutoRefRE: BLANK_DROPDOWN_MODEL,
  acceptanceSPHLE: BLANK_GRID_DROPDOWN_MODEl,
  acceptanceSPHRE: BLANK_GRID_DROPDOWN_MODEl,
  acceptanceCYLLE: BLANK_GRID_DROPDOWN_MODEl,
  acceptanceCYLRE: BLANK_GRID_DROPDOWN_MODEl,
  acceptanceAXISLE: BLANK_DROPDOWN_MODEL,
  acceptanceAXISRE: BLANK_DROPDOWN_MODEL,
  IPDBoth: "",
  isTorchlightVisible: false,
  torchlightCheckLE: BLANK_DROPDOWN_MODEL,
  torchlightCheckRE: BLANK_DROPDOWN_MODEL,
  torchlightFindings: "",
  isOcularComplaintVisible: false,
  ocularComplaint: "",
  ocularList: "",
  isBinucularTestVisible: false,
  isNpcTest: false,
  isCoverTest: false,
  isPlus2DTest: false,
  npcTest: BLANK_DROPDOWN_MODEL,
  coverTest: BLANK_DROPDOWN_MODEL,
  plus2DTestLE: BLANK_DROPDOWN_MODEL,
  plus2DTestRE: BLANK_DROPDOWN_MODEL,
  isColorVisionTestVisible: false,
  colorVisionLE: BLANK_DROPDOWN_MODEL,
  colorVisionRE: BLANK_DROPDOWN_MODEL,
  psStatus: "",
  referralReason: "",
  appointmentDate: "",
  mobileNo: "",
  facilityType: BLANK_DROPDOWN_MODEL,
  facilityName: BLANK_DROPDOWN_MODEL,
  otherReason: "",
  instructionForReferralCenter: "",
  isAutoRefRequired: false,
  isBinacularTestRequired: false,
  isColorVisionTestRequired: false,
  isTleRefer: false,
  isQCDone: false,
  isPsDone: false,
  isEditable: false,
});

export const BLANK_VISUAL_ACUITY_MODEL = new VisualAcuityModel({
  id: "",
  visualExamWithSpecsDvaLe: "",
  visualExamWithSpecsDvaRe: "",
  visualExamWithSpecsNvaLe: "",
  visualExamWithSpecsNvaRe: "",
  visualExamWithSpecsPhLe: "",
  visualExamWithSpecsPhRe: "",
  visualExamWithoutSpecsDvaLe: "",
  visualExamWithoutSpecsDvaRe: "",
  visualExamWithoutSpecsNvaLe: "",
  visualExamWithoutSpecsNvaRe: "",
  visualExamWithoutSpecsPhLe: "",
  visualExamWithoutSpecsPhRe: "",
  mrId: "",
});

export const BLANK_MR_TAG_MODEL = new MRTagModel({
  id: "",
  mrNo: "",
  visitDate: "",
  facilityType: "",
  facilityId: "",
  studentId: "",
});

export const BLANK_REACH_CONFIGURATION_MODEL = new ReachConfigurationModel({
  id: 0,
  partnerName: "",
  partnerId: "",
  isCoverTest: false,
  isNpcTest: false,
  isPlus2DTest: false,
  isActive: "Yes",
});

export const BLANK_USER_MODEL = new UserModel({
  id: "",
  userName: "",
  password: "",
  firstName: "",
  middleName: "",
  lastName: "",
  designation: "",
  isPartnerAgreement: false,
  isUserAgreement: false,
  isPIIAgreement: false,
  isDevicePreparation: false,
  isDataSync: false,
  isQualityCheck: false,
});

export const BLANK_FILTER_MODEL = new FilterModel({
  classId: "",
  section: "",
  gender: "",
  status: "",
  result: "",
});
