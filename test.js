const checkDataType = require('./checkDataType.js').CheckDataType;
const tokenizer = require('./tokenizer.js').getTokenizer;
// const parser = require('./require.js').Parser;
// const error = require('./error.js').CheckError;
const expect = require('./expect.js').expect;

const checkData = new checkDataType();
// const parser = new parser();
// const error = new error();

function test(comment, testReturn) {
  console.log(comment);
  testReturn();
}

test("데이터 타입이 Number Type으로 올바르게 나온다", function () {
  const testcase = '12345';
  const result = checkData.getDataType(testcase).type;
  return expect('Number Type').toBe(result);
});

test("데이터 타입이 String Type으로 올바르게 나온다", function () {
  const testcase = "'12345'";
  const result = checkData.getDataType(testcase).type;
  return expect('String Type').toBe(result);
});

test("데이터 타입이 Null Type으로 올바르게 나온다", function () {
  const testcase = 'null';
  let result = checkData.getDataType(testcase).type;
  return expect('Null Type').toBe(result);
});

test("데이터 타입이 Boolean True Type으로 올바르게 나온다", function () {
  const testcase = 'true';
  let result = checkData.getDataType(testcase).type;
  return expect('Boolean True').toBe(result);
});

test("데이터 타입이 Boolean False Type으로 올바르게 나온다", function () {
  const testcase = 'false';
  let result = checkData.getDataType(testcase).type;
  return expect('Boolean False').toBe(result);
});

// test("데이터 타입이 Array Type으로 올바르게 나온다", function () {
//   const testcase = '[]';
//   let result = checkData.getDataType(testcase).type;
//   // console.log(result)
//   return expect('Array Type').toBe(result);
// });