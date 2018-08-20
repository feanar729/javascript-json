let allDataType = {
  array: 0,
  object: 0,
  number: 0,
  string: 0,
  null: 0,
  boolean: 0,
}

exports.Count = class Count {
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
}