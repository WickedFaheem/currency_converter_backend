import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResponseError, ResponseSuccess } from 'src/common/provider/ResponseMapper';
import { ConverionPayload } from './dto/conversion.dto';
@ApiTags('Currency')
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('logs')
  async getLogs() {
    var response;
    try {
      var data = await this.currencyService.currencyLogs(); 
      response = ResponseSuccess(data);
    } catch (ex) {
      response = ResponseError(ex.toString());
    }
    return response;
  }

  @Get('currencies')
  async getCurrencies() {
    var response;
    try {
      var data = await this.currencyService.currencies(); 
      response = ResponseSuccess(data);
    } catch (ex) {
      response = ResponseError(ex.toString());
    }
    return response;
  }
  @Get('latest/:base_currency?/:currencies?')
  async getLatest(@Param() param) {
    var response;
    try {
      var data = await this.currencyService.latestCurrencies(
        param.base_currency,
        param.currencies
      ); 
      response = ResponseSuccess(data);
    } catch (ex) {
      response = ResponseError(ex.toString());
    }
    return response;
  }

  @Post('insertconversion')
  async insertCurrencyData(@Body() data: any): Promise<string> {
    var response;
    try {
      var data = await this.currencyService.insertConversions(data); 
      response = ResponseSuccess(data);
    } catch (ex) {
      response = ResponseError(ex.toString());
    }
    return response;
  }

  @Get('conversions')
  async getConversions() {
    var response;
    try {
      var data = await this.currencyService.conversions(); 
      response = ResponseSuccess(data);
    } catch (ex) {
      response = ResponseError(ex.toString());
    }
    return response;
  }
}
