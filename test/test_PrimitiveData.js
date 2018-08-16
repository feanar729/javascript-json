const checkDataType = require('../checkDataType.js').CheckDataType;
const tokenizer = require('../tokenizer.js').getTokenizer;
const expect = require('../expect.js').expect;

const checkData = new checkDataType();

function test(comment, testReturn) {
  console.log(comment, "\n", testReturn());
}

// 기본 자료형 타입 구분
test("데이터 타입이 Number Type으로 올바르게 나온다", function () {
  const testcase = '12345';
  const result = checkData.getDataStructure(testcase).type;
  return expect('Number Type').toEqual(result);
});

test("데이터 타입이 String Type으로 올바르게 나온다", function () {
  const testcase = "'12345'";
  const result = checkData.getDataStructure(testcase).type;
  return expect('String Type').toEqual(result);
});

test("데이터 타입이 Null Type으로 올바르게 나온다", function () {
  const testcase = 'null';
  let result = checkData.getDataStructure(testcase).type;
  return expect('Null Type').toEqual(result);
});

test("데이터 타입이 Boolean True Type으로 올바르게 나온다", function () {
  const testcase = 'true';
  let result = checkData.getDataStructure(testcase).type;
  return expect('Boolean True').toEqual(result);
});

test("데이터 타입이 Boolean False Type으로 올바르게 나온다", function () {
  const testcase = 'false';
  let result = checkData.getDataStructure(testcase).type;
  return expect(result).toEqual('Boolean False');
});

test("데이터 타입이 Array Type으로 올바르게 나온다", function () {
  const testcase = '[]';
  let token = tokenizer(testcase);
  let result = checkData.isArrayOrObjectType(token[0]).type;
  return expect(result).toEqual('Array Type');
});

test("데이터 타입이 Object Type으로 올바르게 나온다", function () {
  const testcase = '{}';
  let token = tokenizer(testcase);
  let result = checkData.isArrayOrObjectType(token[0]).type;
  return expect(result).toEqual('Object Type');
});