import { PSStudentModel } from "@/models/other-masters/PSStudentModel";
import { SQLiteDatabase } from "expo-sqlite";

export const preparePSDataSync = async (
  db: SQLiteDatabase,
  schoolId: string
) => {
  try {
    let latitude = "";
    let longitude = "";
    const schoolResponse: any = await db.getFirstAsync(
      `SELECT * FROM schools WHERE id="${schoolId}"`
    );
    console.log("SCHOOL *******************", schoolResponse);
    if (schoolResponse) {
      if (schoolResponse.latitude) {
        latitude = schoolResponse.latititude;
      }
      if (schoolResponse.longitude) {
        longitude = schoolResponse.longitude;
      }
    }

    const response = await db.getAllAsync(
      `SELECT * FROM screenings JOIN students ON screenings.studentId == students.id  WHERE students.schoolId="${schoolId}"`
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
      latitude: latitude,
      longitude: longitude,
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
    const studentList: any[] = [];
    if (response) {
      response.map((item: any) => {
        let diagnosisList;
        if (item.diagnosisItems) {
          const output = item.diagnosisItems.split("##").map((item2: any) => {
            const obj: any = {};
            item2.split("@@").forEach((pair: any) => {
              const [key, value] = pair.split(":");
              obj[key] = value;
            });
            return obj;
          });

          console.log(output);

          diagnosisList = output.map((item3: any) => {
            return {
              diagnosisType: item3.id,
              selectedEye: item3.selectedEye,
            };
          });
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
          diagnosis: diagnosisList ? diagnosisList : null,
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
