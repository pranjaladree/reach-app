export class FilterModel {
  classId: string;
  section: string;
  gender: string;
  status: string;
  result: string;
  targetGroup: string;

  constructor({
    classId,
    section,
    gender,
    status,
    result,
    targetGroup,
  }: {
    classId: string;
    section: string;
    gender: string;
    status: string;
    result: string;
    targetGroup: string;
  }) {
    this.classId = classId;
    this.section = section;
    this.gender = gender;
    this.status = status;
    this.result = result;
    this.targetGroup = targetGroup;
  }
}
