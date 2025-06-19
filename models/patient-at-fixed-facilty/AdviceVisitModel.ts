export class AdviceVisitModel {
  id: string;
  isSpectaclePrescribed: boolean;
  isMedicinePrescribed: boolean;
  isContinueWithSameGlass: boolean;
  isNoTreatmentRequired: boolean;
  isPatientRefer: boolean;
  facilityType: string;
  facilityName: string;
  referralReason: string;
  isSurgeryRequired: boolean;
  surgeryType: string;
  otherComments: string;
  mrId: string;

  constructor({
    id,
    isSpectaclePrescribed,
    isMedicinePrescribed,
    isContinueWithSameGlass,
    isNoTreatmentRequired,
    isPatientRefer,
    facilityType,
    facilityName,
    referralReason,
    isSurgeryRequired,
    surgeryType,
    otherComments,
    mrId,
  }: {
    id: string;
    isSpectaclePrescribed: boolean;
    isMedicinePrescribed: boolean;
    isContinueWithSameGlass: boolean;
    isNoTreatmentRequired: boolean;
    isPatientRefer: boolean;
    facilityType: string;
    facilityName: string;
    referralReason: string;
    isSurgeryRequired: boolean;
    surgeryType: string;
    otherComments: string;
    mrId: string;
  }) {
    this.id = id;
    this.isSpectaclePrescribed = isSpectaclePrescribed;
    this.isMedicinePrescribed = isMedicinePrescribed;
    this.isContinueWithSameGlass = isContinueWithSameGlass;
    this.isNoTreatmentRequired = isNoTreatmentRequired;
    this.isPatientRefer = isPatientRefer;
    this.facilityType = facilityType;
    this.facilityName = facilityName;
    this.referralReason = referralReason;
    this.isSurgeryRequired = isSurgeryRequired;
    this.surgeryType = surgeryType;
    this.otherComments = otherComments;
    this.mrId = mrId;
  }
}
