export class PatientVisitModel {
  id: string;
  mrId: number;
  mrNo: string;
  facilityType: string;
  facilityId: string;
  visitDate: string;

  constructor({
    id,
    mrId,
    mrNo,
    facilityType,
    facilityId,
    visitDate,
  }: {
    id: string;
    mrId: number;
    mrNo: string;
    facilityType: string;
    facilityId: string;
    visitDate: string;
  }) {
    this.id = id;
    this.mrId = mrId;
    this.mrNo = mrNo;
    this.facilityType = facilityType;
    this.facilityId = facilityId;
    this.visitDate = visitDate;
  }
}
