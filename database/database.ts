import { BLANK_USER_MODEL } from "@/constants/BlankModels";
import { AddModel } from "@/models/other-masters/AddModel";
import { AxisModel } from "@/models/other-masters/AxisModel";
import { ClassModel } from "@/models/other-masters/ClassModel";
import { CYLModel } from "@/models/other-masters/CYLModel";
import { DiagnosisModel } from "@/models/other-masters/DiagnosisModel";
import { DistanceDvaModel } from "@/models/other-masters/DistanceDvaModel";
import { FrameMaterialModel } from "@/models/other-masters/FrameMaterialModel";
import { LensMaterialModel } from "@/models/other-masters/LensMaterialModel";
import { LensSurfaceCoatingModel } from "@/models/other-masters/LensSurfaceCoatingModel";
import { LensTintModel } from "@/models/other-masters/LensTintModel";
import { LensTypeModel } from "@/models/other-masters/LensTypeModel";
import { ModeOfWearModel } from "@/models/other-masters/ModeOfWearModel";
import { NvaModel } from "@/models/other-masters/NvaModel";
import { OcularModel } from "@/models/other-masters/OcularModel";
import { PHModel } from "@/models/other-masters/PHModel";
import { PSStudentModel } from "@/models/other-masters/PSStudentModel";
import { ReachConfigurationModel } from "@/models/other-masters/ReachConfigurationModel";
import { ReasonForReferralModel } from "@/models/other-masters/ReasonForReferral";
import { SpecialInstructionModel } from "@/models/other-masters/SpecialInstructionModel";
import { SpecialityLensModel } from "@/models/other-masters/SpecialityLensModel";
import { SPHModel } from "@/models/other-masters/SPHModel";
import { TorchLightModel } from "@/models/other-masters/TorchLightModel";
import { AdviceVisitModel } from "@/models/patient-at-fixed-facilty/AdviceVisitModel";
import { DiagnosisVisitModel } from "@/models/patient-at-fixed-facilty/DiagnosisVisitModel";
import { MRTagModel } from "@/models/patient-at-fixed-facilty/MRTagModel";
import { RefractionModel } from "@/models/patient-at-fixed-facilty/RefractionModel";
import { VisualAcuityModel } from "@/models/patient-at-fixed-facilty/VisualAcuityModel";
import { ScreeningModel } from "@/models/primary-screening/ScreeningModel";
import { SchoolModel } from "@/models/school/SchoolModel";
import { StudentModel } from "@/models/school/StudentModel";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { FilterModel } from "@/models/ui/FilterModel";
import { GridDropdownModel } from "@/models/ui/GridDropdownModel";
import { UserModel } from "@/models/user/UserModel";
import { ResponseModel } from "@/models/utils/ResponseModel";
import { setScreeningItem } from "@/store/slices/student-slice";
import { SQLiteDatabase } from "expo-sqlite";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  await db.execAsync(`
  PRAGMA journal_mode = 'wal';
  CREATE TABLE IF NOT EXISTS classes (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT,
  minAge INTEGER,
  maxAge INTEGER, 
  displayOrder INTEGER,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')));
  
  CREATE TABLE IF NOT EXISTS sphs (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT,
  description TEXT, 
  displayOrder INTEGER,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')));

  CREATE TABLE IF NOT EXISTS cyls (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT,
  description TEXT, 
  displayOrder INTEGER,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')));

  CREATE TABLE IF NOT EXISTS axis (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT,
  description TEXT, 
  displayOrder INTEGER,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')));

  CREATE TABLE IF NOT EXISTS adds (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT,
  description TEXT, 
  displayOrder INTEGER,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')));

  CREATE TABLE IF NOT EXISTS dvas (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT,
  description TEXT, 
  displayOrder INTEGER,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')));

  CREATE TABLE IF NOT EXISTS frameMaterials (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT,
  description TEXT, 
  displayOrder INTEGER,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')));

  CREATE TABLE IF NOT EXISTS lensMaterials (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT,
  description TEXT, 
  displayOrder INTEGER,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')));

  CREATE TABLE IF NOT EXISTS lensSurfaceCoatings (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT,
  description TEXT, 
  displayOrder INTEGER,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')));

  CREATE TABLE IF NOT EXISTS lensTints (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT,
  description TEXT, 
  displayOrder INTEGER,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')));

  CREATE TABLE IF NOT EXISTS lensTypes (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT,
  description TEXT, 
  displayOrder INTEGER,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')));

  CREATE TABLE IF NOT EXISTS modeOfWears (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT,
  description TEXT, 
  displayOrder INTEGER,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')));

  CREATE TABLE IF NOT EXISTS nvas (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT,
  description TEXT, 
  displayOrder INTEGER,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')));

  CREATE TABLE IF NOT EXISTS phs (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT,
  description TEXT, 
  displayOrder INTEGER,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')));

  CREATE TABLE IF NOT EXISTS specialInstructions (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT,
  description TEXT, 
  displayOrder INTEGER,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')));

  CREATE TABLE IF NOT EXISTS specialityLens (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT,
  description TEXT, 
  displayOrder INTEGER,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')));

  CREATE TABLE IF NOT EXISTS hospitals (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT,
  description TEXT, 
  displayOrder INTEGER,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')));
  
  CREATE TABLE IF NOT EXISTS visionCenters (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT,
  description TEXT, 
  displayOrder INTEGER,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')));

  CREATE TABLE IF NOT EXISTS otherFacilities (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT,
  description TEXT, 
  displayOrder INTEGER,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')));
  
  CREATE TABLE IF NOT EXISTS reachConfigs (
  id INTEGER PRIMARY KEY NOT NULL,
  isNpcTest BOOLEAN,
  isCoverTest BOOLEAN, 
  isPlus2DTest BOOLEAN,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')));

  CREATE TABLE IF NOT EXISTS reasonForRefferals (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT,
  description TEXT, 
  displayOrder INTEGER,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')));

  CREATE TABLE IF NOT EXISTS diagnosisMaster (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT,
  description TEXT, 
  displayOrder INTEGER,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')));
  
  CREATE TABLE IF NOT EXISTS ocularComplaints (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT,description TEXT, 
  displayOrder INTEGER,
  isReferCase BOOLEAN, 
  isBinacular BOOLEAN, 
  ocularType TEXT,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')));
  
  CREATE TABLE IF NOT EXISTS torchlightFindings (
  id INTEGER PRIMARY KEY NOT NULL,
  title TEXT,
  description TEXT, 
  displayOrder INTEGER,
  action TEXT,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')));

  CREATE TABLE IF NOT EXISTS schools (
  id INTEGER PRIMARY KEY NOT NULL,
  schoolId TEXT, 
  schoolName TEXT NOT NULL,
  classFromId INTEGER,
  classUptoId INTEGER, 
  latitude REAL,
  longitude REAL,
  projectId INTEGER,
  visionCenterId INTEGER, 
  autoRefAvailable BOOLEAN, 
  activityType TEXT,
  followupSchool BOOLEAN,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')));
  
  CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY NOT NULL, 
  studentId TEXT NOT NULL,
  tempId TEXT NOT NULL,
  firstName TEXT NOT NULL,
  middleName TEXT,
  lastName TEXT,
  classId INTEGER,
  section TEXT,
  rollNo INTEGER,
  age INTEGER, 
  gender TEXT,
  specialNeed TEXT,
  relation TEXT,
  nextOfKin TEXT,
  contactNo TEXT,
  relationshipWithStudent TEXT,
  schoolId INTEGER,
  targetGroup TEXT,
  isUpdated BOOLEAN,
  isMarkedForQc BOOLEAN,
  lastPSStatus TEXT,
  lastReasonForReferral TEXT,
  lastReportDate TEXT,
  lastSpectacleStatus TEXT,
  lastAnySurgeryDone TEXT,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')),
  FOREIGN KEY (schoolId) REFERENCES schools(id),
  FOREIGN KEY (classId) REFERENCES classes(id));

  CREATE TABLE IF NOT EXISTS screenings (
  id INTEGER PRIMARY KEY NOT NULL,
  usingSpectacle TEXT,
  haveSpecNow TEXT, 
  specCondition TEXT,
  unableToPerformVisionTest TEXT,
  canReadLogmarLE TEXT,
  canReadLogmarRE TEXT,
  visionAutoRefLE TEXT,
  visionAutoRefRE TEXT,
  acceptanceSPHLE TEXT,
  acceptanceSPHRE TEXT,
  acceptanceCYLLE TEXT,
  acceptanceCYLRE TEXT,
  acceptanceAXISLE TEXT,
  acceptanceAXISRE TEXT,
  IPDBoth TEXT,
  torchlightCheckLE TEXT,
  torchlightCheckRE TEXT,
  torchlightFindings TEXT,
  ocularComplaint TEXT,
  ocularList TEXT,
  npcTest TEXT,
  coverTest TEXT,
  plus2DTestLE TEXT,
  plus2DTestRE TEXT,
  colorVisionLE TEXT,
  colorVisionRE TEXT,
  psStatus TEXT,referralReason TEXT,
  appointmentDate TEXT,
  mobileNo TEXT,
  facilityType TEXT,
  facilityId INTEGER,
  otherReason TEXT,
  instructionForReferralCenter TEXT,
  psUpdatedAt TEXT,
  screeningDoneBy TEXT,
  screenerType TEXT,
  isEditable TEXT,
  isQcDone BOOLEAN,
  studentId INTEGER,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')),
  FOREIGN KEY (studentId) REFERENCES students(id));

  CREATE TABLE IF NOT EXISTS mrTags (
  id TEXT PRIMARY KEY NOT NULL, 
  mrNo TEXT, 
  visitDate TEXT,
  facilityType TEXT,
  facilityId TEXT,
  studentId INTEGER,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')),
  FOREIGN KEY (studentId) REFERENCES students(id));

  CREATE TABLE IF NOT EXISTS visualAcuity (
  id INTEGER PRIMARY KEY NOT NULL, 
  visualExamWithSpecsDvaLe TEXT,
  visualExamWithSpecsDvaRe TEXT,
  visualExamWithSpecsNvaLe TEXT,
  visualExamWithSpecsNvaRe TEXT,
  visualExamWithSpecsPhLe TEXT,
  visualExamWithSpecsPhRe TEXT,
  visualExamWithoutSpecsDvaLe TEXT,
  visualExamWithoutSpecsDvaRe TEXT,
  visualExamWithoutSpecsNvaLe TEXT,
  visualExamWithoutSpecsNvaRe TEXT,
  visualExamWithoutSpecsPhLe TEXT,
  visualExamWithoutSpecsPhRe TEXT,
  mrId INTEGER,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')),
  FOREIGN KEY (mrId) REFERENCES mrTags(id));

  CREATE TABLE IF NOT EXISTS refraction (
  id INTEGER PRIMARY KEY NOT NULL, 
  refractionPgpSphLe TEXT,
  refractionPgpSphRe TEXT,
  refractionPgpCylLe TEXT,
  refractionPgpCylRe TEXT,
  refractionPgpAxisLe TEXT,
  refractionPgpAxisRe TEXT,
  refractionPgpAddLe TEXT,
  refractionPgpAddRe TEXT,
  refractionDRYRETINOSphRe TEXT,
  refractionDRYRETINOSphLe TEXT,
  refractionDRYRETINOCylRe TEXT,
  refractionDRYRETINOCylLe TEXT,
  refractionDRYRETINOAXIS_RE TEXT,
  refractionDRYRETINOAXIS_LE TEXT,
  refractionCYCLORETINOSphRe TEXT,
  refractionCYCLORETINOSphLe TEXT,
  refractionCYCLORETINOCylRe TEXT,
  refractionCYCLORETINOCylLe TEXT,
  refractionCYCLORETINO_AXIS_RE TEXT,
  refractionCYCLORETINO_AXIS_LE TEXT,
  refractionAcceptanceSphRe TEXT,
  refractionAcceptanceSphLe TEXT,
  refractionAcceptanceCylRe TEXT,
  refractionAcceptanceCylLe TEXT,
  refractionAcceptanceAxisRe TEXT,
  refractionAcceptanceAxisLe TEXT,
  refractionBCVARe TEXT,
  refractionBCVALe TEXT,
  refractionAddSphRe TEXT,
  refractionAddSphLe TEXT,
  refractionBCVASphLe TEXT,
  refractionAddNvaRe TEXT,
  refractionAddNvaLe TEXT,
  refractionPapillaryDistSPhRe TEXT,
  refractionPapillaryDistIPdRe TEXT,
  refractionPapillaryDistSPhLe TEXT,
  refractionRemarksRe TEXT,
  refractionRemarksLe TEXT,
  refractionLensMaterial TEXT,
  refractionFrameMaterial TEXT,
  refractionLensType TEXT,
  refractionSpecialityLens TEXT,
  refractionModeOfWear TEXT,
  refractionLensSurface_Coating TEXT,
  refractionLensTint TEXT,
  refractionSpecialInstruction TEXT,
  refractionRemarks2 TEXT,
  spectaclesPrescribed BOOLEAN,
  specialInstruction TEXT,
  mrId INTEGER,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')),
  FOREIGN KEY (mrId) REFERENCES mrTags(id));

  CREATE TABLE IF NOT EXISTS advice (
  id TEXT PRIMARY KEY NOT NULL,   
  isSpectaclePrescribed BOOLEAN,
  isMedicinePrescribed BOOLEAN,
  isContinueWithSameGlass BOOLEAN,
  isNoTreatmentRequired BOOLEAN,
  isPatientRefer BOOLEAN,
  referredFacilityType TEXT,
  referredFacilityId TEXT,
  referralReason TEXT,
  isSurgeryRequired BOOLEAN,
  surgeryType TEXT,
  otherComments TEXT,
  mrId INTEGER,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')),
  FOREIGN KEY (mrId) REFERENCES mrTags(id));

  CREATE TABLE IF NOT EXISTS diagnosis (
  id INTEGER PRIMARY KEY NOT NULL,
  diagnosisItems TEXT,
  mrId INTEGER,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')),
  FOREIGN KEY (mrId) REFERENCES mrTags(id));

  CREATE TABLE IF NOT EXISTS spectacleBooking (
  id TEXT PRIMARY KEY NOT NULL,
  frameName TEXT,   
  bookingDate TEXT,
  mrId INTEGER,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')),
  FOREIGN KEY (mrId) REFERENCES mrTags(id));

  CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY NOT NULL,
  userName TEXT,
  password TEXT,
  firstName TEXT,
  middleName TEXT,
  lastName TEXT,
  designation TEXT,
  isPartnerAgreement BOOLEAN,
  isUserAgreement BOOLEAN,
  isPIIAgreement BOOLEAN,
  isDevicePreparation BOOLEAN,
  isDataSync BOOLEAN,
  isQualityCheck BOOLEAN
  );
`);
}

