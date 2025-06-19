export class SchoolModel {
  id: number;
  schoolId: string;
  schoolName: string;
  classFromId: string;
  classUptoId: string;
  latitude: number;
  longitude: number;
  visionCenterId: string;
  projectId: string;
  isAutorefAvailable: boolean;
  activityType: string;
  isFollowupSchool: boolean;

  constructor({
    id,
    schoolId,
    schoolName,
    classFromId,
    classUptoId,
    latitude,
    longitude,
    visionCenterId,
    projectId,
    isAutorefAvailable,
    activityType,
    isFollowupSchool,
  }: {
    id: number;
    schoolId: string;
    schoolName: string;
    classFromId: string;
    classUptoId: string;
    latitude: number;
    longitude: number;
    visionCenterId: string;
    projectId: string;
    isAutorefAvailable: boolean;
    activityType: string;
    isFollowupSchool: boolean;
  }) {
    this.id = id;
    this.schoolId = schoolId;
    this.schoolName = schoolName;
    this.classFromId = classFromId;
    this.classUptoId = classUptoId;
    this.latitude = latitude;
    this.longitude = longitude;
    this.visionCenterId = visionCenterId;
    this.projectId = projectId;
    this.isAutorefAvailable = isAutorefAvailable;
    this.activityType = activityType;
    this.isFollowupSchool = isFollowupSchool;
  }
}
