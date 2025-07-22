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

  CREATE TABLE IF NOT EXISTS colorVisionConfigs (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  classId INTEGER, 
  gender TEXT,
  required BOOLEAN,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')),
  FOREIGN KEY (classId) REFERENCES classes(id));

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
  classId TEXT,
  section TEXT,
  rollNo TEXT,
  age TEXT, 
  gender TEXT,
  specialNeed TEXT,
  relation TEXT,
  nextOfKin TEXT,
  contactNo TEXT,
  relationshipWithStudent TEXT,
  schoolId TEXT,
  targetGroup TEXT,
  isUpdated BOOLEAN,
  isMarkedForQc BOOLEAN,
  previousPSStatus TEXT,
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
  id TEXT PRIMARY KEY NOT NULL,
  usingSpectacle TEXT DEFAULT "",
  haveSpecNow TEXT DEFAULT "", 
  specCondition TEXT DEFAULT "",
  unableToPerformVisionTest TEXT DEFAULT "",
  canReadLogmarLE TEXT DEFAULT "",
  canReadLogmarRE TEXT DEFAULT "",
  visionAutoRefLE TEXT DEFAULT "",
  visionAutoRefRE TEXT DEFAULT "",
  acceptanceSPHLE TEXT DEFAULT "",
  acceptanceSPHRE TEXT DEFAULT "",
  acceptanceCYLLE TEXT DEFAULT "",
  acceptanceCYLRE TEXT DEFAULT "",
  acceptanceAXISLE TEXT DEFAULT "",
  acceptanceAXISRE TEXT DEFAULT "",
  IPDBoth TEXT DEFAULT "",
  torchlightCheckLE TEXT DEFAULT "",
  torchlightCheckRE TEXT DEFAULT "",
  torchlightFindings TEXT DEFAULT "",
  ocularComplaint TEXT DEFAULT "",
  ocularList TEXT DEFAULT "",
  npcTest TEXT DEFAULT "",
  coverTest TEXT DEFAULT "",
  plus2DTestLE TEXT DEFAULT "",
  plus2DTestRE TEXT DEFAULT "",
  colorVisionLE TEXT DEFAULT "",
  colorVisionRE TEXT DEFAULT "",
  psStatus TEXT,referralReason TEXT DEFAULT "",
  appointmentDate TEXT DEFAULT "",
  mobileNo TEXT DEFAULT "",
  facilityType TEXT DEFAULT "",
  facilityId INTEGER DEFAULT 0,
  otherReason TEXT DEFAULT "",
  instructionForReferralCenter TEXT DEFAULT "",
  psUpdatedAt TEXT DEFAULT "",
  screeningDoneBy TEXT DEFAULT "",
  screenerType TEXT DEFAULT "PS",
  isNonEditable BOOLEAN DEFAULT false,
  isQcDone BOOLEAN DEFAULT false,
  studentId TEXT,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')),
  FOREIGN KEY (studentId) REFERENCES students(id));

  CREATE TABLE IF NOT EXISTS mrTags (
  id TEXT PRIMARY KEY NOT NULL, 
  mrNo TEXT, 
  visitDate TEXT,
  facilityType TEXT,
  facilityId TEXT,
  studentId TEXT,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')),
  FOREIGN KEY (studentId) REFERENCES students(id));

  CREATE TABLE IF NOT EXISTS visualAcuity (
  id TEXT PRIMARY KEY NOT NULL, 
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
  mrId TEXT,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')),
  FOREIGN KEY (mrId) REFERENCES mrTags(id));

  CREATE TABLE IF NOT EXISTS refraction (
  id TEXT PRIMARY KEY NOT NULL, 
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
  mrId TEXT,
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
  mrId TEXT,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')),
  FOREIGN KEY (mrId) REFERENCES mrTags(id));

  CREATE TABLE IF NOT EXISTS diagnosis (
  id TEXT PRIMARY KEY NOT NULL,
  diagnosisItems TEXT,
  mrId TEXT,
  createdAt DATETIME DEFAULT (datetime('now')),
  updatedAt DATETIME DEFAULT (datetime('now')),
  FOREIGN KEY (mrId) REFERENCES mrTags(id));

  CREATE TABLE IF NOT EXISTS spectacleBooking (
  id TEXT PRIMARY KEY NOT NULL,
  frameName TEXT,   
  bookingDate TEXT,
  mrId TEXT,
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
