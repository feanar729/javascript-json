const checkDataType = require('../checkDataType.js').CheckDataType;
const tokenizer = require('../tokenizer.js').getTokenizer;
const checkError = require('../error.js').CheckError;
const message = require('../error.js').ERROR_MSG;
const expect = require('../expect.js').expect;
const parser = require('../parser.js').parser;

const error = new checkError();

function test(comment, testReturn) {
  console.log(comment, "\n", testReturn());
}

// Error 출력
test("배열 괄호가 올바르지 않는다면 Error 출력 - CASE_1", function () {
  const errorcase = '[3213, 2';
  try {
    error.checkBlockError(errorcase);
  } catch (errorResult) {
    const result = message.ERROR_MSG.BLOCK_ARRAY_ERROR;
    const answer = "정상적으로 종료되지 않은 배열이 있습니다.";
    return expect(answer).toEqual(result);

  }
});

test("배열 괄호가 올바르지 않는다면 Error 출력 - CASE_2", function () {
  const errorcase = ']3213, 2[';
  try {
    error.checkBlockError(errorcase);
  } catch (errorResult) {
    const result = message.ERROR_MSG.BLOCK_ARRAY_ERROR;
    const answer = "정상적으로 종료되지 않은 배열이 있습니다.";
    return expect(answer).toEqual(result);

  }
});

test("배열 괄호가 올바르지 않는다면 Error 출력 - CASE_3", function () {
  const errorcase = '[[[p, []]]';
  try {
    error.checkBlockError(errorcase);
  } catch (errorResult) {
    const result = message.ERROR_MSG.BLOCK_ARRAY_ERROR;
    const answer = "정상적으로 종료되지 않은 배열이 있습니다.";
    return expect(answer).toEqual(result);

  }
});

test("객체 괄호가 올바르지 않는다면 Error 출력 - CASE_1", function () {
  const errorcase = "{name: 'kee', age:12";
  try {
    error.checkBlockError(errorcase);
  } catch (errorResult) {
    const result = message.ERROR_MSG.BLOCK_OBJECT_ERROR;
    const answer = "정상적으로 종료되지 않은 객체가 있습니다.";
    return expect(answer).toEqual(result);

  }
});


test("객체 괄호가 올바르지 않는다면 Error 출력 - CASE_2", function () {
  const errorcase = "name: 'kee', age:12}";
  try {
    error.checkBlockError(errorcase);
  } catch (errorResult) {
    const result = message.ERROR_MSG.BLOCK_OBJECT_ERROR;
    const answer = "정상적으로 종료되지 않은 객체가 있습니다.";
    return expect(answer).toEqual(result);

  }
});

test("객체 괄호가 올바르지 않는다면 Error 출력 - CASE_3", function () {
  const errorcase = "[1,[[1,{name: 'c r o n           g ', live: 'seoul', firstKey:[1,2,3]]]]";
  try {
    error.checkBlockError(errorcase);
  } catch (errorResult) {
    const result = message.ERROR_MSG.BLOCK_OBJECT_ERROR;
    const answer = "정상적으로 종료되지 않은 객체가 있습니다.";
    return expect(answer).toEqual(result);

  }
});

test("객체 Key Value를 나눌 ':'이 올바르지 않는다면 Error 출력 - CASE_1", function () {
  const errorcase = "{name:'str', b 1}";
  try {
    const token = tokenizer(errorcase);
    error.checkExpectedObjToken(token[2]);
  } catch (errorResult) {
    const result = message.ERROR_MSG.MISS_COLON_ERROR;
    const answer = "':' 이 누락된 객체표현이 있습니다.";
    return expect(answer).toEqual(result);
  }
});

test("객체 Key Value를 나눌 ':'이 올바르지 않는다면 Error 출력 - CASE_2", function () {
  const errorcase = "['1a3',[null,false,['11',112,'99'], {a:'str', b [912,[5656,33]]}], true]";
  try {
    const token = tokenizer(errorcase);
    error.checkExpectedObjToken(token[2]);
  } catch (errorResult) {
    const result = message.ERROR_MSG.MISS_COLON_ERROR;
    const answer = "':' 이 누락된 객체표현이 있습니다.";
    return expect(answer).toEqual(result);
  }
});


test("객체 Key 이름이 올바르지 않는다면 Error 출력", function () {
  const errorcase = "{name:'str', 'b': 1}";
  try {
    const token = tokenizer(errorcase);
    error.checkObjKeyError(token[2]);
  } catch (errorResult) {
    const result = message.ERROR_MSG.KEY_NAME_ERROR;
    const answer = "올바르지 않은 KEY NAME 입니다.";
    return expect(answer).toEqual(result);
  }
});

test("배열에 올바르지 않은 Key:Value 값이 들어 있다면 Error 출력", function () {
  const errorcase = "[name:'12']";
  try {
    const token = tokenizer(errorcase);
    parser.stackData(token);
  } catch (errorResult) {
    const result = message.ERROR_MSG.ARRAY_KEY_ERROR;
    const answer = "배열에는 키값을 설정할 수 없습니다.";
    return expect(answer).toEqual(result);
  }
});

test("문자열 기호가 올바르지 않는다면 Error 출력 - CASE_1", function () {
  const errorcase = '["1a"3",[22,23,[11,[112233],112],55],33]';
  try {
    error.checkCommaError(errorcase);
  } catch (errorResult) {
    const result = message.ERROR_MSG.COMMA_ERROR;
    const answer = "올바른 문자열이 아닙니다.";
    return expect(answer).toEqual(result);
  }
});

test("문자열 기호가 올바르지 않는다면 Error 출력 - CASE_2", function () {
  const errorcase = '["1a"a"a"s""3",[22,23,[11,[112233],112],55],33]';
  try {
    error.checkCommaError(errorcase);
  } catch (errorResult) {
    const result = message.ERROR_MSG.COMMA_ERROR;
    const answer = "올바른 문자열이 아닙니다.";
    return expect(answer).toEqual(result);
  }
});

test("숫자와 문자가 섞인 알 수 없는 데이터 타입일 경우", function () {
  const errorcase = "['1a3',[22,23,[11,[112233],112],55],3d3]";
  try {
    error.checkNumberError(errorcase);
  } catch (errorResult) {
    const result = message.ERROR_MSG.TYPE_ERROR;
    const answer = "알 수 없는 타입입니다.";
    return expect(answer).toEqual(result);
  }
});

test("숫자와 문자가 섞인 알 수 없는 데이터 타입일 경우", function () {
  const errorcase = "['1a3',[22,23,[11,[112233],112],55],d35]";
  try {
    error.checkNumberError(errorcase);
  } catch (errorResult) {
    const result = message.ERROR_MSG.TYPE_ERROR;
    const answer = "알 수 없는 타입입니다.";
    return expect(answer).toEqual(result);
  }
});

test("숫자와 문자가 섞인 알 수 없는 데이터 타입일 경우", function () {
  const errorcase = "['a13',[22,23,[11,[112233],112],55],33d]";
  try {
    error.checkNumberError(errorcase);
  } catch (errorResult) {
    const result = message.ERROR_MSG.TYPE_ERROR;
    const answer = "알 수 없는 타입입니다.";
    return expect(answer).toEqual(result);
  }
});