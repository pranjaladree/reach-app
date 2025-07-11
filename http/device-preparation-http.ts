import { baseUrl } from "@/constants/Urls";
import { SchoolModel } from "@/models/school/SchoolModel";
import { StudentModel } from "@/models/school/StudentModel";
import { ResponseModel } from "@/models/utils/ResponseModel";

export const getStudentBySchoolId = async (token: string, schoolId: string) => {
  console.log("Token", token);
  console.log("SchoolId", schoolId);
  const res = await fetch(
    `${baseUrl}/api/v2/prepare_device/school/${schoolId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  const resData = await res.json();
  console.log("Response ******************", resData);
  let arr: StudentModel[] = [];
  resData.devicePreparationStudentList.forEach((item: any) => {
    arr.push(
      new StudentModel({
        id: item.studentSessionId,
        studentId: item.studentId,
        tempId: item.studentId,
        firstName: item.firstName,
        middleName: item.middleName,
        lastName: item.lastName,
        classId: item.classId,
        classTitle: "",
        section: item.section,
        rollNo: item.rollNo,
        gender: item.gender,
        age: "",
        dob: "",
        relation: "",
        nextOfKin: "",
        specialNeed: "",
        session: "",
        contactPersonName: "",
        contactPersonMobileNo: "",
        relationshipWithStudent: "",
        schoolId: resData.schId,
        schoolName: "",
        isActive: "",
        psStatus: "",
        isMarkForQC: item.markForQc,
        mrNo: "",
        facilityType: "",
        facilityName: "",
        isUpdated: false,
        targetGroup: "",
        lastPSStatus: "",
        lastReasonForReferral: "",
        lastReportDate: "",
        lastSpectacleStatus: "",
        lastAnySurgeryDone: "",
      })
    );
  });
  return {
    school: new SchoolModel({
      id: resData.schId,
      schoolId: resData.schId,
      schoolName: resData.schoolName,
      classFromId: resData.classFromId,
      classUptoId: resData.classUptoId,
      latitude: 0,
      longitude: 0,
      visionCenterId: resData.vcId,
      projectId: "",
      isAutorefAvailable: false,
      activityType: resData.activityType,
      isFollowupSchool: false,
    }),
    students: arr,
  };
};

export const incrementDeviceCount = async (token: string, schoolId: string) => {
  try {
    const res = await fetch(
      `${baseUrl}/api/v2/prepare_device/school/${schoolId}`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    if (res.status == 200) {
      return new ResponseModel({
        data: "Device Count Updated",
      });
    }
  } catch (err) {
    return new ResponseModel({
      isError: true,
      data: err,
    });
  }
};
