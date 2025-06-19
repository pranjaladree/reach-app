export class StudentModel {
  id: string;
  studentId: string;
  tempId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  classId: string;
  classTitle: string;
  section: string;
  rollNo: string;
  gender: string;
  age: string;
  dob: string;
  relation: string;
  nextOfKin: string;
  specialNeed: string;
  session: string;
  contactPersonName: string;
  contactPersonMobileNo: string;
  relationshipWithStudent: string;
  schoolId: number;
  schoolName: string;
  isActive: string;
  psStatus: string;
  isMarkForQC: boolean;
  mrNo: string;
  facilityType: string;
  facilityName: string;
  isUpdated: boolean;
  targetGroup: string;
  lastPSStatus: string;
  lastReasonForReferral: string;
  lastReportDate: string;
  lastSpectacleStatus: string;
  lastAnySurgeryDone: string;

  constructor({
    id,
    studentId,
    tempId,
    firstName,
    middleName,
    lastName,
    classId,
    classTitle,
    section,
    rollNo,
    gender,
    age,
    dob,
    relation,
    nextOfKin,
    specialNeed,
    session,
    contactPersonName,
    contactPersonMobileNo,
    relationshipWithStudent,
    schoolId,
    schoolName,
    isActive,
    psStatus,
    isMarkForQC,
    mrNo,
    facilityType,
    facilityName,
    isUpdated,
    targetGroup,
    lastPSStatus,
    lastReasonForReferral,
    lastReportDate,
    lastSpectacleStatus,
    lastAnySurgeryDone,
  }: {
    id: string;
    studentId: string;
    tempId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    classId: string;
    classTitle: string;
    section: string;
    rollNo: string;
    gender: string;
    age: string;
    dob: string;
    relation: string;
    nextOfKin: string;
    specialNeed: string;
    session: string;
    contactPersonName: string;
    contactPersonMobileNo: string;
    relationshipWithStudent: string;
    schoolId: number;
    schoolName: string;
    isActive: string;
    psStatus: string;
    isMarkForQC: boolean;
    mrNo: string;
    facilityType: string;
    facilityName: string;
    isUpdated: boolean;
    targetGroup: string;
    lastPSStatus: string;
    lastReasonForReferral: string;
    lastReportDate: string;
    lastSpectacleStatus: string;
    lastAnySurgeryDone: string;
  }) {
    this.id = id;
    this.studentId = studentId;
    this.tempId = tempId;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.classId = classId;
    this.classTitle = classTitle;
    this.section = section;
    this.rollNo = rollNo;
    this.gender = gender;
    this.age = age;
    this.dob = dob;
    this.relation = relation;
    this.nextOfKin = nextOfKin;
    this.specialNeed = specialNeed;
    this.session = session;
    this.contactPersonName = contactPersonName;
    this.contactPersonMobileNo = contactPersonMobileNo;
    this.relationshipWithStudent = relationshipWithStudent;
    this.schoolId = schoolId;
    this.schoolName = schoolName;
    this.isActive = isActive;
    this.psStatus = psStatus;
    this.isMarkForQC = isMarkForQC;
    this.mrNo = mrNo;
    this.facilityType = facilityType;
    this.facilityName = facilityName;
    this.isUpdated = isUpdated;
    this.targetGroup = targetGroup;
    this.lastPSStatus = lastPSStatus;
    this.lastReasonForReferral = lastReasonForReferral;
    this.lastReportDate = lastReportDate;
    this.lastSpectacleStatus = lastSpectacleStatus;
    this.lastAnySurgeryDone = lastAnySurgeryDone;
  }
}
