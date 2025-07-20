import { AdviceVisitModel } from "@/models/patient-at-fixed-facilty/AdviceVisitModel";
import { DiagnosisVisitModel } from "@/models/patient-at-fixed-facilty/DiagnosisVisitModel";
import { MRTagModel } from "@/models/patient-at-fixed-facilty/MRTagModel";
import { RefractionModel } from "@/models/patient-at-fixed-facilty/RefractionModel";
import { VisualAcuityModel } from "@/models/patient-at-fixed-facilty/VisualAcuityModel";
import { FilterModel } from "@/models/ui/FilterModel";
import { ResponseModel } from "@/models/utils/ResponseModel";
import { SQLiteDatabase } from "expo-sqlite";

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
      `SELECT * FROM mrTags WHERE studentId="${studentId}"`
    );
    console.log("RESpons **** NMSKKKKK", response);
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
