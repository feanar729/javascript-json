const checkDataError = require('./error.js').CheckError;

const dataType = {
  array: 'ARRAY',
  object: 'OBJECT',
  number: 'NUMBER',
  string: 'STRING',
  null: 'NULL',
  boolean: 'BOOLEAN',
  arrayObj: 'ARRAY OBJECT'
};

class DataStructure {
  constructor(type, value, key) {
    this.type = type;
    this.key = key;
    this.value = value;
    this.child = [];
  }
}

exports.CheckDataType = class CheckDataType {
  constructor() {
    this.error = new checkDataError();
  }

  getDataStructure(value, stack) {
    if (this.isObjKeyValueType(value)) return this.getObjKeyValType(value, stack);
    if (this.isStringType(value)) return new DataStructure(dataType.string, value.trim());
    if (this.isNumberType(value)) return new DataStructure(dataType.number, value.trim());
    if (this.isBooleanType(value)) {
      if (value === 'true') return new DataStructure(dataType.boolean, true);
      else return new DataStructure(dataType.boolean, false);
    } else if (value === 'null') {
      return new DataStructure(dataType.null, null)
    } else {
      this.error.checkExpectedObjToken(value);
    }
  }

  checkPrimitiveDataType(value) {
    if (this.isStringType(value)) return dataType.string;
    if (this.isNumberType(value)) return dataType.number;
    if (this.isBooleanType(value)) return dataType.boolean;
    if (this.isNullType(value)) return dataType.null;
  }

  isArrayOrObjectType(value) {
    if (value === '[') return new DataStructure(dataType.array, dataType.arrayObj)
    else if (value === '{') return new DataStructure(dataType.object);
  }

  getObjKeyValType(value, stack) {
    const divideKeyValue = value.split(':');
    const objKey = divideKeyValue[0].trim();
    const objValue = divideKeyValue[1].trim();
    this.error.checkObjKeyError(objKey);
    if (objValue === '[' || objValue === '{') {
      if (objValue === '[') stack.addData(new DataStructure(dataType.array, dataType.arrayObj, objKey));
      else stack.addData(new DataStructure(dataType.object, undefined, objKey));
    } else {
      let getDataType = this.checkPrimitiveDataType(objValue);
      this.error.checkObjValueError(objValue);
      stack.pushChild(new DataStructure(getDataType, objValue, objKey));
    }
  }

  isBooleanType(value) {
    return value === 'true' || value === 'false';
  }

  isStringType(value) {
    this.error.checkQuotesError(value);
    return /[\'|\"]/.test(value);
  }

  isNumberType(value) {
    this.error.checkNumberError(value);
    return /\d/m.test(value);
  }

  isObjKeyValueType(value) {
    return /[:]/m.test(value);
  }

  isNullType(value) {
    return value === 'null';
  }
}