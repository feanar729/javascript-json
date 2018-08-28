const checkDataType = require('../checkDataType.js').CheckDataType;
const tokenizer = require('../tokenizer.js').getTokenizer;
const expect = require('../expect.js').expect;

const checkData = new checkDataType();

function test(comment, testReturn) {
  console.log(comment, "\n", testReturn());
}

// 기본 자료형 타입 구분
test("데이터 타입이 NUMBER 으로 올바르게 나온다", function () {
  const testcase = '12345';
  const result = checkData.getDataStructure(testcase).type;
  return expect('NUMBER').toEqual(result);
});

test("데이터 타입이 STRING 으로 올바르게 나온다", function () {
  const testcase = "'12345'";
  const result = checkData.getDataStructure(testcase).type;
  return expect('STRING').toEqual(result);
});

test("데이터 타입이 NULL 으로 올바르게 나온다", function () {
  const testcase = 'null';
  let result = checkData.getDataStructure(testcase).type;
  return expect('NULL').toEqual(result);
});

test("데이터 타입이 BOOLEAN 으로 올바르게 나온다", function () {
  const testcase = 'true';
  let result = checkData.getDataStructure(testcase).type;
  return expect('BOOLEAN').toEqual(result);
});

test("데이터 타입이 BOOLEAN 으로 올바르게 나온다", function () {
  const testcase = 'false';
  let result = checkData.getDataStructure(testcase).type;
  return expect(result).toEqual('BOOLEAN');
});

test("데이터 타입이 ARRAY 으로 올바르게 나온다", function () {
  const testcase = '[]';
  let token = tokenizer(testcase);
  let result = checkData.isArrayOrObjectType(token[0]).type;
  return expect(result).toEqual('ARRAY');
});

test("데이터 타입이 OBJECT 으로 올바르게 나온다", function () {
  const testcase = '{}';
  let token = tokenizer(testcase);
  let result = checkData.isArrayOrObjectType(token[0]).type;
  return expect(result).toEqual('OBJECT');
});