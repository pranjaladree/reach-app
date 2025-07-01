export class UserModel {
  id: string;
  userName: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  designation: string;
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
    designation,
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
    designation: string;
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
    this.designation = designation;
    this.isPartnerAgreement = isPartnerAgreement;
    this.isUserAgreement = isUserAgreement;
    this.isPIIAgreement = isPIIAgreement;
    this.isDevicePreparation = isDevicePreparation;
    this.isDataSync = isDataSync;
    this.isQualityCheck = isQualityCheck;
  }
}
