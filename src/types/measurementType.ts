export type MeasurementTypeBody = {
  image: string;
  customer_code: string;
  measure_datetime: string;
  measure_type: string;
}

export type MeasurementTypeDB = {
  image: string;
  customerCode: string;
  measureDatetime: string;
  measureTypeId: number;
}

export type ConfirmMeasurementTypeBody = {
  measure_uuid: string;
  confirmed_value: number;
}

export type ConfirmMeasurementTypeDB = {
  measureUUID: string;
  confirmedValue: number;
}