export class DiagnosisVisitModel {
  id: string;
  diagnosisItems: string;
  mrId: string;

  constructor({
    id,
    diagnosisItems,
    mrId,
  }: {
    id: string;
    diagnosisItems: string;
    mrId: string;
  }) {
    this.id = id;
    this.diagnosisItems = diagnosisItems;
    this.mrId = mrId;
  }
}
