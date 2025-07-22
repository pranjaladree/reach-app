export class ColorConfigModel {
  id: number;
  classId: number;
  gender: string;
  isRequired: number;

  constructor({
    id,
    classId,
    gender,
    isRequired,
  }: {
    id: number;
    classId: number;
    gender: string;
    isRequired: number;
  }) {
    this.id = id;
    this.classId = classId;
    this.gender = gender;
    this.isRequired = isRequired;
  }
}
