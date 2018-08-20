const checkDataError = require('./error.js').CheckError;

const dataType = {
  array: 'Array Type',
  object: 'Object Type',
  objectKey: 'Object Key',
  arrayObj: 'Array Object Type',
  number: 'Number Type',
  string: 'String Type',
  null: 'Null Type'
};

const booleanType = {
  true: 'Boolean True',
  false: 'Boolean False'
};

let allDataType = {
  array: 0,
  object: 0,
  number: 0,
  string: 0,
  null: 0,
  boolean: 0,
}

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
      if (value === 'true') return new DataStructure(booleanType.true, true);
      else return new DataStructure(booleanType.false, false);
    } else if (value === 'null') {
      return new DataStructure(dataType.null, null)
    } else {
      this.error.checkExpectedObjToken(value);
    }
  }

  checkPrimitiveDataType(value) {
    if (this.isStringType(value)) return dataType.string;
    if (this.isNumberType(value)) return dataType.number;
    if (this.isBooleanType(value)) {
      if (value === 'true') return booleanType.true;
      else return booleanType.false;
    } else {
      return dataType.null;
    }
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
      (objValue === '[') ? this.countDataType(dataType.array): this.countDataType(dataType.object);
    } else {
      let getDataType = this.checkPrimitiveDataType(objValue);
      stack.pushChild(new DataStructure(getDataType, objValue, objKey));
      this.countDataType(getDataType);
    }
  }

  countDataType(getDataType) {
    if (getDataType === 'Array Type') allDataType.array++;
    else if (getDataType === 'Object Type') allDataType.object++;
    else if (getDataType === 'Number Type') allDataType.number++;
    else if (getDataType === 'String Type') allDataType.string++;
    else if (getDataType === 'Boolean True') allDataType.boolean++;
    else if (getDataType === 'Boolean False') allDataType.boolean++;
    else if (getDataType === 'Null Type') allDataType.null++;
    const resultCountType = "배열:" + allDataType.array + " 객체: " + allDataType.object + " 숫자: " + allDataType.number + " 문자: " + allDataType.string + " Boolean: " + allDataType.boolean + " Null: " + allDataType.null;
    return resultCountType;
  }

  isBooleanType(value) {
    return value === 'true' || value === 'false';
  }

  isStringType(value) {
    this.error.checkCommaError(value);
    return /[\'|\"]/.test(value);
  }

  isNumberType(value) {
    this.error.checkNumberError(value);
    return /\d/m.test(value);
  }

  isObjKeyValueType(value) {
    return /[:]/m.test(value);
  }
}