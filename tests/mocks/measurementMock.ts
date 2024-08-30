export const confirmMeasurementMock = {
  measureUUID: "sample-uuid",
  confirmedValue: 10,
};

export const listMeasurementReturnMock = {
  customer_code: "69410d81-fcef-4c5a-a032-8c748787ce13",
  measurements: [
    {
      measure_uuid: "sample-uuid-1",
      measure_datetime: new Date("2024-08-30T00:00:00.000Z"),
      measure_type: "WATER",
      has_confirmed: true,
      image_url: "http://example.com/image1.jpg",
    },
    {
      measure_uuid: "sample-uuid-2",
      measure_datetime: new Date("2024-08-30T01:00:00.000Z"),
      measure_type: "GAS",
      has_confirmed: false,
      image_url: "http://example.com/image2.jpg",
    },
  ],
};


export const createMeasurementRequestMock = {
  image:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABjElEQVR42mNk",
  customerCode: "69410d81-fcef-4c5a-a032-8c748787ce13",
  measureType: "WATER",
  measureDatetime: new Date("2024-08-30T00:00:00.000Z"),
};

export const createMeasurementResponseMock = {
  imageUrl: "string",
  measureValue: 0,
  measureUUID: "f8270723-e5c3-425e-beda-2cd1fe3ba7a7",
};

export const confirmMeasurementRequestMock = {
  measure_uuid: "f8270723-e5c3-425e-beda-2cd1fe3ba7a7",
  confirmed_value: 10,
};

export const confirmMeasurementResponseMock = {
  data: {
    success: true,
  },
};

export const listMeasurementRequestMock = {
  customerCode: "69410d81-fcef-4c5a-a032-8c748787ce13",
  measureType: "WATER",
};