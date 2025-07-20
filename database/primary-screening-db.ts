import { ScreeningModel } from "@/models/primary-screening/ScreeningModel";
import { FilterModel } from "@/models/ui/FilterModel";
import { SQLiteDatabase } from "expo-sqlite";

export const savePrimaryScreening = async (
  db: SQLiteDatabase,
  sceeningItem: ScreeningModel
) => {
  console.log("screening Item", sceeningItem);
  try {
    const response = db.runSync(
      "INSERT OR REPLACE INTO screenings (id,usingSpectacle,haveSpecNow,specCondition,unableToPerformVisionTest,canReadLogmarLE,canReadLogmarRE,visionAutoRefLE,visionAutoRefRE,acceptanceSPHLE,acceptanceSPHRE,acceptanceCYLLE,acceptanceCYLRE,acceptanceAXISLE,acceptanceAXISRE,IPDBoth,torchlightCheckLE,torchlightCheckRE,torchlightFindings,ocularComplaint,ocularList,npcTest,coverTest,plus2DTestLE,plus2DTestRE,colorVisionLE,colorVisionRE,psStatus,referralReason,appointmentDate,mobileNo,facilityType,facilityId,otherReason,instructionForReferralCenter,studentId,psUpdatedAt,screeningDoneBy,screenerType,isQCDone,isNonEditable) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
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
      sceeningItem.isNonEditable
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
  if (appliedFilters.targetGroup != "") {
    whereCondition += ` AND students.targetGroup == "${appliedFilters.targetGroup}" COLLATE NOCASE`;
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
