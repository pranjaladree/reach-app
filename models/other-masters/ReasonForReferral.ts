export class ReasonForReferralModel {
  id: string;
  reasonName: string;
  reasonDescription: string;
  displayOrder: number;
  isActive: string;

  constructor({
    id,
    reasonName,
    reasonDescription,
    displayOrder,
    isActive,
  }: {
    id: string;
    reasonName: string;
    reasonDescription: string;
    displayOrder: number;
    isActive: string;
  }) {
    this.id = id;
    this.reasonName = reasonName;
    this.reasonDescription = reasonDescription;
    this.displayOrder = displayOrder;
    this.isActive = isActive;
  }
}
