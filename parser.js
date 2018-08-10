const getTokenizer = require('./tokenizer.js').getTokenizer;
const checkDataError = require('./error.js').CheckError;
const checkDataType = require('./checkDataType').CheckDataType;

class Stack {
  constructor() {
    this.stack = [];
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
    lastDataStructure.child.push(child);
  }
}

class Parser {
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
        temp = stack.pushChild(stack.popData())
      } else {
        let getData = checkType.getDataType(value, stack);
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
      const parsingResult = {
        type: 'Array Type',
        child: this.stackData(tokenData)
      };
      return parsingResult;
    }
  }
}


const testcase1 = '12345';
const testcase2 = '[[[]]]';
const testcase3 = '[[],[],4,[6,5,87],[78]]';
const testcase4 = '[[1],[[2],3]]';
const testcase5 = '[11, [22], 33]';
const testcase6 = '[[[[1,[],2]],[]]]';
const testcase7 = "['123',[null,false,['11',[112233],112],55, '99'],33, true]";
const testcase8 = "['1a3',[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]";
const testcase9 = "[[[12, {keyName:[1, {firstKey:2, secondKey: 3},'world']}], 12],'2']";
const testcase10 = "[1,[[2, {inKey:[1, {firstKey:11, secondKey:'tes13@'}, 'test']}], null], true]";
const testcase11 = "[1,[2,[{name: '[ 1 ]', this: 1}]]]";
const testcase12 = "[[[1,{name: 'c r o n           g '}]]]";

const testcase13 = "[1,[[1,{name: 'c r o n           g ', live: 'seoul', firstKey:[1,2,3]}]]]";
const testcase14 = "[1,[[1,{name: 'c r o n           g ', live: 'seoul', firstKey:{first:1,second:2, third:3} }]]]";

const errorcase1 = '[3213, 2';
const errorcase2 = ']3213, 2[';
const errorcase3 = '[1, 55, 3]]';
const errorcase4 = '[[[p, []]]';
const errorcase5 = "['a13',[22,23,[11,[112233],112],55],33d]";
const errorcase6 = '["1a"3",[22,23,[11,[112233],112],55],33]';
const errorcase7 = "['1a3',[22,23,[11,[112233],112],55],3d3]";
const errorcase8 = "['1a3',[22,23,[11,[112233],112],55],d35]";
const errorcase9 = '["1a"a"a"s""3",[22,23,[11,[112233],112],55],33]';


// const errorTest1 = parsingObj(errorcase1); // BLOCK ERROR
// const errorTest2 = parsingObj(errorcase2); // BLOCK ERROR
// const errorTest3 = parsingObj(errorcase3); // BLOCK ERROR
// const errorTest4 = parsingObj(errorcase4); // BLOCK ERROR

// const errorTest5 = parsingObj(errorcase5); // TYPE ERROR => 33d
// const errorTest6 = parsingObj(errorcase6); // COMMA ERROR => '1a'3'
// const errorTest7 = parsingObj(errorcase7); // TYPE ERROR => 3d3
// const errorTest8 = parsingObj(errorcase8); // TYPE ERROR => d35
// const errorTest9 = parsingObj(errorcase9); // COMMA ERROR => "1a"a"a"s""3"
// const errorcase10 = "[[[1,{'name': 'c r o n           g '}]]]"; TYPE ERROR => 'name'

const parser = new Parser();
const result = parser.parsingObj(errorcase10)
console.log(JSON.stringify(result, null, 2));