const checkDataType = require('../checkDataType.js').CheckDataType;
const tokenizer = require('../tokenizer.js').getTokenizer;
const expect = require('../expect.js').expect;

const checkData = new checkDataType();

function test(comment, testReturn) {
  console.log(comment, "\n", testReturn());
}

// 기본 자료형 타입 구분
test("데이터 타입이 Number_Type으로 올바르게 나온다", function () {
  const testcase = '12345';
  const result = checkData.getDataStructure(testcase).type;
  return expect('Number_Type').toEqual(result);
});

test("데이터 타입이 String_Type으로 올바르게 나온다", function () {
  const testcase = "'12345'";
  const result = checkData.getDataStructure(testcase).type;
  return expect('String_Type').toEqual(result);
});

test("데이터 타입이 Null_Type으로 올바르게 나온다", function () {
  const testcase = 'null';
  let result = checkData.getDataStructure(testcase).type;
  return expect('Null_Type').toEqual(result);
});

test("데이터 타입이 Boolean_True_Type으로 올바르게 나온다", function () {
  const testcase = 'true';
  let result = checkData.getDataStructure(testcase).type;
  return expect('Boolean_True').toEqual(result);
});

test("데이터 타입이 Boolean_False_Type으로 올바르게 나온다", function () {
  const testcase = 'false';
  let result = checkData.getDataStructure(testcase).type;
  return expect(result).toEqual('Boolean_False');
});

test("데이터 타입이 Array_Type으로 올바르게 나온다", function () {
  const testcase = '[]';
  let token = tokenizer(testcase);
  let result = checkData.isArrayOrObjectType(token[0]).type;
  return expect(result).toEqual('Array_Type');
});

test("데이터 타입이 Object_Type으로 올바르게 나온다", function () {
  const testcase = '{}';
  let token = tokenizer(testcase);
  let result = checkData.isArrayOrObjectType(token[0]).type;
  return expect(result).toEqual('Object_Type');
});