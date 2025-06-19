export class OcularModel {
  id: string;
  ocularName: string;
  displayOrder: number;
  ocularType: string;
  isReferCase: boolean;
  isBinacular: boolean;
  isSelected: boolean;
  isActive: string;

  constructor({
    id,
    ocularName,
    displayOrder,
    ocularType,
    isReferCase,
    isSelected,
    isBinacular,
    isActive,
  }: {
    id: string;
    ocularName: string;
    displayOrder: number;
    ocularType: string;
    isReferCase: boolean;
    isSelected: boolean;
    isBinacular: boolean;
    isActive: string;
  }) {
    this.id = id;
    this.ocularName = ocularName;
    this.displayOrder = displayOrder;
    this.isReferCase = isReferCase;
    this.ocularType = ocularType;
    this.isSelected = isSelected;
    this.isBinacular = isBinacular;
    this.isActive = isActive;
  }
}
