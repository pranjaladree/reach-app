import { baseUrl } from "@/constants/Urls";
import { SchoolModel } from "@/models/school/SchoolModel";

export const getSchoolActivities = async (
  token: string,
  date: string,
  activityType: string
) => {
  console.log("Token", token);
  console.log("Date", date);
  console.log("Activity Type", activityType);
  try {
    const res = await fetch(
      `${baseUrl}/api/v2/service-delivery-scheduler/school/date/${date}/type/${activityType}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    console.log(res);
    const resData = await res.json();
    let arr: SchoolModel[] = [];
    resData.forEach((item: any) => {
      arr.push(
        new SchoolModel({
          id: item.schoolId,
          schoolId: item.schoolId,
          schoolName: item.schoolName,
          classFromId: item.classFromId,
          classUptoId: item.classUptoId,
          latitude: item.longitude,
          longitude: item.latitude,
          visionCenterId: item.visionCenterId,
          projectId: item.projectId,
          isAutorefAvailable: item.isAutorefAvailable,
          activityType: item.activityType,
          isFollowupSchool: item.isFollowupSchool,
        })
      );
    });
    return arr;
  } catch (err) {
    console.log(err);
    return [];
  }
};
