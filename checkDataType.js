const checkDataError = require('./error.js').CheckError;
const countDataType = require('./count.js').Count;

const dataType = {
  array: 'Array_Type',
  object: 'Object_Type',
  objectKey: 'Object_Key',
  arrayObj: 'Array_Object_Type',
  number: 'Number_Type',
  string: 'String_Type',
  null: 'Null_Type'
};

const booleanType = {
  true: 'Boolean_True',
  false: 'Boolean_False'
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

  getDataStructure(value, stack, count) {
    if (this.isObjKeyValueType(value)) return this.getObjKeyValType(value, stack, count);
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

  getObjKeyValType(value, stack, count) {
    const divideKeyValue = value.split(':');
    const objKey = divideKeyValue[0].trim();
    const objValue = divideKeyValue[1].trim();
    this.error.checkObjKeyError(objKey);
    if (objValue === '[' || objValue === '{') {
      if (objValue === '[') stack.addData(new DataStructure(dataType.array, dataType.arrayObj, objKey));
      else stack.addData(new DataStructure(dataType.object, undefined, objKey));
      objValue === '[' ? count.countDataType(dataType.array) : count.countDataType(dataType.object);
    } else {
      let getDataType = this.checkPrimitiveDataType(objValue);
      count.countDataType(getDataType)
      stack.pushChild(new DataStructure(getDataType, objValue, objKey));
    }
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