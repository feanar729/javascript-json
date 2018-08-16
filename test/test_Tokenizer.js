const tokenizer = require('../tokenizer.js').getTokenizer;
const expect = require('../expect.js').expect;

function test(comment, testReturn) {
  console.log(comment, "\n", testReturn());
}

// tokenizer 기능
test("각각의 문자열들을 token 단위의 쪼개어 배열로 반환되어 올바르게 나온다", function () {
  const testcase = '[1,2,3,4]';
  const answer = '[object Array]';
  const token = tokenizer(testcase);
  let result = Object.prototype.toString.call(token);
  return expect(result).toEqual(answer);
});

test("문자열을 제외한 데이터는 공백은 제거되어 나온다", function () {
  const testcase = '[1, 2,   3,               4,                   5, 6]';
  const answer = [
    '[',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    ']'
  ];
  const token = tokenizer(testcase);
  return expect(token).toEqual(answer);
});

test("데이터의 문자열이 공백이 있다면 공백을 포함한 문자열로 배열에 담겨 나온다.", function () {
  const testcase = "Code S   Qu                                 a                        d";
  const answer = ['Code S   Qu                                 a                        d'];
  const token = tokenizer(testcase);
  return expect(token).toEqual(answer);
});

test("객체에 Value가 객체라면 ':' 단위로 합쳐서 answer와 같이 나온다.", function () {
  const testcase = "{key:{1}}";
  const answer = "key:{";
  const token = tokenizer(testcase);
  return expect(token[1]).toEqual(answer);
});

test("객체에 Value가 배열이라면 ':' 단위로 합쳐서 answer와 같이 나온다.", function () {
  const testcase = "{key:[1]}";
  const answer = "key:[";
  const token = tokenizer(testcase);
  return expect(token[1]).toEqual(answer);
});