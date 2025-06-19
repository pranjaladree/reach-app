export class SessionModel {
  id: number;
  title: string;

  constructor({ id, title }: { id: number; title: string }) {
    this.id = id;
    this.title = title;
  }
}