export async function dropTables(db: SQLiteDatabase) {
  try {
    const response = await db.execAsync(`
    PRAGMA journal_mode = 'wal';
    DROP TABLE classes;
    DROP TABLE sphs;
    DROP TABLE cyls;
    DROP TABLE axis;  
    DROP TABLE adds;
    DROP TABLE dvas;
    DROP TABLE frameMaterials;
    DROP TABLE lensMaterials;
    DROP TABLE lensSurfaceCoatings;
    DROP TABLE lensTints;
    DROP TABLE lensTypes;
    DROP TABLE modeOfWears;
    DROP TABLE nvas;
    DROP TABLE phs;
    DROP TABLE specialInstructions;
    DROP TABLE specialityLens;
    DROP TABLE hospitals;
    DROP TABLE visionCenters;
    DROP TABLE otherFacilities;
    DROP TABLE reasonForRefferals;
    DROP TABLE ocularComplaints;
    DROP TABLE torchlightFindings;
    DROP TABLE schools;
    DROP TABLE students;
    DROP TABLE screenings;
    DROP TABLE mrTags;
    DROP TABLE users;
   `);
    console.log("DB DROPS", response);
  } catch (err) {
    console.log(err);
  }
}

export const saveSchool = async (
  db: SQLiteDatabase,
  schoolItem: SchoolModel
) => {
  console.log("SChool", schoolItem);
  try {
    const response = db.runSync(
      "INSERT OR REPLACE INTO schools (id,schoolId,schoolName, classFromId, classUptoId, latitude, longitude, projectId, visionCenterId, autorefAvailable,activityType,followupSchool) VALUES (?,?,?,?, ?,?,?,?,?,?,?,?)",
      schoolItem.id,
      schoolItem.schoolId,
      schoolItem.schoolName,
      schoolItem.classFromId,
      schoolItem.classUptoId,
      schoolItem.latitude,
      schoolItem.longitude,
      schoolItem.projectId,
      schoolItem.visionCenterId,
      schoolItem.isAutorefAvailable,
      schoolItem.activityType,
      schoolItem.isFollowupSchool
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const saveSchoolLocation = async (
  db: SQLiteDatabase,
  schoolId: string,
  latitude: string,
  longitude: string
) => {
  try {
    const response = db.runSync(
      `UPDATE schools SET
      latitude=?,
      longitude=?
      WHERE id=?;`,
      [latitude, longitude, schoolId]
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getSchoolCounts = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(
      `SELECT activityType, COUNT(*) as count FROM schools GROUP BY activityType`
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getSchoolsFromDB = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM schools`);
    console.log("Response School", response);
    const arr: SchoolModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new SchoolModel({
            id: item.id,
            schoolId: "",
            schoolName: item.schoolName,
            classFromId: item.classFromId,
            classUptoId: "",
            latitude: 0,
            longitude: 0,
            visionCenterId: "",
            projectId: "",
            isAutorefAvailable: false,
            activityType: "",
            isFollowupSchool: false,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
  }
};

export const getSchoolsDropdownFromDB = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM schools`);
    console.log("Response School", response);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            label: item.schoolName,
            value: item.schoolName,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
  }
};

export const deleteSchoool = async (db: SQLiteDatabase, id: number) => {
  try {
    const response = await db.runAsync(`DELETE FROM schools WHERE id=${id}`);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const insertBulkStudentsToDB = async (
  db: SQLiteDatabase,
  studentItems: StudentModel[]
) => {
  console.log("Saving Student Data ...");
  try {
    const response = await db.withTransactionAsync(async () => {
      studentItems.forEach((item) => {
        db.runSync(
          `INSERT OR REPLACE INTO students (id,studentId,tempId,firstName,middleName,lastName,classId,section,rollNo,age,gender,specialNeed,relation,nextOfKin,contactNo,relationshipWithStudent,schoolId,isUpdated,isMarkedForQc) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          item.id,
          item.studentId,
          item.studentId,
          item.firstName,
          item.middleName,
          item.lastName,
          item.classId,
          item.section,
          item.rollNo,
          item.age,
          item.gender,
          item.specialNeed,
          item.relation,
          item.nextOfKin,
          item.contactPersonMobileNo,
          item.relationshipWithStudent,
          item.schoolId,
          item.isUpdated,
          item.isMarkForQC
        );
      });
    });
    return "Student Saved Successfully";
  } catch (err) {
    console.log(err);
  }
};

export const saveNewStudent = async (
  db: SQLiteDatabase,
  item: StudentModel
) => {
  try {
    console.log("Saving Students ********");
    const response = db.runSync(
      `INSERT INTO students (id,studentId,tempId,firstName,middleName,lastName,classId,section,rollNo,age,gender,specialNeed,relation,nextOfKin,contactNo,relationshipWithStudent,schoolId,isUpdated) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      item.id,
      item.studentId,
      item.studentId,
      item.firstName,
      item.middleName,
      item.lastName,
      item.classId,
      item.section,
      item.rollNo,
      item.age,
      item.gender,
      item.specialNeed,
      item.relation,
      item.nextOfKin,
      item.contactPersonMobileNo,
      item.relationshipWithStudent,
      item.schoolId,
      true
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const updateStudent = async (db: SQLiteDatabase, item: StudentModel) => {
  console.log("Student", item);
  try {
    const response = db.runSync(
      `UPDATE students SET
      studentId=?,
      tempId=?,
      firstName=?,
      middleName=?,
      lastName=?,
      classId=?,
      section=?,
      rollNo=?,
      age=?,
      gender=?,
      specialNeed=?,
      relation=?,
      nextOfKin=?,
      contactNo=?,
      relationshipWithStudent=?,
      schoolId=?,
      isUpdated=? 
      WHERE id=?;`,
      [
        item.studentId,
        item.studentId,
        item.firstName,
        item.middleName,
        item.lastName,
        item.classId,
        item.section,
        item.rollNo,
        item.age,
        item.gender,
        item.specialNeed,
        item.relation,
        item.nextOfKin,
        item.contactPersonMobileNo,
        item.relationshipWithStudent,
        item.schoolId,
        true,
        item.id,
      ]
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const findStudentById = async (db: SQLiteDatabase, id: string) => {
  try {
    console.log("GET STUDENTS ...");
    const response = await db.getFirstAsync(
      "SELECT  * FROM students WHERE id=?;",
      [id]
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getStudentCounts = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(
      `SELECT  COUNT(*) as count FROM students`
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const savePrimaryScreening = async (
  db: SQLiteDatabase,
  sceeningItem: ScreeningModel
) => {
  console.log("screening Item", sceeningItem);
  try {
    const response = db.runSync(
      "INSERT OR REPLACE INTO screenings (id,usingSpectacle,haveSpecNow,specCondition,unableToPerformVisionTest,canReadLogmarLE,canReadLogmarRE,visionAutoRefLE,visionAutoRefRE,acceptanceSPHLE,acceptanceSPHRE,acceptanceCYLLE,acceptanceCYLRE,acceptanceAXISLE,acceptanceAXISRE,IPDBoth,torchlightCheckLE,torchlightCheckRE,torchlightFindings,ocularComplaint,ocularList,npcTest,coverTest,plus2DTestLE,plus2DTestRE,colorVisionLE,colorVisionRE,psStatus,referralReason,appointmentDate,mobileNo,facilityType,facilityId,otherReason,instructionForReferralCenter,studentId,psUpdatedAt,screeningDoneBy,screenerType,isQCDone,isEditable) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      sceeningItem.id,
      sceeningItem.usingSpectacle,
      sceeningItem.haveSpecNow,
      sceeningItem.specCondition,
      sceeningItem.unableToPerformVisionTest,
      sceeningItem.canReadLogmarLE.id == "0"
        ? ""
        : sceeningItem.canReadLogmarLE.value,
      sceeningItem.canReadLogmarRE.id == "0"
        ? ""
        : sceeningItem.canReadLogmarRE.value,
      sceeningItem.visionAutoRefLE.id == "0"
        ? ""
        : sceeningItem.visionAutoRefLE.value,
      sceeningItem.visionAutoRefRE.id == "0"
        ? ""
        : sceeningItem.visionAutoRefRE.value,
      sceeningItem.acceptanceSPHLE.id == "0"
        ? ""
        : sceeningItem.acceptanceSPHLE.title,
      sceeningItem.acceptanceSPHRE.id == "0"
        ? ""
        : sceeningItem.acceptanceSPHRE.title,
      sceeningItem.acceptanceCYLLE.id == "0"
        ? ""
        : sceeningItem.acceptanceCYLLE.title,
      sceeningItem.acceptanceCYLRE.id == "0"
        ? ""
        : sceeningItem.acceptanceCYLRE.title,
      sceeningItem.acceptanceAXISLE.id == "0"
        ? ""
        : sceeningItem.acceptanceAXISLE.value,
      sceeningItem.acceptanceAXISRE.id == "0"
        ? ""
        : sceeningItem.acceptanceAXISRE.value,
      sceeningItem.IPDBoth,
      sceeningItem.torchlightCheckLE.id == "0"
        ? ""
        : sceeningItem.torchlightCheckLE.value,
      sceeningItem.torchlightCheckRE.id == "0"
        ? ""
        : sceeningItem.torchlightCheckRE.value,
      sceeningItem.torchlightFindings,
      sceeningItem.ocularComplaint,
      sceeningItem.ocularList,
      sceeningItem.npcTest.id == "0" ? "" : sceeningItem.npcTest.value,
      sceeningItem.coverTest.id == "0" ? "" : sceeningItem.coverTest.value,
      sceeningItem.plus2DTestLE.id == "0"
        ? ""
        : sceeningItem.plus2DTestLE.value,
      sceeningItem.plus2DTestRE.id == "0"
        ? ""
        : sceeningItem.plus2DTestRE.value,
      sceeningItem.colorVisionLE.id == "0"
        ? ""
        : sceeningItem.colorVisionLE.value,
      sceeningItem.colorVisionRE.id == "0"
        ? ""
        : sceeningItem.colorVisionRE.value,
      sceeningItem.psStatus,
      sceeningItem.referralReason,
      sceeningItem.appointmentDate,
      sceeningItem.mobileNo,
      sceeningItem.facilityType.id == "0"
        ? ""
        : sceeningItem.facilityType.value,
      sceeningItem.facilityName.id == "0" ? "" : sceeningItem.facilityName.id,
      sceeningItem.otherReason,
      sceeningItem.instructionForReferralCenter,
      sceeningItem.studentId,
      new Date().toISOString(),
      "1",
      "PS",
      sceeningItem.isQCDone,
      !sceeningItem.isQCDone
    );

    // If mobileNo update
    if (sceeningItem.mobileNo != "") {
      const response2 = db.runSync(
        `UPDATE students SET
        contactNo=?
        WHERE id=?;`,
        [sceeningItem.mobileNo, sceeningItem.studentId]
      );
      return response;
    }

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const findScreeningById = async (db: SQLiteDatabase, id: string) => {
  try {
    const response = await db.getFirstAsync(
      `SELECT * from screenings LEFT JOIN students ON screenings.studentId = students.id WHERE screenings.studentId=${id}`
    );
    console.log("RES *****************************", response);
    if (response) {
      return response;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getScreeningByIdFromDB = async (
  db: SQLiteDatabase,
  id: number
) => {
  console.log("Screen Id", id);
  try {
    const response = await db.getAllAsync(`
      SELECT 
      students.id AS id,
      students.studentId AS studentId,
      students.firstName AS firstName,
      students.lastName AS lastName,
      students.gender as gender,
      students.age as age,
      screenings.usingSpectacle AS usingSpectacle
      FROM 
        students
      LEFT JOIN 
        screenings ON screenings.studentId = students.id WHERE students.id=${id}
    `);
    console.log("Response", response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const preparePSDataSync = async (
  db: SQLiteDatabase,
  schoolId: string
) => {
  try {
    const response = await db.getAllAsync(
      `SELECT * FROM screenings JOIN students ON screenings.studentId == students.id WHERE students.schoolId="${schoolId}"`
    );
    console.log("Response", response);
    const studentList: any[] = [];
    if (response) {
      response.map((item: any) => {
        console.log(item.isQcDone == 1);
        let psItem = new PSStudentModel({
          id: item.id,
          sessionHistoryId: item.id,
          tempStudentId: item.studentId,
          usingSpectacles: item.usingSpectacle,
          haveSpecsNow: item.haveSpecNow,
          spectacleConditionGood: item.specCondition,
          unableToPerformTest: item.unableToPerformVisionTest,
          notReadLogmarwithoutSpecsRe: item.canReadLogmarRE,
          notReadLogmarwithoutSpecsLe: item.canReadLogmarLE,
          readUsingLensWithoutSpecsRE: item.plus2DTestRE,
          readUsingLensWithoutSpecsLE: item.plus2DTestLE,
          ocularComplaint: item.ocularComplaint,
          ocularComplaintList: [],
          torchLightCheckLe: item.torchlightCheckLE,
          torchLightCheckRe: item.torchlightCheckRE,
          coverTest: item.coverTest,
          npcTest: item.npcTest,
          colorVisionRe: item.colorVisionRE,
          colorVisionLe: item.colorVisionLE,
          visionWithAutoRefRe: item.visionAutoRefRE,
          visionWithAutoRefLe: item.visionAutoRefLE,
          acceptanceSphLe: item.acceptanceSPHLE,
          acceptanceCylLe: item.acceptanceCYLLE,
          acceptanceAxisLe: item.acceptanceSPHLE,
          acceptanceSphRe: item.acceptanceSPHRE,
          acceptanceCylRe: item.acceptanceCYLRE,
          acceptanceAxisRe: item.acceptanceAXISRE,
          ipdAutoRef: item.IPDBoth,
          psStatus: item.psStatus,
          qualityCheckDone: item.isQcDone == 1 ? true : false,
          torchLightFindings: item.torchlightFindings,
          psUpdatedAt: item.psUpdatedAt,
          screenerType: "PS",
        });

        if (item.psStatus != "NORMAL") {
          psItem = {
            ...psItem,
            referralRequest: {
              referralReason: item.referralReason,
              appointmentDate: item.appointmentDate,
              mobileNo: item.mobileNo, //need to set in contactPersonNo in student table
              facilityType: item.facilityType,
              facilityId: item.facilityId,
              otherReason: item.otherReason,
              instructionForReferralCenter: item.instructionForReferralCenter,
            },
          };
        }
        if (item.isUpdated) {
          psItem = {
            ...psItem,
            studentData: {
              firstName: item.firstName,
              middle_name: item.middleName,
              last_name: item.lastName,
              class_id: item.classId, //this should be intger
              section: item.section,
              roll_no: item.rollNo,
              gender: item.gender,
              age: item.age,
              contactPersonName: item.nextOfKin,
              contactPersonNo: item.contactNo,
              relationshipWithStudent: item.relationshipWithStudent,
              special_need: item.specialNeed, //id
              relation: item.relation,
              nextOfKin: item.nextOfKin,
            },
          };
          //Add Student Data
        }
        studentList.push({
          ...psItem,
        });
      });
    }
    let data = {
      schoolId: schoolId,
      activityType: "PRIMARY_SCREENING",
      sessionId: "1",
      students: studentList,
    };
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const prepareMRDataSync = async (
  db: SQLiteDatabase,
  schoolId: string
) => {
  try {
    const response = await db.getAllAsync(
      `SELECT * FROM mrTags JOIN students ON mrTags.studentId = students.id LEFT JOIN visualAcuity ON visualAcuity.mrId = mrTags.id LEFT JOIN refraction ON refraction.mrId=mrTags.id LEFT JOIN advice ON advice.mrId = mrTags.id LEFT JOIN diagnosis ON diagnosis.mrId = mrTags.id  WHERE students.schoolId="${schoolId}"`
    );
    console.log("MR TAG DATA", response);
    const studentList: any[] = [];
    if (response) {
      response.map((item: any) => {
        let diagnosisItems;
        if (item.diagnosisItems) {
          diagnosisItems = JSON.parse(item.diagnosisItems);
        }

        let spectacleBooking;
        if (item.bookingDate) {
          spectacleBooking = {
            status: "BOOKED/NOTVERIFIED",
            bookingDate: item.bookingDate,
            frameName: item.frameName,
          };
        }

        let studentItem = {
          tempStudentId: item.tempId,
          mrNo: item.mrNo,
          visitDate: item.visitDate,
          facilityType: item.facilityType,
          facilityId: item.facilityId,
          visualAcuity: {
            visualExamWithoutSpecsDvaRe: item.visualExamWithoutSpecsDvaRe,
            visualExamWithoutSpecsDvaLe: item.visualExamWithoutSpecsDvaLe,
            visualExamWithoutSpecsPhLe: item.visualExamWithoutSpecsPhLe,
            visualExamWithoutSpecsPhRe: item.visualExamWithoutSpecsPhRe,
            visualExamWithoutSpecsNvaRe: item.visualExamWithoutSpecsNvaRe,
            visualExamWithoutSpecsNvaLe: item.visualExamWithoutSpecsNvaLe,
            visualExamWithSpecsDvaRe: item.visualExamWithSpecsDvaRe,
            visualExamWithSpecsDvaLe: item.visualExamWithSpecsDvaLe,
            visualExamWithSpecsPhLe: item.visualExamWithSpecsPhLe,
            visualExamWithSpecsPhRe: item.visualExamWithSpecsPhRe,
            visualExamWithSpecsNvaRe: item.visualExamWithSpecsNvaRe,
            visualExamWithSpecsNvaLe: item.visualExamWithSpecsNvaLe,
          },
          refraction: {
            refractionPgpSphLe: item.refractionPgpSphLe,
            refractionPgpSphRe: item.refractionPgpSphRe,
            refractionPgpCylLe: item.refractionPgpCylLe,
            refractionPgpCylRe: item.refractionPgpCylRe,
            refractionPgpAxisLe: item.refractionPgpAxisLe,
            refractionPgpAxisRe: item.refractionPgpAxisRe,
            refractionPgpAddLe: item.refractionPgpAddLe,
            refractionPgpAddRe: item.refractionPgpAddRe,
            refractionDryretinoSphRe: item.refractionDRYRETINOSphLe,
            refractionDryretinoSphLe: item.refractionDRYRETINOSphRe,
            refractionDryretinoCylRe: item.refractionDRYRETINOCylRe,
            refractionDryretinoCylLe: item.refractionDRYRETINOCylLe,
            refractionDryretinoAxisRe: item.refractionDRYRETINOAXIS_RE,
            refractionDryretinoAxisLe: item.refractionDRYRETINOAXIS_LE,
            refractionCycloretinoSphRe: item.refractionCYCLORETINOSphRe,
            refractionCycloretinoSphLe: item.refractionCYCLORETINOSphLe,
            refractionCycloretinoCylRe: item.refractionCYCLORETINOCylRe,
            refractionCycloretinoCylLe: item.refractionCYCLORETINOCylLe,
            refractionCycloretinoAxisRe: item.refractionCYCLORETINO_AXIS_RE,
            refractionCycloretinoAxisLe: item.refractionCYCLORETINO_AXIS_LE,
            refractionAcceptanceSphRe: item.refractionAcceptanceSphRe,
            refractionAcceptanceSphLe: item.refractionAcceptanceSphLe,
            refractionAcceptanceCylRe: item.refractionAcceptanceCylRe,
            refractionAcceptanceCylLe: item.refractionAcceptanceCylLe,
            refractionAcceptanceAxisRe: item.refractionAcceptanceAxisRe,
            refractionAcceptanceAxisLe: item.refractionAcceptanceAxisLe,
            refractionBcvaRe: item.refractionBCVARe,
            refractionBcvaLe: item.refractionBCVALe,
            refractionAddSphRe: item.refractionAddSphRe,
            refractionAddSphLe: item.refractionAddSphLe,
            refractionAddNvaRe: item.refractionAddNvaRe,
            refractionAddNvaLe: item.refractionAddNvaLe,
            refractionPupillaryDistSphRe: item.refractionPapillaryDistSPhRe,
            refractionPupillaryDistIpdRe: item.refractionPapillaryDistIPdRe,
            refractionPupillaryDistSphLe: item.refractionPapillaryDistSPhLe,
            refractionRemarksRe: item.refractionRemarksRe,
            refractionRemarksLe: item.refractionRemarksLe,
            lensMaterialId: item.refractionLensMaterial,
            frameMaterialId: item.refractionFrameMaterial,
            lensTypeId: item.refractionLensType,
            specialityLensId: item.refractionSpecialityLens,
            modeOfWearId: item.refractionModeOfWear,
            lensSurfaceCoatingId: item.refractionLensSurface_Coating,
            lensTintId: item.refractionLensTint,
            specialInstructionId: item.refractionSpecialInstruction,
            spectaclesPrescribed: item.spectaclesPrescribed,
          },
          advice: {
            specsPrescribed: item.isSpectaclePrescribed,
            medsPrescribed: item.isMedicinePrescribed,
            continueSameGlasses: item.isContinueWithSameGlass,
            noTreatmentRequired: item.isNoTreatmentRequired,
            patientRefer: item.isPatientRefer,
            facilityType: item.referredFacilityType,
            facilityId: item.referredFacilityId,
            referralReasonId: item.lastAnySurgeryDone,
            surgeryRequired: item.isSurgeryRequired,
            surgeryType: item.isSurgeryRequired,
            otherComment: item.otherComments,
            remarks: "Follow medication schedule strictly",
          },
          diagnosis: diagnosisItems,
          spectaleBooking: spectacleBooking,
        };
        studentList.push({
          ...studentItem,
        });
      });
    }
    let data = {
      schoolId: schoolId,
      mrDetails: studentList,
    };
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getPSCounts = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(
      `SELECT  COUNT(*) as count FROM screenings`
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const insertClassesToDB = async (
  db: SQLiteDatabase,
  items: ClassModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item) => {
        db.runSync(
          `INSERT OR REPLACE INTO classes (id,title,minAge,maxAge,displayOrder) VALUES (?,?,?,?,?)`,
          item.id,
          item.title,
          item.minAge,
          item.maxAge,
          item.displayOrder
        );
      });
    });
    console.log("REsponse", response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const insertMasterDataToDB = async (
  db: SQLiteDatabase,
  items: GridDropdownModel[],
  tableName: string
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item) => {
        db.runSync(
          `INSERT OR REPLACE INTO ${tableName} (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder
        );
      });
    });
    console.log("REsponse", response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getMasterDataFromDB = async (
  db: SQLiteDatabase,
  tableName: string
) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM ${tableName}`);
    const arr: GridDropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new GridDropdownModel({
            id: item.id,
            title: item.title,
            description: item.description,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
  }
};

export const saveMasterDropdownToDB = async (
  db: SQLiteDatabase,
  items: DropdownModel[],
  tableName: string
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item) => {
        db.runSync(
          `INSERT OR REPLACE INTO ${tableName} (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.value,
          item.label,
          1
        );
      });
    });
    console.log("REsponse", response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getMasterDropdownFromDB = async (
  db: SQLiteDatabase,
  tableName: string
) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM ${tableName}`);
    console.log("Response SPHS", response);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        console.log("O", item);
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.description,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
  }
};

export const saveMRTag = async (db: SQLiteDatabase, mrTagItem: MRTagModel) => {
  try {
    console.log("Saving MR Tags ....");
    const response = db.runSync(
      "INSERT OR REPLACE INTO mrTags (id,mrNo,visitDate,facilityType,facilityId,studentId) VALUES (?,?,?,?,?,?)",
      mrTagItem.id,
      mrTagItem.mrNo,
      mrTagItem.visitDate,
      mrTagItem.facilityType,
      mrTagItem.facilityId,
      mrTagItem.studentId
    );
    console.log("RES", response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const findOneMRTag = async (db: SQLiteDatabase, studentId: string) => {
  try {
    const response: any = await db.getFirstAsync(
      `SELECT * FROM mrTags WHERE studentId=${studentId}`
    );
    console.log("RESpons", response);
    if (response) {
      return new ResponseModel({
        data: new MRTagModel({
          id: response.id,
          mrNo: response.mrNo,
          visitDate: response.visitDate,
          facilityType: response.facilityType,
          facilityId: response.facilityId,
          studentId: response.studentId,
        }),
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const saveVisualAcuity = async (
  db: SQLiteDatabase,
  item: VisualAcuityModel
) => {
  try {
    const response = db.runSync(
      "INSERT OR REPLACE INTO visualAcuity (id,visualExamWithSpecsDvaLe,visualExamWithSpecsDvaRe,visualExamWithSpecsNvaLe,visualExamWithSpecsNvaRe,visualExamWithSpecsPhLe,visualExamWithSpecsPhRe,visualExamWithoutSpecsDvaLe,visualExamWithoutSpecsDvaRe,visualExamWithoutSpecsNvaLe,visualExamWithoutSpecsNvaRe,visualExamWithoutSpecsPhLe,visualExamWithoutSpecsPhRe,mrId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      item.id,
      item.visualExamWithSpecsDvaLe,
      item.visualExamWithSpecsDvaRe,
      item.visualExamWithSpecsNvaLe,
      item.visualExamWithSpecsNvaRe,
      item.visualExamWithSpecsPhLe,
      item.visualExamWithSpecsPhRe,
      item.visualExamWithoutSpecsDvaLe,
      item.visualExamWithoutSpecsDvaRe,
      item.visualExamWithoutSpecsNvaLe,
      item.visualExamWithoutSpecsNvaRe,
      item.visualExamWithoutSpecsPhLe,
      item.visualExamWithoutSpecsPhRe,
      item.mrId
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const findOneVisualAcuity = async (db: SQLiteDatabase, mrId: string) => {
  try {
    const response: any = await db.getFirstAsync(
      `SELECT * FROM visualAcuity WHERE mrId=${mrId}`
    );
    console.log("RESpons VISUL ACCU", response);
    if (response) {
      return new ResponseModel({
        data: new VisualAcuityModel({
          id: response.id,
          visualExamWithSpecsDvaLe: response.visualExamWithSpecsDvaLe,
          visualExamWithSpecsDvaRe: response.visualExamWithSpecsDvaRe,
          visualExamWithSpecsNvaLe: response.visualExamWithSpecsNvaLe,
          visualExamWithSpecsNvaRe: response.visualExamWithSpecsNvaRe,
          visualExamWithSpecsPhLe: response.visualExamWithSpecsPhLe,
          visualExamWithSpecsPhRe: response.visualExamWithSpecsPhRe,
          visualExamWithoutSpecsDvaLe: response.visualExamWithoutSpecsDvaLe,
          visualExamWithoutSpecsDvaRe: response.visualExamWithoutSpecsDvaRe,
          visualExamWithoutSpecsNvaLe: response.visualExamWithoutSpecsNvaLe,
          visualExamWithoutSpecsNvaRe: response.visualExamWithoutSpecsNvaRe,
          visualExamWithoutSpecsPhLe: response.visualExamWithoutSpecsPhLe,
          visualExamWithoutSpecsPhRe: response.visualExamWithoutSpecsPhRe,
          mrId: response.mrId,
        }),
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const saveRefraction = async (
  db: SQLiteDatabase,
  item: RefractionModel
) => {
  try {
    try {
      const response = db.runSync(
        "INSERT OR REPLACE INTO refraction (id,refractionPgpSphLe,refractionPgpSphRe,refractionPgpCylLe,refractionPgpCylRe,refractionPgpAxisLe,refractionPgpAxisRe,refractionPgpAddLe,refractionPgpAddRe,refractionDRYRETINOSphRe,refractionDRYRETINOSphLe,refractionDRYRETINOCylRe,refractionDRYRETINOCylLe,refractionDRYRETINOAXIS_RE,refractionDRYRETINOAXIS_LE,refractionCYCLORETINOSphRe,refractionCYCLORETINOSphLe,refractionCYCLORETINOCylRe,refractionCYCLORETINOCylLe,refractionCYCLORETINO_AXIS_RE,refractionCYCLORETINO_AXIS_LE,refractionAcceptanceSphRe,refractionAcceptanceSphLe,refractionAcceptanceCylRe,refractionAcceptanceCylLe,refractionAcceptanceAxisRe,refractionAcceptanceAxisLe,refractionBCVARe,refractionBCVALe,refractionAddSphRe,refractionAddSphLe,refractionBCVASphLe,refractionAddNvaRe,refractionAddNvaLe,refractionPapillaryDistSPhRe,refractionPapillaryDistIPdRe,refractionPapillaryDistSPhLe,refractionRemarksRe,refractionRemarksLe,refractionLensMaterial,refractionFrameMaterial,refractionLensType,refractionSpecialityLens,refractionModeOfWear,refractionLensSurface_Coating,refractionLensTint,refractionSpecialInstruction,refractionRemarks2,spectaclesPrescribed,specialInstruction,mrId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        item.id,
        item.refractionPgpSphLe,
        item.refractionPgpSphRe,
        item.refractionPgpCylLe,
        item.refractionPgpCylRe,
        item.refractionPgpAxisLe,
        item.refractionPgpAxisRe,
        item.refractionPgpAddLe,
        item.refractionPgpAddRe,
        item.refractionDRYRETINOSphRe,
        item.refractionDRYRETINOSphLe,
        item.refractionDRYRETINOCylRe,
        item.refractionDRYRETINOCylLe,
        item.refractionDRYRETINOAXIS_RE,
        item.refractionDRYRETINOAXIS_LE,
        item.refractionCYCLORETINOSphRe,
        item.refractionCYCLORETINOSphLe,
        item.refractionCYCLORETINOCylRe,
        item.refractionCYCLORETINOCylLe,
        item.refractionCYCLORETINO_AXIS_RE,
        item.refractionCYCLORETINO_AXIS_LE,
        item.refractionAcceptanceSphRe,
        item.refractionAcceptanceSphLe,
        item.refractionAcceptanceCylRe,
        item.refractionAcceptanceCylLe,
        item.refractionAcceptanceAxisRe,
        item.refractionAcceptanceAxisLe,
        item.refractionBCVARe,
        item.refractionBCVALe,
        item.refractionAddSphRe,
        item.refractionAddSphLe,
        item.refractionBCVASphLe,
        item.refractionAddNvaRe,
        item.refractionAddNvaLe,
        item.refractionPapillaryDistSPhRe,
        item.refractionPapillaryDistIPdRe,
        item.refractionPapillaryDistSPhLe,
        item.refractionRemarksRe,
        item.refractionRemarksLe,
        item.refractionLensMaterial,
        item.refractionFrameMaterial,
        item.refractionLensType,
        item.refractionSpecialityLens,
        item.refractionModeOfWear,
        item.refractionLensSurface_Coating,
        item.refractionLensTint,
        item.refractionSpecialInstruction,
        item.refractionRemarks2,
        item.spectaclesPrescribed,
        item.specialInstruction,
        item.mrId
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

export const saveAdvice = async (
  db: SQLiteDatabase,
  item: AdviceVisitModel
) => {
  try {
    const response = db.runSync(
      "INSERT OR REPLACE INTO advice (id,isSpectaclePrescribed,isMedicinePrescribed,isContinueWithSameGlass,isNoTreatmentRequired,isPatientRefer,referredFacilityType,referredFacilityId,referralReason,isSurgeryRequired,surgeryType,otherComments,mrId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
      item.id,
      item.isSpectaclePrescribed,
      item.isMedicinePrescribed,
      item.isContinueWithSameGlass,
      item.isNoTreatmentRequired,
      item.isPatientRefer,
      item.facilityType,
      item.facilityName,
      item.referralReason,
      item.isSurgeryRequired,
      item.surgeryType,
      item.otherComments,
      item.mrId
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const findRefractionByMrId = async (
  db: SQLiteDatabase,
  mrId: string
) => {
  console.log("*********** REFRACTION DATA ************");
  console.log(`MR ID ${mrId}`);
  try {
    const response = await db.getFirstAsync(
      `SELECT * FROM refraction WHERE mrId=${mrId}`
    );
    console.log("Response", response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const findAdviceByMrId = async (db: SQLiteDatabase, mrId: string) => {
  try {
    const response = db.getFirstAsync(
      `SELECT * FROM advice WHERE mrId=${mrId} `
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const saveDiagnosis = async (
  db: SQLiteDatabase,
  item: DiagnosisVisitModel
) => {
  try {
    const response = db.runSync(
      "INSERT OR REPLACE INTO diagnosis(id,diagnosisItems,mrId) VALUES (?,?,?)",
      item.id,
      item.diagnosisItems,
      item.mrId
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const findDiagnosisByMRId = async (db: SQLiteDatabase, mrId: string) => {
  try {
    const response = db.getFirstAsync(
      `SELECT * FROM diagnosis WHERE mrId=${mrId} `
    );
    console.log("RESSSSS***********");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getMRCounts = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(
      `SELECT  COUNT(*) as count FROM mrtags`
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getSchoolByActivityType = async (
  db: SQLiteDatabase,
  activityType: string
) => {
  try {
    const response = await db.getAllAsync(
      `SELECT  *  FROM schools WHERE activityType="${activityType}"`
    );
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            label: item.schoolName,
            value: item.schoolName,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
  }
};

export const getPSStudentsBySchoolId = async (
  db: SQLiteDatabase,
  schoolId: string,
  appliedFilters: FilterModel
) => {
  console.log("************ GETTING STUDENTS ****************");
  console.log("APPLIED", appliedFilters);
  let whereCondition = `students.schoolId="${schoolId}"`;
  if (appliedFilters.classId != "") {
    whereCondition += ` AND students.classId=${appliedFilters.classId}`;
  }
  if (appliedFilters.gender != "") {
    whereCondition += ` AND students.gender="${appliedFilters.gender}" COLLATE NOCASE`;
  }
  if (appliedFilters.section != "") {
    whereCondition += ` AND students.section="${appliedFilters.section}" COLLATE NOCASE`;
  }
  if (appliedFilters.status == "DONE") {
    whereCondition += ` AND screenings.psStatus != ""`;
  }
  if (appliedFilters.status == "NOT DONE") {
    whereCondition += ` AND screenings.psStatus IS NULL`;
  }
  if (appliedFilters.result == "PASS") {
    whereCondition += ` AND screenings.psStatus == "NORMAL`;
  }
  if (appliedFilters.result == "FAIL") {
    whereCondition += ` AND screenings.psStatus == "REFER" OR screenings.psStatus="ADVISE"`;
  }

  console.log("WHERE", whereCondition);
  try {
    const response = await db.getAllAsync(
      `SELECT students.id, students.firstName,students.tempId,students.middleName,students.lastName,students.gender,students.age,students.section,students.classId,students.isMarkedForQC,students.contactNo, screenings.psStatus,classes.title FROM students JOIN classes ON students.classId = classes.id LEFT JOIN  screenings ON students.id = screenings.studentId   WHERE ${whereCondition}`
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getMRTagStudentsBySchoolId = async (
  db: SQLiteDatabase,
  schoolId: string,
  appliedFilters: FilterModel
) => {
  console.log("Apppled Filter", appliedFilters);

  let whereCondition = `s.schoolId="${schoolId}" AND scr.psStatus="REFER"`;

  if (appliedFilters.classId != "") {
    whereCondition += ` AND s.classId=${appliedFilters.classId}`;
  }
  if (appliedFilters.gender != "") {
    whereCondition += ` AND s.gender="${appliedFilters.gender}" COLLATE NOCASE`;
  }
  if (appliedFilters.section != "") {
    whereCondition += ` AND s.section="${appliedFilters.section}" COLLATE NOCASE`;
  }
  if (appliedFilters.status == "DONE") {
    whereCondition += ` AND mt.mrNo != ""`;
  }
  if (appliedFilters.status == "NOT DONE") {
    whereCondition += ` AND mt.mrNo IS NULL`;
  }

  console.log("WHERE", whereCondition);
  // if (appliedFilters.result == "PASS") {
  //   whereCondition += ` AND screenings.psStatus == "NORMAL`;
  // }
  // if (appliedFilters.result == "FAIL") {
  //   whereCondition += ` AND screenings.psStatus == "REFER" OR screenings.psStatus="ADVISE"`;
  // }
  console.log("************ GETTING STUDENTS MR TAGS ****************");
  try {
    const response = await db.getAllAsync(
      `SELECT s.id, s.firstName,s.tempId,s.middleName,s.lastName,s.gender,s.age,s.section,s.classId,scr.studentId,scr.psStatus, mt.mrNo,cl.title FROM students s JOIN classes cl ON s.classId = cl.id  INNER JOIN  screenings scr ON s.id = scr.studentId  LEFT JOIN mrTags mt ON s.id = mt.studentId  WHERE ${whereCondition}`
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Save Classes to DB
export const saveAllClasses = async (
  db: SQLiteDatabase,
  items: ClassModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item) => {
        db.runSync(
          `INSERT OR REPLACE INTO classes (id,title,minAge,maxAge,displayOrder) VALUES (?,?,?,?,?)`,
          item.id,
          item.title,
          item.minAge,
          item.maxAge,
          item.displayOrder
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get All Classes
export const findAllClasses = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM classes`);
    const arr: ClassModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new ClassModel({
            id: item.id,
            title: item.title,
            minAge: item.minAge,
            maxAge: item.maxAge,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
  }
};

// Class Dropdown
export const findAllClassesDropdowns = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM classes`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
  }
};

// Save Vision Centers
export const saveVisionCenters = async (
  db: SQLiteDatabase,
  items: DropdownModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: DropdownModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO visionCenters (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.value,
          item.label,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get All Vision Centers
export const findAllVisionCenters = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM visionCenters`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
  }
};

// Save All Hospitals
export const saveHospitals = async (
  db: SQLiteDatabase,
  items: DropdownModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: DropdownModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO hospitals (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.value,
          item.label,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get All Hospitals
export const findAllHospitals = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM hospitals`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
  }
};

// Save Other Facilities
export const saveOtherFacilities = async (
  db: SQLiteDatabase,
  items: DropdownModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: DropdownModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO otherFacilities (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.value,
          item.label,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get All Other Facilities
export const findAllOtherFacilities = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM otherFacilities`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
  }
};

// Save Ocular Complaints
export const saveOcularComplaints = async (
  db: SQLiteDatabase,
  items: OcularModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: OcularModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO ocularComplaints (id,title,description, displayOrder,isReferCase, isBinacular, ocularType) VALUES (?,?,?,?,?,?,?)`,
          item.id,
          item.ocularName,
          item.ocularName,
          item.displayOrder ?? 0,
          item.isReferCase,
          item.isBinacular,
          item.ocularType
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get All Ocular Complaints
export const findAllOcularComplaints = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM ocularComplaints`);
    const arr: OcularModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new OcularModel({
            id: item.id,
            ocularName: item.title,
            displayOrder: item.displayOrder ?? 0,
            isReferCase: item.isReferCase,
            isBinacular: item.isBinacular,
            ocularType: item.ocularType,
            isActive: "Yes",
            isSelected: false,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
  }
};

//VISUAL ACUITY
// Save Distance DVA
export const saveDvas = async (
  db: SQLiteDatabase,
  items: DistanceDvaModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: DistanceDvaModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO dvas (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get DVAs
export const findAllDvas = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM dvas`);
    const arr: DistanceDvaModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DistanceDvaModel({
            id: item.id,
            title: item.title,
            description: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

//SAve NVA
export const saveNvas = async (db: SQLiteDatabase, items: NvaModel[]) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: NvaModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO nvas (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get NVA
export const findAllNvas = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM nvas`);
    const arr: GridDropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new GridDropdownModel({
            id: item.id,
            title: item.title,
            description: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Save PH
export const savePhs = async (db: SQLiteDatabase, items: PHModel[]) => {
  try {
    console.log("Saving PHS ....");
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: PHModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO phs (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get PH
export const findAllPhs = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM phs`);
    const arr: PHModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new PHModel({
            id: item.id,
            title: item.title,
            description: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

//REFRACTION MASTER

// Save Adds
export const saveAdds = async (db: SQLiteDatabase, items: AddModel[]) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: AddModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO adds (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Adds
export const findAllAdds = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM adds`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Save Axis
export const saveAxis = async (db: SQLiteDatabase, items: AxisModel[]) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: AxisModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO axis (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Axis
export const findAllAxis = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM axis`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Save SPHS
export const saveSphs = async (db: SQLiteDatabase, items: SPHModel[]) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: SPHModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO sphs (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get SPHs
export const findAllSphs = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM sphs`);
    const arr: GridDropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new GridDropdownModel({
            id: item.id,
            title: item.title,
            description: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Save Cyls
export const saveCyls = async (db: SQLiteDatabase, items: CYLModel[]) => {
  try {
    console.log("IESSSSSS", items);
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: CYLModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO cyls (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Adds
export const findAllCyls = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM cyls`);
    const arr: GridDropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new GridDropdownModel({
            id: item.id,
            title: item.title,
            description: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Save Cyls
export const saveReachConfigs = async (
  db: SQLiteDatabase,
  item: ReachConfigurationModel
) => {
  try {
    const response = db.runSync(
      `INSERT OR REPLACE INTO reachConfigs (id,isNpcTest,isCoverTest,isPlus2DTest) VALUES (?,?,?,?)`,
      1,
      item.isNpcTest,
      item.isCoverTest,
      item.isPlus2DTest
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Reach Configs
export const findReachConfigs = async (db: SQLiteDatabase) => {
  try {
    const response: any = await db.getFirstSync(
      `SELECT * FROM reachConfigs WHERE id=1`
    );
    console.log("Response *************************************", response);
    if (response) {
      return new ReachConfigurationModel({
        id: 1,
        partnerName: "",
        partnerId: "",
        isNpcTest: response.isNpcTest == 1 ? true : false,
        isCoverTest: response.isCoverTest == 1 ? true : false,
        isPlus2DTest: response.isPlus2DTest == 1 ? true : false,
        isActive: "",
      });
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Save Frame Materials
export const saveFrameMaterials = async (
  db: SQLiteDatabase,
  items: FrameMaterialModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: FrameMaterialModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO frameMaterials (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Frame Materials
export const findAllFrameMaterials = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM frameMaterials`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Save Frame Materials
export const saveLensMaterials = async (
  db: SQLiteDatabase,
  items: LensMaterialModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: LensMaterialModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO lensMaterials (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Frame Materials
export const findAllLensMaterials = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM lensMaterials`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Save Frame Materials
export const saveDiagnosisMaster = async (
  db: SQLiteDatabase,
  items: DiagnosisModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: DiagnosisModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO diagnosisMaster (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.category,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Frame Materials
export const findAllDiagnosisMaster = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM diagnosisMaster`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Save Frame Materials
export const saveLensSurfaceCoatings = async (
  db: SQLiteDatabase,
  items: LensSurfaceCoatingModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: LensSurfaceCoatingModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO lensSurfaceCoatings (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Frame Materials
export const findAllLensSurfaceCoatings = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM lensSurfaceCoatings`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Save Frame Materials
export const saveLensTints = async (
  db: SQLiteDatabase,
  items: LensTintModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: LensTintModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO lensTints (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Frame Materials
export const findAllLensTints = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM lensTints`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Save Frame Materials
export const saveLensTypes = async (
  db: SQLiteDatabase,
  items: LensTypeModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: LensTypeModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO lensTypes (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Frame Materials
export const findAllLensTypes = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM lensTypes`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const saveModesOfWear = async (
  db: SQLiteDatabase,
  items: ModeOfWearModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: ModeOfWearModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO modeOfWears (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Frame Materials
export const findAllModeOfWears = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM modeOfWears`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const saveSpecialInstructions = async (
  db: SQLiteDatabase,
  items: SpecialInstructionModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: SpecialInstructionModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO specialInstructions (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Frame Materials
export const findAllSpecialInstructions = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM specialInstructions`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const saveSpecialityLens = async (
  db: SQLiteDatabase,
  items: SpecialityLensModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: SpecialityLensModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO specialityLens (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.title,
          item.description,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Frame Materials
export const findAllSpecialityLens = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM specialityLens`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const saveReasonForReferrals = async (
  db: SQLiteDatabase,
  items: ReasonForReferralModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: ReasonForReferralModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO reasonForRefferals (id,title,description,displayOrder) VALUES (?,?,?,?)`,
          item.id,
          item.reasonName,
          item.reasonDescription,
          item.displayOrder ?? 0
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Frame Materials
export const findAllReasonForReferrals = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM reasonForRefferals`);
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.id,
            value: item.title,
            label: item.title,
            displayOrder: item.displayOrder,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const saveTorchligtFindings = async (
  db: SQLiteDatabase,
  items: TorchLightModel[]
) => {
  try {
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: TorchLightModel) => {
        db.runSync(
          `INSERT OR REPLACE INTO torchlightFindings(id,title,description,displayOrder,action) VALUES (?,?,?,?,?)`,
          item.id,
          item.finding,
          item.finding,
          item.displayOrder ?? 0,
          item.action
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Get Torchlight Findings
export const findAllTorchlightFindings = async (db: SQLiteDatabase) => {
  try {
    const response = await db.getAllAsync(`SELECT * FROM torchlightFindings`);
    const arr: TorchLightModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new TorchLightModel({
            id: item.id,
            finding: item.title,
            displayOrder: item.displayOrder,
            action: item.action,
            isSelected: false,
            isActive: "Yes",
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const findUniqueClasses = async (
  db: SQLiteDatabase,
  schoolId: string
) => {
  console.log("classId Id", schoolId);
  try {
    const response = await db.getAllAsync(
      `SELECT DISTINCT s.classId,cl.title FROM students s JOIN classes cl ON s.classId = cl.id WHERE s.schoolId="${schoolId}"`
    );

    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any) => {
        arr.push(
          new DropdownModel({
            id: item.classId,
            value: item.title,
            label: item.title,
          })
        );
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Get Sections
export const findUniqueSections = async (
  db: SQLiteDatabase,
  schoolId: string,
  classId: string
) => {
  console.log("classId Id", schoolId);
  try {
    const response = await db.getAllAsync(
      `SELECT DISTINCT section FROM students WHERE schoolId="${schoolId}" AND classId="${classId}"`
    );
    const arr: DropdownModel[] = [];
    if (response) {
      response.map((item: any, index: number) => {
        if (item.section != "") {
          arr.push(
            new DropdownModel({
              id: (index + 1)?.toString(),
              value: item.section,
              label: item.section,
            })
          );
        }
      });
    }
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const saveUsers = async (db: SQLiteDatabase, items: UserModel[]) => {
  try {
    console.log("ITEMS***************", items);
    const response = await db.withTransactionAsync(async () => {
      items.forEach((item: UserModel) => {
        console.log("ITEMS USR *************************", item);
        db.runSync(
          `INSERT OR REPLACE INTO users(id,userName,password,firstName,middleName,lastName,designation,isPartnerAgreement,isUserAgreement,isPIIAgreement,isDevicePreparation,isDataSync,isQualityCheck) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          item.id,
          item.userName,
          item.password,
          item.firstName,
          item.middleName,
          item.lastName,
          item.designation,
          item.isPartnerAgreement,
          item.isUserAgreement,
          item.isPIIAgreement,
          item.isDevicePreparation,
          item.isDataSync,
          item.isQualityCheck
        );
      });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const findUsers = async (db: SQLiteDatabase) => {
  try {
    const response: any = await db.getAllAsync(`SELECT * FROM users`);
    console.log("RESSSSS", response);
  } catch (err) {
    console.log(err);
    return BLANK_USER_MODEL;
  }
};

// Get Torchlight Findings
export const findUserById = async (db: SQLiteDatabase, id: string) => {
  try {
    const response: any = await db.getFirstAsync(
      `SELECT * FROM users WHERE id=${id}`
    );
    console.log("RESSSSS", response);
    if (response) {
      return new UserModel({
        id: response.id,
        userName: response.userName,
        password: response.password,
        firstName: response.firstName,
        middleName: response.middleName,
        lastName: response.lastName,
        designation: response.designation,
        isPartnerAgreement: response.isPartnerAgreement,
        isUserAgreement: response.isUserAgreement,
        isPIIAgreement: response.isPIIAgreement,
        isDevicePreparation: response.isDevicePreparation,
        isDataSync: response.isDataSync,
        isQualityCheck: response.isQualityCheck,
      });
    } else {
      return BLANK_USER_MODEL;
    }
  } catch (err) {
    console.log(err);
    return BLANK_USER_MODEL;
  }
};

// Save Spec Booking
export const saveSpecBooking = async (
  db: SQLiteDatabase,
  studentId: string,
  frameName: string
) => {
  try {
    const response = db.runSync(
      "INSERT OR REPLACE INTO spectacleBooking (id,frameName,bookingDate,studentId) VALUES (?,?,?,?)",
      studentId,
      frameName,
      new Date().toISOString(),
      studentId
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

//Find Spec Booking Students
export const getSpecStudentsBySchoolId = async (
  db: SQLiteDatabase,
  schoolId: string,
  appliedFilters: FilterModel
) => {
  console.log("APPLIED", appliedFilters);
  let whereCondition = `s.schoolId="${schoolId}" AND rf.spectaclesPrescribed=true`;

  if (appliedFilters.classId != "") {
    whereCondition += ` AND students.classId=${appliedFilters.classId}`;
  }
  if (appliedFilters.section != "") {
    whereCondition += ` AND students.section="${appliedFilters.section}" COLLATE NOCASE`;
  }

  console.log("WHERE", whereCondition);
  console.log(
    "************ GETTING STUDENTS SPECTACLE BOOKING ****************"
  );
  try {
    const response = await db.getAllAsync(
      `SELECT s.id, s.firstName,s.gender,s.age,s.classId,s.section,s.studentId,sb.bookingDate,cl.title FROM students s JOIN classes cl ON s.classId = cl.id  INNER JOIN  refraction rf ON s.id = rf.mrId  LEFT JOIN spectacleBooking sb ON s.id = sb.studentId  WHERE ${whereCondition}`
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const removeSchool = async (db: SQLiteDatabase, schoolId: string) => {
  console.log("SchoolId", schoolId);
  try {
    const response = await db.withTransactionAsync(async () => {
      db.runSync(
        `DELETE FROM diagnosis WHERE mrId IN (
          SELECT mt.id FROM mrTags mt JOIN students s ON mt.studentId = s.id WHERE s.schoolId="${schoolId}"
        )`
      );
      db.runSync(
        `DELETE FROM advice WHERE mrId IN (
          SELECT mt.id FROM mrTags mt JOIN students s ON mt.studentId = s.id WHERE s.schoolId="${schoolId}"
        )`
      );
      db.runSync(
        `DELETE FROM refraction WHERE mrId IN (
          SELECT mt.id FROM mrTags mt JOIN students s ON mt.studentId = s.id WHERE s.schoolId="${schoolId}"
        )`
      );
      db.runSync(
        `DELETE FROM visualAcuity WHERE mrId IN (
          SELECT mt.id FROM mrTags mt JOIN students s ON mt.studentId = s.id WHERE s.schoolId="${schoolId}"
        )`
      );
      db.runSync(
        `DELETE FROM mrTags WHERE studentId IN (
          SELECT id FROM students WHERE students.schoolId="${schoolId}"
        )`
      );
      db.runSync(`DELETE FROM students WHERE schoolId="${schoolId}"`);
      db.runSync(`DELETE FROM schools WHERE id="${schoolId}"`);
    });
    console.log("Response", response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const TABLES = {
  DISTANCE_DVA_TABLE: "dvas",
  PH_TABLE: "phs",
  NVA_TABLE: "nvas",
  HOSPITAL_TABLE: "hospitals",
  VISION_CENTER_TABLE: "visionCenters",
  OTHER_FACILITY_TABLLE: "otherFacilities",
};
