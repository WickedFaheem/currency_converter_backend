export class RootObject {
    data: Data;
  }
  export class Data {
    AED: AED;
    AFN: AED;
  }
  export class AED {
    symbol: string;
    name: string;
    symbol_native: string;
    decimal_digits: number;
    rounding: number;
    code: string;
    name_plural: string;
  }