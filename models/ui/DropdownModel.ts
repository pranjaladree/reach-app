export class DropdownModel {
  id: string;
  value: string;
  label: string;
  displayOrder?: number;

  constructor({
    id,
    value,
    label,
    displayOrder,
  }: {
    id: string;
    value: string;
    label: string;
    displayOrder?: number;
  }) {
    this.id = id;
    this.value = value;
    this.label = label;
    this.displayOrder = displayOrder;
  }
}
