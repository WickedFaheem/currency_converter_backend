import { Controller, Injectable, Param } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Sequelize } from 'sequelize-typescript';
import sequelize from 'sequelize';
import { environment } from 'src/common/environment';
import { ConverionPayload } from './dto/conversion.dto';
const axios = require('axios');
@Injectable()
@Controller('currency')
export class CurrencyService {
  constructor(private sequelize: Sequelize) {}

  async currencyLogs() {
    try {
      let query = `Select * from Conversion_Logs where IsActive = 1`;
      var data = await this.sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
      });
      return data;
    } catch (e) {
      return e.toString();
    }
  }

  async currencies() {
    var resArray: any = [];
    let config = {
      method: 'get',
      url: `${environment.apiUrl}currencies?apikey=${environment.API_KEY}`,
    };
    try {
      const response = await axios.request(config);
      if (response.data) {
        resArray.push(response.data.data);
        return resArray;
      } else {
        throw new Error('No data returned from API');
      }
    } catch (error) {
      console.error('Error fetching currencies:', error);
      throw error;
    }
  }

  async latestCurrencies(base_currency?: string, currencies?: string) {
    var resArray: any = [];
    let config = {
      method: 'get',
      url: `${environment.apiUrl}latest?apikey=${environment.API_KEY}&base_currency=${base_currency ? base_currency : ''}&currencies=${currencies ? currencies : ''}`,
    };
    try {
      const response = await axios.request(config);
      if (response.data) {
        resArray.push(response.data.data);
        return resArray;
      } else {
        throw new Error('No data returned from API');
      }
    } catch (error) {
      console.error('Error fetching currencies:', error);
      throw error;
    }
  }

  async insertConversions(dtaTable: ConverionPayload) {
    try {
      // Convert currencies array to JSON string
      const currenciesJson = JSON.stringify(dtaTable.currencies);

      let query = `Exec InsertCurrencyConversionsv2'${dtaTable.base_currency}',${dtaTable.base_currency_amount},'${currenciesJson}'`;

      var data = await this.sequelize.query(query, {
        type: sequelize.QueryTypes.INSERT,
      });
      return data;
    } catch (e) {
      return e.toString();
    }
  }

  async conversions() {
    try {
      let query = `Exec API_SelectAllConversions`;
      var data = await this.sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
      });
  
      // Object to temporarily store the grouped data
      const groupedData = {};
  
      // Iterate over the data using forEach to group and structure it
      data.forEach((item:any) => {
        const baseCurrencyId = item.base_currency_id;
  
        // If the base currency doesn't exist in groupedData, initialize it
        if (!groupedData[baseCurrencyId]) {
          groupedData[baseCurrencyId] = {
            id: item.base_currency_id,
            BaseCurrencyName: item.BaseCurrencyName,
            BaseAmmount: item.BaseAmmount,
            ConversionDate : item.CreationDate,
            currency_lines: []
          };
        }
  
        // Add the conversion data to the currency_lines array
        groupedData[baseCurrencyId].currency_lines.push({
          currency_log_id: item.currency_log_id,
          ConversionCurrencyName: item.ConversionCurrencyName,
          ConversionAmmount: item.ConversionAmmount 
        });
      }); 
  
      // Use Object.values to convert the grouped object back into an array
      const mappedData = Object.values(groupedData);
  
      return mappedData;
    } catch (e) {
      return e.toString();
    }
  }
  
  

}
