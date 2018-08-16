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
    this.error.checkObjKeyError(value);
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
      stack.addData(new DataStructure(this.checkPrimitiveDataType(objValue), objValue, objKey));
      stack.pushChild(stack.popData());
    }
  }

  isBooleanType(temp) {
    return temp === 'true' || temp === 'false';
  }

  isStringType(value) {
    this.error.checkCommaError(value);
    return /[\'|\"]/.test(value);
  }

  isNumberType(temp) {
    this.error.checkNumberError(temp);
    return /^(?=.*[0-9]).*$/m.test(temp);
  }

  isObjKeyValueType(value) {
    return /[:]/m.test(value);
  }
}