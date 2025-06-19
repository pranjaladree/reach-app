export class RadioItemModel {
  id: number;
  value: string;
  label: string;

  constructor({
    id,
    value,
    label,
  }: {
    id: number;
    value: string;
    label: string;
  }) {
    this.id = id;
    this.value = value;
    this.label = label;
  }
}
