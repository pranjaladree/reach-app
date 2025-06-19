export class DiagnosisVisitModel {
  id: string;
  diagnosisType: string;
  diagnosis_RE_LE: string;
  mrId: string;

  constructor({
    id,
    diagnosisType,
    diagnosis_RE_LE,
    mrId,
  }: {
    id: string;
    diagnosisType: string;
    diagnosis_RE_LE: string;
    mrId: string;
  }) {
    this.id = id;
    this.diagnosisType = diagnosisType;
    this.diagnosis_RE_LE = diagnosis_RE_LE;
    this.mrId = mrId;
  }
}
