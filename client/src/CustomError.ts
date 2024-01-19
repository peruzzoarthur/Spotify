interface ICustomError {
  message: string | undefined;
  status: number | undefined;
}
export class CustomError implements ICustomError {
  message: string | undefined;
  status: number | undefined;

  constructor(message: string | undefined, status: number | undefined) {
    this.message = message;
    this.status = status;
  }
}

export type SpotifyError = {
  status: number;
  message: string;
};
