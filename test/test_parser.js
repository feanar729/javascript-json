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
    "type": "Object_Type",
    "child": [{
      "type": "Array_Type",
      "key": "value",
      "value": "Array_Object_Type",
      "child": [{
          "type": "Number_Type",
          "value": "3",
          "child": []
        },
        {
          "type": "Number_Type",
          "value": "2",
          "child": []
        },
        {
          "type": "Number_Type",
          "value": "1",
          "child": []
        },
        {
          "type": "Number_Type",
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
    "type": "Array_Type",
    "value": "Array_Object_Type",
    "child": [{
        "type": "Number_Type",
        "value": "3",
        "child": []
      },
      {
        "type": "Number_Type",
        "value": "2",
        "child": []
      },
      {
        "type": "Number_Type",
        "value": "1",
        "child": []
      },
      {
        "type": "Number_Type",
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
    "type": "Array_Type",
    "value": "Array_Object_Type",
    "child": [{
      "type": "Array_Type",
      "value": "Array_Object_Type",
      "child": []
    }]
  }
  const result = parser.parsingObj(testcase);
  return expect(result).toEqual(answer);
});

test("다중 배열 중첩시 answer와 같이 올바르게 나온다", function () {
  const testcase = "[[[[[]]],[]]]";
  const answer = {
    "type": "Array_Type",
    "value": "Array_Object_Type",
    "child": [{
      "type": "Array_Type",
      "value": "Array_Object_Type",
      "child": [{
          "type": "Array_Type",
          "value": "Array_Object_Type",
          "child": [{
            "type": "Array_Type",
            "value": "Array_Object_Type",
            "child": [{
              "type": "Array_Type",
              "value": "Array_Object_Type",
              "child": []
            }]
          }]
        },
        {
          "type": "Array_Type",
          "value": "Array_Object_Type",
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
    "type": "Object_Type",
    "child": [{
      "type": "Object_Type",
      "child": [{
        "type": "Object_Type",
        "child": [{
          "type": "Object_Type",
          "child": [{
            "type": "Object_Type",
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
    "type": "Array_Type",
    "value": "Array_Object_Type",
    "child": [{
        "type": "Number_Type",
        "value": "1",
        "child": []
      },
      {
        "type": "Array_Type",
        "value": "Array_Object_Type",
        "child": [{
            "type": "Array_Type",
            "value": "Array_Object_Type",
            "child": [{
                "type": "Number_Type",
                "value": "12",
                "child": []
              },
              {
                "type": "Object_Type",
                "child": [{
                  "type": "Array_Type",
                  "key": "keyName",
                  "value": "Array_Object_Type",
                  "child": [{
                      "type": "Number_Type",
                      "value": "1",
                      "child": []
                    },
                    {
                      "type": "Object_Type",
                      "child": [{
                          "type": "Number_Type",
                          "key": "firstKey",
                          "value": "2",
                          "child": []
                        },
                        {
                          "type": "Number_Type",
                          "key": "secondKey",
                          "value": "3",
                          "child": []
                        }
                      ]
                    },
                    {
                      "type": "String_Type",
                      "value": "'world'",
                      "child": []
                    }
                  ]
                }]
              }
            ]
          },
          {
            "type": "Number_Type",
            "value": "12",
            "child": []
          }
        ]
      },
      {
        "type": "String_Type",
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
    "type": "Array_Type",
    "value": "Array_Object_Type",
    "child": [{
        "type": "String_Type",
        "value": "'1a3'",
        "child": []
      },
      {
        "type": "Array_Type",
        "value": "Array_Object_Type",
        "child": [{
            "type": "Null_Type",
            "value": null,
            "child": []
          },
          {
            "type": "Boolean_False",
            "value": false,
            "child": []
          },
          {
            "type": "Array_Type",
            "value": "Array_Object_Type",
            "child": [{
                "type": "String_Type",
                "value": "'11'",
                "child": []
              },
              {
                "type": "Array_Type",
                "value": "Array_Object_Type",
                "child": [{
                  "type": "Number_Type",
                  "value": "112233",
                  "child": []
                }]
              },
              {
                "type": "Object_Type",
                "child": [{
                  "type": "Array_Type",
                  "key": "easy",
                  "value": "Array_Object_Type",
                  "child": [{
                      "type": "String_Type",
                      "value": "'hello'",
                      "child": []
                    },
                    {
                      "type": "Object_Type",
                      "child": [{
                        "type": "String_Type",
                        "key": "a",
                        "value": "'a'",
                        "child": []
                      }]
                    },
                    {
                      "type": "String_Type",
                      "value": "'world'",
                      "child": []
                    }
                  ]
                }]
              },
              {
                "type": "Number_Type",
                "value": "112",
                "child": []
              }
            ]
          },
          {
            "type": "Number_Type",
            "value": "55",
            "child": []
          },
          {
            "type": "String_Type",
            "value": "'99'",
            "child": []
          }
        ]
      },
      {
        "type": "Object_Type",
        "child": [{
            "type": "String_Type",
            "key": "a",
            "value": "'str'",
            "child": []
          },
          {
            "type": "Array_Type",
            "key": "b",
            "value": "Array_Object_Type",
            "child": [{
                "type": "Number_Type",
                "value": "912",
                "child": []
              },
              {
                "type": "Array_Type",
                "value": "Array_Object_Type",
                "child": [{
                    "type": "Number_Type",
                    "value": "5656",
                    "child": []
                  },
                  {
                    "type": "Number_Type",
                    "value": "33",
                    "child": []
                  }
                ]
              },
              {
                "type": "Object_Type",
                "child": [{
                    "type": "String_Type",
                    "key": "key",
                    "value": "'innervalue'",
                    "child": []
                  },
                  {
                    "type": "Array_Type",
                    "key": "newkeys",
                    "value": "Array_Object_Type",
                    "child": [{
                        "type": "Number_Type",
                        "value": "1",
                        "child": []
                      },
                      {
                        "type": "Number_Type",
                        "value": "2",
                        "child": []
                      },
                      {
                        "type": "Number_Type",
                        "value": "3",
                        "child": []
                      },
                      {
                        "type": "Number_Type",
                        "value": "4",
                        "child": []
                      },
                      {
                        "type": "Number_Type",
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
        "type": "Boolean_True",
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
    "type": "Array_Type",
    "value": "Array_Object_Type",
    "child": [{
        "type": "Number_Type",
        "value": "1",
        "child": []
      },
      {
        "type": "Array_Type",
        "value": "Array_Object_Type",
        "child": [{
          "type": "Array_Type",
          "value": "Array_Object_Type",
          "child": [{
              "type": "Number_Type",
              "value": "1",
              "child": []
            },
            {
              "type": "Object_Type",
              "child": [{
                  "type": "String_Type",
                  "key": "name",
                  "value": "'c r o n           g '",
                  "child": []
                },
                {
                  "type": "String_Type",
                  "key": "live",
                  "value": "'seoul'",
                  "child": []
                },
                {
                  "type": "Array_Type",
                  "key": "firstKey",
                  "value": "Array_Object_Type",
                  "child": [{
                      "type": "Number_Type",
                      "value": "1",
                      "child": []
                    },
                    {
                      "type": "Number_Type",
                      "value": "2",
                      "child": []
                    },
                    {
                      "type": "Number_Type",
                      "value": "3",
                      "child": []
                    },
                    {
                      "type": "Boolean_True",
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
    "type": "Array_Type",
    "value": "Array_Object_Type",
    "child": [{
        "type": "Number_Type",
        "value": "1",
        "child": []
      },
      {
        "type": "Array_Type",
        "value": "Array_Object_Type",
        "child": [{
            "type": "Array_Type",
            "value": "Array_Object_Type",
            "child": [{
                "type": "Number_Type",
                "value": "2",
                "child": []
              },
              {
                "type": "Object_Type",
                "child": [{
                  "type": "Array_Type",
                  "key": "inKey",
                  "value": "Array_Object_Type",
                  "child": [{
                      "type": "String_Type",
                      "value": "'3213!@#$%^&*()_+'",
                      "child": []
                    },
                    {
                      "type": "Object_Type",
                      "child": [{
                          "type": "Number_Type",
                          "key": "firstKey",
                          "value": "11",
                          "child": []
                        },
                        {
                          "type": "String_Type",
                          "key": "secondKey",
                          "value": "'tes13@'",
                          "child": []
                        }
                      ]
                    },
                    {
                      "type": "String_Type",
                      "value": "'test'",
                      "child": []
                    }
                  ]
                }]
              }
            ]
          },
          {
            "type": "Null_Type",
            "value": null,
            "child": []
          }
        ]
      },
      {
        "type": "Boolean_True",
        "value": true,
        "child": []
      }
    ]
  }
  const result = parser.parsingObj(testcase);
  return expect(result).toEqual(answer);
});