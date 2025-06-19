export class TorchLightModel {
  id: string;
  finding: string;
  displayOrder: number;
  action: string;
  isSelected: boolean;
  isActive: string;

  constructor({
    id,
    finding,
    displayOrder,
    action,
    isSelected,
    isActive,
  }: {
    id: string;
    finding: string;
    displayOrder: number;
    action: string;
    isSelected: boolean;
    isActive: string;
  }) {
    this.id = id;
    this.finding = finding;
    this.displayOrder = displayOrder;
    this.action = action;
    this.isSelected = isSelected;
    this.isActive = isActive;
  }
}
