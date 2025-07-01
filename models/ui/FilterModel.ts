export class FilterModel {
  classId: string;
  section: string;
  gender: string;
  status: string;
  result: string;

  constructor({
    classId,
    section,
    gender,
    status,
    result,
  }: {
    classId: string;
    section: string;
    gender: string;
    status: string;
    result: string;
  }) {
    this.classId = classId;
    this.section = section;
    this.gender = gender;
    this.status = status;
    this.result = result;
  }
}
