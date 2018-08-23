const getTokenizer = require('./tokenizer.js').getTokenizer;
const checkDataError = require('./error.js').CheckError;
const checkDataType = require('./checkDataType').CheckDataType;
const countDataType = require('./count.js').Count;

class Stack {
  constructor() {
    this.stack = [];
    this.error = new checkDataError();
  }

  addData(data) {
    this.stack.push(data);
  }

  popData() {
    return this.stack.pop();
  }

  pushChild(child) {
    if (this.stack.length === 0) return child;
    let lastDataStructure = this.stack[this.stack.length - 1];
    this.error.checkArrKeyError(lastDataStructure, child);
    lastDataStructure.child.push(child);
  }
}

class Parser {
  constructor() {
    this.checkType = new checkDataType();
    this.count = new countDataType();
  }
  isOpenBrackets(value) {
    if (!/['"]/.test(value)) {
      const openBrackets = ['[', '{'];
      return openBrackets.indexOf(value) > -1;
    }
  }

  isCloseBrackets(value) {
    const closeBrackets = [']', '}'];
    return closeBrackets.indexOf(value) > -1;
  }

  stackData(tokenData) {
    const checkType = new checkDataType();
    const stack = new Stack();
    let temp = '';

    for (let value of tokenData) {
      if (this.isOpenBrackets(value)) {
        stack.addData(checkType.isArrayOrObjectType(value));
      } else if (this.isCloseBrackets(value)) {
        temp = stack.pushChild(stack.popData());
      } else {
        let getData = checkType.getDataStructure(value, stack);
        if (getData) temp = stack.pushChild(getData);
      }
    }
    return temp;
  }

  parsingObj(strData) {
    const error = new checkDataError();
    const isError = error.checkBlockError(strData);

    if (isError) {
      const tokenData = getTokenizer(strData);
      const parsingResult = this.stackData(tokenData);
      return parsingResult;
    }
  }

  showCalDataType(result) {
    const getCountType = this.count.printTypeResult(result);
    return getCountType;
  }
}
exports.parser = new Parser();
exports.stack = new Stack();



const testcase1 = "['1a3',[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]";
const testcase2 = "[1,[null,[1,4,{name: 'c r o n           g ', live: 'seoul', firstKey:{first:1,second:2, third:3}, secondKey:[1,false,2] }]]]";
const testcase3 = "{keyName:'name', value:3213, child:[1,3,true,false,null,['test']]}";
const testcase4 = "{keyName:'name', value:3213}";
const errorcase1 = "{key: ObjKey, value: true, other: 23}";
const errorcase2 = "[test:'test']"

const parser = new Parser();
const result = parser.parsingObj(testcase3);
// const result2 = parser.parsingObj(errorcase1);
console.log(JSON.stringify(result, null, 2));

const showResult = parser.showCalDataType(result);
console.log(showResult);