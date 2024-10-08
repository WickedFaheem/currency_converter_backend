import { Decimal128 } from "typeorm";

export class ConverionPayload{
    base_currency : string;
    base_currency_amount: number;
    currencies : currencies[]
}


export class currencies{
    name: string
    value: number;

}