const checkDataType = require('../checkDataType.js').CheckDataType;
const tokenizer = require('../tokenizer.js').getTokenizer;
const expect = require('../expect.js').expect;
const parser = require('../parser.js').parser;

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
})


// parsing 기능
test("열린 괄호 '['를 인지하고 값이 있을때 true를 반환한다.", function () {
  const testcase = '[';
  const result = parser.isOpenBrackets(testcase);
  return expect(result).toEqual(true);
});

test("열린 괄호 '{'를 인지하고 값이 있을때 true를 반환한다.", function () {
  const testcase = '{';
  const result = parser.isOpenBrackets(testcase);
  return expect(result).toEqual(true);
});

test("닫힌 괄호 ']'를 인지하고 값이 있을때 true를 반환한다.", function () {
  const testcase = ']';
  const result = parser.isCloseBrackets(testcase);
  return expect(result).toEqual(true);
});

test("닫힌 괄호 '}'를 인지하고 값이 있을때 true를 반환한다.", function () {
  const testcase = '}';
  const result = parser.isCloseBrackets(testcase);
  return expect(result).toEqual(true);
});

test("Object 데이터 형태를 answer와 같이 올바르게 나온다", function () {
  const testcase = '{value:[3, 2, 1, 3]}';
  const answer = {
    "type": "Object Type",
    "child": [{
      "type": "Array Type",
      "key": "value",
      "value": "Array Object Type",
      "child": [{
          "type": "Number Type",
          "value": "3",
          "child": []
        },
        {
          "type": "Number Type",
          "value": "2",
          "child": []
        },
        {
          "type": "Number Type",
          "value": "1",
          "child": []
        },
        {
          "type": "Number Type",
          "value": "3",
          "child": []
        }
      ]
    }]
  };
  const result = parser.parsingObj(testcase);
  return expect(result).toEqual(answer);
});

test("Array 데이터 형태를 answer와 같이 올바르게 나온다", function () {
  const testcase = '[3, 2, 1, 4]';
  const answer = {
    "type": "Array Type",
    "value": "Array Object Type",
    "child": [{
        "type": "Number Type",
        "value": "3",
        "child": []
      },
      {
        "type": "Number Type",
        "value": "2",
        "child": []
      },
      {
        "type": "Number Type",
        "value": "1",
        "child": []
      },
      {
        "type": "Number Type",
        "value": "4",
        "child": []
      }
    ]
  }
  const result = parser.parsingObj(testcase);
  return expect(result).toEqual(answer);
});

test("2중 중첩시 answer와 같이 올바르게 나온다", function () {
  const testcase = '[[]]';
  const answer = {
    "type": "Array Type",
    "value": "Array Object Type",
    "child": [{
      "type": "Array Type",
      "value": "Array Object Type",
      "child": []
    }]
  }
  const result = parser.parsingObj(testcase);
  return expect(result).toEqual(answer);
});

test("다중 배열 중첩시 answer와 같이 올바르게 나온다", function () {
  const testcase = "[[[[[]]],[]]]";
  const answer = {
    "type": "Array Type",
    "value": "Array Object Type",
    "child": [{
      "type": "Array Type",
      "value": "Array Object Type",
      "child": [{
          "type": "Array Type",
          "value": "Array Object Type",
          "child": [{
            "type": "Array Type",
            "value": "Array Object Type",
            "child": [{
              "type": "Array Type",
              "value": "Array Object Type",
              "child": []
            }]
          }]
        },
        {
          "type": "Array Type",
          "value": "Array Object Type",
          "child": []
        }
      ]
    }]
  }
  const result = parser.parsingObj(testcase);
  return expect(result).toEqual(answer);
});

test("다중 객체 중첩시 answer와 같이 올바르게 나온다", function () {
  const testcase = "{{{{{}}}}}";
  const answer = {
    "type": "Object Type",
    "child": [{
      "type": "Object Type",
      "child": [{
        "type": "Object Type",
        "child": [{
          "type": "Object Type",
          "child": [{
            "type": "Object Type",
            "child": []
          }]
        }]
      }]
    }]
  }
  const result = parser.parsingObj(testcase);
  return expect(result).toEqual(answer);
});

test("다양한 데이터와 객체, 배열의 혼합된 데이터시 answer와 같이 나온다.", function () {
  const testcase = "[1,[[12, {keyName:[1, {firstKey:2, secondKey: 3},'world']}], 12],'2']";
  const answer = {
    "type": "Array Type",
    "value": "Array Object Type",
    "child": [{
        "type": "Number Type",
        "value": "1",
        "child": []
      },
      {
        "type": "Array Type",
        "value": "Array Object Type",
        "child": [{
            "type": "Array Type",
            "value": "Array Object Type",
            "child": [{
                "type": "Number Type",
                "value": "12",
                "child": []
              },
              {
                "type": "Object Type",
                "child": [{
                  "type": "Array Type",
                  "key": "keyName",
                  "value": "Array Object Type",
                  "child": [{
                      "type": "Number Type",
                      "value": "1",
                      "child": []
                    },
                    {
                      "type": "Object Type",
                      "child": [{
                          "type": "Number Type",
                          "key": "firstKey",
                          "value": "2",
                          "child": []
                        },
                        {
                          "type": "Number Type",
                          "key": "secondKey",
                          "value": "3",
                          "child": []
                        }
                      ]
                    },
                    {
                      "type": "String Type",
                      "value": "'world'",
                      "child": []
                    }
                  ]
                }]
              }
            ]
          },
          {
            "type": "Number Type",
            "value": "12",
            "child": []
          }
        ]
      },
      {
        "type": "String Type",
        "value": "'2'",
        "child": []
      }
    ]
  }
  const result = parser.parsingObj(testcase);
  return expect(result).toEqual(answer);
});