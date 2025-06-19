export class MRStudentModel {
  id: string;
  mrNo: string;
  visitDate: string;
  facilityType: string;
  facilityName: string;
  visualExamWithSpecsDvaLe: string;
  visualExamWithSpecsDvaRe: string;
  visualExamWithSpecsNvaLe: string;
  visualExamWithSpecsNvaRe: string;
  visualExamWithSpecsPhLe: string;
  visualExamWithSpecsPhRe: string;
  visualExamWithoutSpecsDvaLe: string;
  visualExamWithoutSpecsDvaRe: string;
  visualExamWithoutSpecsNvaLe: string;
  visualExamWithoutSpecsNvaRe: string;
  visualExamWithoutSpecsPhLe: string;
  visualExamWithoutSpecsPhRe: string;
  refractionPgpSphLe: string;
  refractionPgpSphRe: string;
  refractionPgpCylLe: string;
  refractionPgpCylRe: string;
  refractionPgpAxisLe: string;
  refractionPgpAxisRe: string;
  refractionPgpAddLe: string;
  refractionPgpAddRe: string;
  refractionDRYRETINOSphRe: string;
  refractionDRYRETINOSphLe: string;
  refractionDRYRETINOCylRe: string;
  refractionDRYRETINOCylLe: string;
  refractionDRYRETINOAXIS_RE: string;
  refractionDRYRETINOAXIS_LE: string;
  refractionCYCLORETINOSphRe: string;
  refractionCYCLORETINOSphLe: string;
  refractionCYCLORETINOCylRe: string;
  refractionCYCLORETINOCylLe: string;
  refractionCYCLORETINO_AXIS_RE: string;
  refractionCYCLORETINO_AXIS_LE: string;
  refractionAcceptanceSphRe: string;
  refractionAcceptanceSphLe: string;
  refractionAcceptanceCylRe: string;
  refractionAcceptanceCylLe: string;
  refractionAcceptanceAxisRe: string;
  refractionAcceptanceAxisLe: string;
  refractionBCVARe: string;
  refractionBCVALe: string;
  refractionAddSphRe: string;
  refractionAddSphLe: string;
  refractionBCVASphLe: string;
  refractionAddNvaRe: string;
  refractionAddNvaLe: string;
  refractionPapillaryDistSPhRe: string;
  refractionPapillaryDistIPdRe: string;
  refractionPapillaryDistSPhLe: string;
  refractionRemarksRe: string;
  refractionRemarksLe: string;
  refractionLensMaterial: string;
  refractionFrameMaterial: string;
  refractionLensType: string;
  refractionSpecialityLens: string;
  refractionModeOfWear: string;
  refractionLensSurface_Coating: string;
  refractionLensTint: string;
  refractionSpecialInstruction: string;
  refractionRemarks2: string;
  spectaclesPrescribed: string;
  specialInstruction: string;
  isSpectaclePrescribed: boolean;
  isMedicinePrescribed: boolean;
  isContinueWithSameGlass: boolean;
  isNoTreatmentRequired: boolean;
  isPatientRefer: boolean;
  referredFacilityType: string;
  referredFacilityName: string;
  referralReason: string;
  isSurgeryRequired: boolean;
  surgeryType: string;
  otherComments: string;
  studentId: string;
  schoolId: string;
  constructor({
    id,
    mrNo,
    visitDate,
    facilityType,
    facilityName,
    visualExamWithSpecsDvaLe,
    visualExamWithSpecsDvaRe,
    visualExamWithSpecsNvaLe,
    visualExamWithSpecsNvaRe,
    visualExamWithSpecsPhLe,
    visualExamWithSpecsPhRe,
    visualExamWithoutSpecsDvaLe,
    visualExamWithoutSpecsDvaRe,
    visualExamWithoutSpecsNvaLe,
    visualExamWithoutSpecsNvaRe,
    visualExamWithoutSpecsPhLe,
    visualExamWithoutSpecsPhRe,
    refractionPgpSphLe,
    refractionPgpSphRe,
    refractionPgpCylLe,
    refractionPgpCylRe,
    refractionPgpAxisLe,
    refractionPgpAxisRe,
    refractionPgpAddLe,
    refractionPgpAddRe,
    refractionDRYRETINOSphRe,
    refractionDRYRETINOSphLe,
    refractionDRYRETINOCylRe,
    refractionDRYRETINOCylLe,
    refractionDRYRETINOAXIS_RE,
    refractionDRYRETINOAXIS_LE,
    refractionCYCLORETINOSphRe,
    refractionCYCLORETINOSphLe,
    refractionCYCLORETINOCylRe,
    refractionCYCLORETINOCylLe,
    refractionCYCLORETINO_AXIS_RE,
    refractionCYCLORETINO_AXIS_LE,
    refractionAcceptanceSphRe,
    refractionAcceptanceSphLe,
    refractionAcceptanceCylRe,
    refractionAcceptanceCylLe,
    refractionAcceptanceAxisRe,
    refractionAcceptanceAxisLe,
    refractionBCVARe,
    refractionBCVALe,
    refractionAddSphRe,
    refractionAddSphLe,
    refractionBCVASphLe,
    refractionAddNvaRe,
    refractionAddNvaLe,
    refractionPapillaryDistSPhRe,
    refractionPapillaryDistIPdRe,
    refractionPapillaryDistSPhLe,
    refractionRemarksRe,
    refractionRemarksLe,
    refractionLensMaterial,
    refractionFrameMaterial,
    refractionLensType,
    refractionSpecialityLens,
    refractionModeOfWear,
    refractionLensSurface_Coating,
    refractionLensTint,
    refractionSpecialInstruction,
    refractionRemarks2,
    spectaclesPrescribed,
    specialInstruction,
    isSpectaclePrescribed,
    isMedicinePrescribed,
    isContinueWithSameGlass,
    isNoTreatmentRequired,
    isPatientRefer,
    referredFacilityType,
    referredFacilityName,
    referralReason,
    isSurgeryRequired,
    surgeryType,
    otherComments,
    studentId,
    schoolId,
  }: {
    id: string;
    mrNo: string;
    visitDate: string;
    facilityType: string;
    facilityName: string;
    visualExamWithSpecsDvaLe: string;
    visualExamWithSpecsDvaRe: string;
    visualExamWithSpecsNvaLe: string;
    visualExamWithSpecsNvaRe: string;
    visualExamWithSpecsPhLe: string;
    visualExamWithSpecsPhRe: string;
    visualExamWithoutSpecsDvaLe: string;
    visualExamWithoutSpecsDvaRe: string;
    visualExamWithoutSpecsNvaLe: string;
    visualExamWithoutSpecsNvaRe: string;
    visualExamWithoutSpecsPhLe: string;
    visualExamWithoutSpecsPhRe: string;
    refractionPgpSphLe: string;
    refractionPgpSphRe: string;
    refractionPgpCylLe: string;
    refractionPgpCylRe: string;
    refractionPgpAxisLe: string;
    refractionPgpAxisRe: string;
    refractionPgpAddLe: string;
    refractionPgpAddRe: string;
    refractionDRYRETINOSphRe: string;
    refractionDRYRETINOSphLe: string;
    refractionDRYRETINOCylRe: string;
    refractionDRYRETINOCylLe: string;
    refractionDRYRETINOAXIS_RE: string;
    refractionDRYRETINOAXIS_LE: string;
    refractionCYCLORETINOSphRe: string;
    refractionCYCLORETINOSphLe: string;
    refractionCYCLORETINOCylRe: string;
    refractionCYCLORETINOCylLe: string;
    refractionCYCLORETINO_AXIS_RE: string;
    refractionCYCLORETINO_AXIS_LE: string;
    refractionAcceptanceSphRe: string;
    refractionAcceptanceSphLe: string;
    refractionAcceptanceCylRe: string;
    refractionAcceptanceCylLe: string;
    refractionAcceptanceAxisRe: string;
    refractionAcceptanceAxisLe: string;
    refractionBCVARe: string;
    refractionBCVALe: string;
    refractionAddSphRe: string;
    refractionAddSphLe: string;
    refractionBCVASphLe: string;
    refractionAddNvaRe: string;
    refractionAddNvaLe: string;
    refractionPapillaryDistSPhRe: string;
    refractionPapillaryDistIPdRe: string;
    refractionPapillaryDistSPhLe: string;
    refractionRemarksRe: string;
    refractionRemarksLe: string;
    refractionLensMaterial: string;
    refractionFrameMaterial: string;
    refractionLensType: string;
    refractionSpecialityLens: string;
    refractionModeOfWear: string;
    refractionLensSurface_Coating: string;
    refractionLensTint: string;
    refractionSpecialInstruction: string;
    refractionRemarks2: string;
    spectaclesPrescribed: string;
    specialInstruction: string;
    isSpectaclePrescribed: boolean;
    isMedicinePrescribed: boolean;
    isContinueWithSameGlass: boolean;
    isNoTreatmentRequired: boolean;
    isPatientRefer: boolean;
    referredFacilityType: string;
    referredFacilityName: string;
    referralReason: string;
    isSurgeryRequired: boolean;
    surgeryType: string;
    otherComments: string;
    studentId: string;
    schoolId: string;
  }) {
    this.id = id;
    this.mrNo = mrNo;
    this.visitDate = visitDate;
    this.facilityType = facilityType;
    this.facilityName = facilityName;
    this.visualExamWithSpecsDvaLe = visualExamWithSpecsDvaLe;
    this.visualExamWithSpecsDvaRe = visualExamWithSpecsDvaRe;
    this.visualExamWithSpecsNvaLe = visualExamWithSpecsNvaLe;
    this.visualExamWithSpecsNvaRe = visualExamWithSpecsNvaRe;
    this.visualExamWithSpecsPhLe = visualExamWithSpecsPhLe;
    this.visualExamWithSpecsPhRe = visualExamWithSpecsPhRe;
    this.visualExamWithoutSpecsDvaLe = visualExamWithoutSpecsDvaLe;
    this.visualExamWithoutSpecsDvaRe = visualExamWithoutSpecsDvaRe;
    this.visualExamWithoutSpecsNvaLe = visualExamWithoutSpecsNvaLe;
    this.visualExamWithoutSpecsNvaRe = visualExamWithoutSpecsNvaRe;
    this.visualExamWithoutSpecsPhLe = visualExamWithoutSpecsPhLe;
    this.visualExamWithoutSpecsPhRe = visualExamWithoutSpecsPhRe;
    this.refractionPgpSphLe = refractionPgpSphLe;
    this.refractionPgpSphRe = refractionPgpSphRe;
    this.refractionPgpCylLe = refractionPgpCylLe;
    this.refractionPgpCylRe = refractionPgpCylRe;
    this.refractionPgpAxisLe = refractionPgpAxisLe;
    this.refractionPgpAxisRe = refractionPgpAxisRe;
    this.refractionPgpAddLe = refractionPgpAddLe;
    this.refractionPgpAddRe = refractionPgpAddRe;
    this.refractionDRYRETINOSphRe = refractionDRYRETINOSphRe;
    this.refractionDRYRETINOSphLe = refractionDRYRETINOSphLe;
    this.refractionDRYRETINOCylRe = refractionDRYRETINOCylRe;
    this.refractionDRYRETINOCylLe = refractionDRYRETINOCylLe;
    this.refractionDRYRETINOAXIS_RE = refractionDRYRETINOAXIS_RE;
    this.refractionDRYRETINOAXIS_LE = refractionDRYRETINOAXIS_LE;
    this.refractionCYCLORETINOSphRe = refractionCYCLORETINOSphRe;
    this.refractionCYCLORETINOSphLe = refractionCYCLORETINOSphLe;
    this.refractionCYCLORETINOCylRe = refractionCYCLORETINOCylRe;
    this.refractionCYCLORETINOCylLe = refractionCYCLORETINOCylLe;
    this.refractionCYCLORETINO_AXIS_RE = refractionCYCLORETINO_AXIS_RE;
    this.refractionCYCLORETINO_AXIS_LE = refractionCYCLORETINO_AXIS_LE;
    this.refractionAcceptanceSphRe = refractionAcceptanceSphRe;
    this.refractionAcceptanceSphLe = refractionAcceptanceSphLe;
    this.refractionAcceptanceCylRe = refractionAcceptanceCylRe;
    this.refractionAcceptanceCylLe = refractionAcceptanceCylLe;
    this.refractionAcceptanceAxisRe = refractionAcceptanceAxisRe;
    this.refractionAcceptanceAxisLe = refractionAcceptanceAxisLe;
    this.refractionBCVARe = refractionBCVARe;
    this.refractionBCVALe = refractionBCVALe;
    this.refractionAddSphRe = refractionAddSphRe;
    this.refractionAddSphLe = refractionAddSphLe;
    this.refractionBCVASphLe = refractionBCVASphLe;
    this.refractionAddNvaRe = refractionAddNvaRe;
    this.refractionAddNvaLe = refractionAddNvaLe;
    this.refractionPapillaryDistSPhRe = refractionPapillaryDistSPhRe;
    this.refractionPapillaryDistIPdRe = refractionPapillaryDistIPdRe;
    this.refractionPapillaryDistSPhLe = refractionPapillaryDistSPhLe;
    this.refractionRemarksRe = refractionRemarksRe;
    this.refractionRemarksLe = refractionRemarksLe;
    this.refractionLensMaterial = refractionLensMaterial;
    this.refractionFrameMaterial = refractionFrameMaterial;
    this.refractionLensType = refractionLensType;
    this.refractionSpecialityLens = refractionSpecialityLens;
    this.refractionModeOfWear = refractionModeOfWear;
    this.refractionLensSurface_Coating = refractionLensSurface_Coating;
    this.refractionLensTint = refractionLensTint;
    this.refractionSpecialInstruction = refractionSpecialInstruction;
    this.refractionRemarks2 = refractionRemarks2;
    this.spectaclesPrescribed = spectaclesPrescribed;
    this.specialInstruction = specialInstruction;
    this.isSpectaclePrescribed = isSpectaclePrescribed;
    this.isMedicinePrescribed = isMedicinePrescribed;
    this.isContinueWithSameGlass = isContinueWithSameGlass;
    this.isNoTreatmentRequired = isNoTreatmentRequired;
    this.isPatientRefer = isPatientRefer;
    this.referredFacilityType = referredFacilityType;
    this.referredFacilityName = referredFacilityName;
    this.referralReason = referralReason;
    this.isSurgeryRequired = isSurgeryRequired;
    this.surgeryType = surgeryType;
    this.otherComments = otherComments;
    this.studentId = studentId;
    this.schoolId = schoolId;
  }
}
