export class ResponseModel {
  data: any;
  isError?: boolean;

  constructor({ data, isError }: { data: any; isError?: boolean }) {
    this.data = data;
    this.isError = isError;
  }
}
