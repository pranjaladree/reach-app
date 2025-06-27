export class DiagnosisModel {
  id: number;
  title: string;
  category: string;
  displayOrder: number;
  isActive: string;

  constructor({
    id,
    title,
    category,
    displayOrder,
    isActive,
  }: {
    id: number;
    title: string;
    category: string;
    displayOrder: number;
    isActive: string;
  }) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.displayOrder = displayOrder;
    this.isActive = isActive;
  }
}
