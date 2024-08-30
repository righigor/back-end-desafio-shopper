export const createUserReturnMock = {
  id: 3,
  customerCode: "69410d81-fcef-4c5a-a032-8c748787ce13",
  name: "igor goncalves",
  createdAt: new Date("2024-08-30T00:07:56.996Z"),
  updatedAt: new Date("2024-08-30T00:07:56.996Z"),
};

export const createUserRequestMock = {
  name: "igor goncalves"
};

export const createGetAllUserReturnMock = [createUserReturnMock];

export const createUserRequestWithoutNameMock = {
  name: ""
};

export const createUserReturnWithNoDateMock = {
  id: 3,
  customerCode: "69410d81-fcef-4c5a-a032-8c748787ce13",
  name: "igor goncalves",
  createdAt: "2024-08-30T00:07:56.996Z",
  updatedAt: "2024-08-30T00:07:56.996Z",
};

export const createGetAllUserReturnWithNoDateMock = [createUserReturnWithNoDateMock];