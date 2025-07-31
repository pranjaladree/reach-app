import { SchoolModel } from "@/models/school/SchoolModel";
import { StudentModel } from "@/models/school/StudentModel";
import { DropdownModel } from "@/models/ui/DropdownModel";
import { SQLiteDatabase } from "expo-sqlite";

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

export const findSchools = async (db: SQLiteDatabase) => {
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

export const findSchoolDropdowns = async (db: SQLiteDatabase) => {
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

export const saveBulkStudents = async (
  db: SQLiteDatabase,
  studentItems: StudentModel[]
) => {
  console.log("Saving Student Data ...");
  try {
    const response = await db.withTransactionAsync(async () => {
      studentItems.forEach((item) => {
        console.log("STUDENT %%%%%%%%%%%%%%", item);
        db.runSync(
          `INSERT OR REPLACE INTO students (id,studentId,tempId,firstName,middleName,lastName,classId,section,rollNo,age,gender,specialNeed,relation,nextOfKin,contactNo,relationshipWithStudent,schoolId,isUpdated,isMarkedForQc,targetGroup,lastPSStatus,lastReasonForReferral,lastReportDate,lastSpectacleStatus,lastAnySurgeryDone) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
          item.isMarkForQC,
          item.targetGroup,
          item.lastPSStatus,
          item.lastReasonForReferral,
          item.lastReportDate,
          item.lastSpectacleStatus,
          item.lastSpectacleStatus
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
  console.log("IDDD&&&&&&&&&&&&&&&&&&&&&&&&", id);
  try {
    console.log("GET STUDENTS ...");
    const response = await db.getFirstAsync(
      `SELECT  students.*,classes.title as classTitle FROM students JOIN classes ON students.classId = classes.id WHERE students.id="${id}"`
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

export const removeSchool = async (db: SQLiteDatabase, schoolId: string) => {
  console.log("SchoolId", schoolId);
  try {
    const response: any = await db.withTransactionAsync(async () => {
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
      db.runSync(
        `DELETE FROM screenings WHERE studentId IN (
            SELECT id FROM students WHERE students.schoolId="${schoolId}"
          )`
      );
      db.runSync(`DELETE FROM students WHERE schoolId="${schoolId}"`);
      db.runSync(`DELETE FROM schools WHERE id="${schoolId}"`);
    });
    console.log("Response", response);
    return "Done";
  } catch (err) {
    console.log(err);
  }
};
