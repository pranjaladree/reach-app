export class ClassModel {
  id: string;
  title: string;
  minAge: number;
  maxAge: number;
  displayOrder: number;

  constructor({
    id,
    title,
    minAge,
    maxAge,
    displayOrder,
  }: {
    id: string;
    title: string;
    minAge: number;
    maxAge: number;
    displayOrder: number;
  }) {
    this.id = id;
    this.title = title;
    this.minAge = minAge;
    this.maxAge = maxAge;
    this.displayOrder = displayOrder;
  }
}
