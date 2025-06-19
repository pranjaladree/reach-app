export class DiagnosticVisitModel {
  id: string;
  diagnosticType: string;
  diagnostic_RE_LE: string;
  packageAmount: string;
  procedureAmount: string;
  diagnosticPaymentType: string;
  procedureSponsor: string;

  constructor({
    id,
    diagnosticType,
    diagnostic_RE_LE,
    packageAmount,
    procedureAmount,
    diagnosticPaymentType,
    procedureSponsor,
  }: {
    id: string;
    diagnosticType: string;
    diagnostic_RE_LE: string;
    packageAmount: string;
    procedureAmount: string;
    diagnosticPaymentType: string;
    procedureSponsor: string;
  }) {
    this.id = id;
    this.diagnosticType = diagnosticType;
    this.diagnostic_RE_LE = diagnostic_RE_LE;
    this.packageAmount = packageAmount;
    this.procedureAmount = procedureAmount;
    this.diagnosticPaymentType = diagnosticPaymentType;
    this.procedureSponsor = procedureSponsor;
  }
}
