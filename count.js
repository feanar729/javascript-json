exports.Count = class Count {
  constructor() {
    this.type = {
      Array_Type: 0,
      Object_Type: 0,
      Number_Type: 0,
      String_Type: 0,
      Null_Type: 0,
      Boolean_True: 0,
      Boolean_False: 0,
    }
  }

  countDataType(getDataType) {
    for (let key in this.type) {
      if (getDataType === key) this.type[key]++;
    }
    const resultCountType =
      `배열: ${this.type.Array_Type}개` + ` 객체: ${this.type.Object_Type}개` +
      ` 숫자: ${this.type.Number_Type}개` + ` 문자: ${this.type.String_Type}개` +
      ` Boolean: ${this.type.Boolean_True + this.type.Boolean_False}개` + ` Null: ${this.type.Null_Type}개`;
    return resultCountType;
  }
}