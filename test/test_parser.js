const expect = require('../expect.js').expect;
const parser = require('../parser.js').parser;

function test(comment, testReturn) {
  console.log(comment, "\n", testReturn());
}

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
    "type": "OBJECT",
    "child": [{
      "type": "ARRAY",
      "key": "value",
      "value": "ARRAY OBJECT",
      "child": [{
          "type": "NUMBER",
          "value": "3",
          "child": []
        },
        {
          "type": "NUMBER",
          "value": "2",
          "child": []
        },
        {
          "type": "NUMBER",
          "value": "1",
          "child": []
        },
        {
          "type": "NUMBER",
          "value": "3",
          "child": []
        }
      ]
    }]
  };
  const result = parser.parsingObj(testcase);
  return expect(result).toEqual(answer);
});

test("ARRAY 데이터 형태를 answer와 같이 올바르게 나온다", function () {
  const testcase = '[3, 2, 1, 4]';
  const answer = {
    "type": "ARRAY",
    "value": "ARRAY OBJECT",
    "child": [{
        "type": "NUMBER",
        "value": "3",
        "child": []
      },
      {
        "type": "NUMBER",
        "value": "2",
        "child": []
      },
      {
        "type": "NUMBER",
        "value": "1",
        "child": []
      },
      {
        "type": "NUMBER",
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
    "type": "ARRAY",
    "value": "ARRAY OBJECT",
    "child": [{
      "type": "ARRAY",
      "value": "ARRAY OBJECT",
      "child": []
    }]
  }
  const result = parser.parsingObj(testcase);
  return expect(result).toEqual(answer);
});

test("다중 배열 중첩시 answer와 같이 올바르게 나온다", function () {
  const testcase = "[[[[[]]],[]]]";
  const answer = {
    "type": "ARRAY",
    "value": "ARRAY OBJECT",
    "child": [{
      "type": "ARRAY",
      "value": "ARRAY OBJECT",
      "child": [{
          "type": "ARRAY",
          "value": "ARRAY OBJECT",
          "child": [{
            "type": "ARRAY",
            "value": "ARRAY OBJECT",
            "child": [{
              "type": "ARRAY",
              "value": "ARRAY OBJECT",
              "child": []
            }]
          }]
        },
        {
          "type": "ARRAY",
          "value": "ARRAY OBJECT",
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
    "type": "OBJECT",
    "child": [{
      "type": "OBJECT",
      "child": [{
        "type": "OBJECT",
        "child": [{
          "type": "OBJECT",
          "child": [{
            "type": "OBJECT",
            "child": []
          }]
        }]
      }]
    }]
  }
  const result = parser.parsingObj(testcase);
  return expect(result).toEqual(answer);
});

test("CASE 1: 다양한 데이터와 객체, 배열의 혼합된 데이터시 answer와 같이 나온다.", function () {
  const testcase = "[1,[[12, {keyName:[1, {firstKey:2, secondKey: 3},'world']}], 12],'2']";
  const answer = {
    "type": "ARRAY",
    "value": "ARRAY OBJECT",
    "child": [{
        "type": "NUMBER",
        "value": "1",
        "child": []
      },
      {
        "type": "ARRAY",
        "value": "ARRAY OBJECT",
        "child": [{
            "type": "ARRAY",
            "value": "ARRAY OBJECT",
            "child": [{
                "type": "NUMBER",
                "value": "12",
                "child": []
              },
              {
                "type": "OBJECT",
                "child": [{
                  "type": "ARRAY",
                  "key": "keyName",
                  "value": "ARRAY OBJECT",
                  "child": [{
                      "type": "NUMBER",
                      "value": "1",
                      "child": []
                    },
                    {
                      "type": "OBJECT",
                      "child": [{
                          "type": "NUMBER",
                          "key": "firstKey",
                          "child": []
                        },
                        {
                          "type": "NUMBER",
                          "key": "secondKey",
                          "child": []
                        }
                      ]
                    },
                    {
                      "type": "STRING",
                      "value": "'world'",
                      "child": []
                    }
                  ]
                }]
              }
            ]
          },
          {
            "type": "NUMBER",
            "value": "12",
            "child": []
          }
        ]
      },
      {
        "type": "STRING",
        "value": "'2'",
        "child": []
      }
    ]
  }
  const result = parser.parsingObj(testcase);
  return expect(result).toEqual(answer);
});


test("CASE 2: 다양한 데이터와 객체, 배열의 혼합된 데이터시 answer와 같이 나온다.", function () {
  const testcase = "['1a3',[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]";
  const answer = {
    "type": "ARRAY",
    "value": "ARRAY OBJECT",
    "child": [{
        "type": "STRING",
        "value": "'1a3'",
        "child": []
      },
      {
        "type": "ARRAY",
        "value": "ARRAY OBJECT",
        "child": [{
            "type": "NULL",
            "value": null,
            "child": []
          },
          {
            "type": "BOOLEAN",
            "value": false,
            "child": []
          },
          {
            "type": "ARRAY",
            "value": "ARRAY OBJECT",
            "child": [{
                "type": "STRING",
                "value": "'11'",
                "child": []
              },
              {
                "type": "ARRAY",
                "value": "ARRAY OBJECT",
                "child": [{
                  "type": "NUMBER",
                  "value": "112233",
                  "child": []
                }]
              },
              {
                "type": "OBJECT",
                "child": [{
                  "type": "ARRAY",
                  "key": "easy",
                  "value": "ARRAY OBJECT",
                  "child": [{
                      "type": "STRING",
                      "value": "'hello'",
                      "child": []
                    },
                    {
                      "type": "OBJECT",
                      "child": [{
                        "type": "STRING",
                        "key": "a",
                        "child": []
                      }]
                    },
                    {
                      "type": "STRING",
                      "value": "'world'",
                      "child": []
                    }
                  ]
                }]
              },
              {
                "type": "NUMBER",
                "value": "112",
                "child": []
              }
            ]
          },
          {
            "type": "NUMBER",
            "value": "55",
            "child": []
          },
          {
            "type": "STRING",
            "value": "'99'",
            "child": []
          }
        ]
      },
      {
        "type": "OBJECT",
        "child": [{
            "type": "STRING",
            "key": "a",
            "child": []
          },
          {
            "type": "ARRAY",
            "key": "b",
            "value": "ARRAY OBJECT",
            "child": [{
                "type": "NUMBER",
                "value": "912",
                "child": []
              },
              {
                "type": "ARRAY",
                "value": "ARRAY OBJECT",
                "child": [{
                    "type": "NUMBER",
                    "value": "5656",
                    "child": []
                  },
                  {
                    "type": "NUMBER",
                    "value": "33",
                    "child": []
                  }
                ]
              },
              {
                "type": "OBJECT",
                "child": [{
                    "type": "STRING",
                    "key": "key",
                    "child": []
                  },
                  {
                    "type": "ARRAY",
                    "key": "newkeys",
                    "value": "ARRAY OBJECT",
                    "child": [{
                        "type": "NUMBER",
                        "value": "1",
                        "child": []
                      },
                      {
                        "type": "NUMBER",
                        "value": "2",
                        "child": []
                      },
                      {
                        "type": "NUMBER",
                        "value": "3",
                        "child": []
                      },
                      {
                        "type": "NUMBER",
                        "value": "4",
                        "child": []
                      },
                      {
                        "type": "NUMBER",
                        "value": "5",
                        "child": []
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "BOOLEAN",
        "value": true,
        "child": []
      }
    ]
  }
  const result = parser.parsingObj(testcase);
  return expect(result).toEqual(answer);
});

test("공백 문자열이 있어도 answer와 같이 나온다.", function () {
  const testcase = "[1,[[1,{name: 'c r o n           g ', live: 'seoul', firstKey:[1,2,3, true]}]]]";
  const answer = {
    "type": "ARRAY",
    "value": "ARRAY OBJECT",
    "child": [{
        "type": "NUMBER",
        "value": "1",
        "child": []
      },
      {
        "type": "ARRAY",
        "value": "ARRAY OBJECT",
        "child": [{
          "type": "ARRAY",
          "value": "ARRAY OBJECT",
          "child": [{
              "type": "NUMBER",
              "value": "1",
              "child": []
            },
            {
              "type": "OBJECT",
              "child": [{
                  "type": "STRING",
                  "key": "name",
                  "child": []
                },
                {
                  "type": "STRING",
                  "key": "live",
                  "child": []
                },
                {
                  "type": "ARRAY",
                  "key": "firstKey",
                  "value": "ARRAY OBJECT",
                  "child": [{
                      "type": "NUMBER",
                      "value": "1",
                      "child": []
                    },
                    {
                      "type": "NUMBER",
                      "value": "2",
                      "child": []
                    },
                    {
                      "type": "NUMBER",
                      "value": "3",
                      "child": []
                    },
                    {
                      "type": "BOOLEAN",
                      "value": true,
                      "child": []
                    }
                  ]
                }
              ]
            }
          ]
        }]
      }
    ]
  }
  const result = parser.parsingObj(testcase);
  return expect(result).toEqual(answer);
});

test("일부 특부 문자열이 있어도 answer와 같이 나온다.", function () {
  const testcase = "[1,[[2, {inKey:['3213!@#$%^&*()_+', {firstKey:11, secondKey:'tes13@'}, 'test']}], null], true]";
  const answer = {
    "type": "ARRAY",
    "value": "ARRAY OBJECT",
    "child": [{
        "type": "NUMBER",
        "value": "1",
        "child": []
      },
      {
        "type": "ARRAY",
        "value": "ARRAY OBJECT",
        "child": [{
            "type": "ARRAY",
            "value": "ARRAY OBJECT",
            "child": [{
                "type": "NUMBER",
                "value": "2",
                "child": []
              },
              {
                "type": "OBJECT",
                "child": [{
                  "type": "ARRAY",
                  "key": "inKey",
                  "value": "ARRAY OBJECT",
                  "child": [{
                      "type": "STRING",
                      "value": "'3213!@#$%^&*()_+'",
                      "child": []
                    },
                    {
                      "type": "OBJECT",
                      "child": [{
                          "type": "NUMBER",
                          "key": "firstKey",
                          "child": []
                        },
                        {
                          "type": "STRING",
                          "key": "secondKey",
                          "child": []
                        }
                      ]
                    },
                    {
                      "type": "STRING",
                      "value": "'test'",
                      "child": []
                    }
                  ]
                }]
              }
            ]
          },
          {
            "type": "NULL",
            "value": null,
            "child": []
          }
        ]
      },
      {
        "type": "BOOLEAN",
        "value": true,
        "child": []
      }
    ]
  }
  const result = parser.parsingObj(testcase);
  return expect(result).toEqual(answer);
});