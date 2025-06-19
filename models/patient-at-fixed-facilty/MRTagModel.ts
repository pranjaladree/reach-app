export class MRTagModel {
  id: string;
  mrNo: string;
  visitDate: string;
  facilityType: string;
  facilityId: string;
  studentId: string;

  constructor({
    id,
    mrNo,
    visitDate,
    facilityType,
    facilityId,
    studentId,
  }: {
    id: string;
    mrNo: string;
    visitDate: string;
    facilityType: string;
    facilityId: string;
    studentId: string;
  }) {
    this.id = id;
    this.mrNo = mrNo;
    this.visitDate = visitDate;
    this.facilityType = facilityType;
    this.facilityId = facilityId;
    this.studentId = studentId;
  }
}
