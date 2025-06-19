export class GridDropdownModel {
  id: string;
  title: string;
  description: string;
  displayOrder: number;

  constructor({
    id,
    title,
    description,
    displayOrder,
  }: {
    id: string;
    title: string;
    description: string;
    displayOrder: number;
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.displayOrder = displayOrder;
  }
}
