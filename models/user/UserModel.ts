export class UserModel {
  id: string;
  userName: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  isPartnerAgreement: boolean;
  isUserAgreement: boolean;
  isPIIAgreement: boolean;
  isDevicePreparation: boolean;
  isDataSync: boolean;
  isQualityCheck: boolean;

  constructor({
    id,
    userName,
    password,
    firstName,
    middleName,
    lastName,
    isPartnerAgreement,
    isUserAgreement,
    isPIIAgreement,
    isDevicePreparation,
    isDataSync,
    isQualityCheck,
  }: {
    id: string;
    userName: string;
    password: string;
    firstName: string;
    middleName: string;
    lastName: string;
    isPartnerAgreement: boolean;
    isUserAgreement: boolean;
    isPIIAgreement: boolean;
    isDevicePreparation: boolean;
    isDataSync: boolean;
    isQualityCheck: boolean;
  }) {
    this.id = id;
    this.userName = userName;
    this.password = password;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.isPartnerAgreement = isPartnerAgreement;
    this.isUserAgreement = isUserAgreement;
    this.isPIIAgreement = isPIIAgreement;
    this.isDevicePreparation = isDevicePreparation;
    this.isDataSync = isDataSync;
    this.isQualityCheck = isQualityCheck;
  }
}
