import { HttpStatus } from '@nestjs/common';
import { ResponseMapper } from '../models/ResponseMapper.Model';

export function ResponseSuccess(Data: any) {
  var response = new ResponseMapper();
  {
    response.StatusCode = HttpStatus.OK;
    response.IsSuccess = true;
    response.Data = Data;
  }
  return response;
}
export function ResponseError(Message: string) {
  var response = new ResponseMapper();
  {
    response.StatusCode = HttpStatus.EXPECTATION_FAILED;
    response.IsSuccess = false;
    response.MessageToShow = Message;
  }
  return response;
}

   export function ResponseMap(_data:any) {
    let Table1_keys: string[] = Object.keys(_data);
    var JsonBody={};
    Table1_keys.forEach((x) => {
      // try{
        if (x != 'Table') JsonBody[x] = _data[x];
      // }catch{}
      
    });
    return JsonBody;
  }
  

 