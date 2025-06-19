export class ProfileModel {
  id: string;
  fullName: string;
  partnerId: string;
  partnerName: string;
  isUserAgreement: boolean;
  isPartnerAgreement: boolean;

  constructor({
    id,
    fullName,
    partnerId,
    partnerName,
    isUserAgreement,
    isPartnerAgreement,
  }: {
    id: string;
    fullName: string;
    partnerId: string;
    partnerName: string;
    isUserAgreement: boolean;
    isPartnerAgreement: boolean;
  }) {
    this.id = id;
    this.fullName = fullName;
    this.partnerId = partnerId;
    this.partnerName = partnerName;
    this.isUserAgreement = isUserAgreement;
    this.isPartnerAgreement = isPartnerAgreement;
  }
}
