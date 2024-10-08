import { HttpStatus } from '@nestjs/common';

export class ResponseMapper<T> {
  public StatusCode: HttpStatus;
  public IsSuccess: boolean;
  public MessageToShow: string;
  public Data: T;
}
