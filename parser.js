const dataType = {
  array: 'Array',
  object: 'Object',
  arrayObj: 'Array Object',
  number: 'Number',
  string: 'String',
  null: null
};

const booleanType = {
  true: true,
  false: false
}

const ERROR_MSG = {
  BLOCK_ERROR: 'BLOCK ERROR',
  TYPE_ERROR: 'TYPE ERROR',
  TOKEN_ERROR: '올바른 토큰값이 아닙니다.'
};

class DataStructure {
  constructor(type, value) {
    this.type = type;
    this.value = value;
    this.child = [];
  }
}

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

function checkBlockError(arrWord) {
  let BracketPoint = 0;
  const splitWord = arrWord.split('');

  splitWord.forEach(matchBrackets => {
    if (matchBrackets === '[') BracketPoint++;
    if (matchBrackets === ']') {
      if (BracketPoint === 0) throw new Error(ERROR_MSG.BLOCK_ERROR);
      BracketPoint--;
    }
  });
  if (BracketPoint === 0) {
    return true;
  }
  throw new Error(ERROR_MSG.BLOCK_ERROR);
}

function isCommaOrCloseBrackets(value) {
  return isCloseBrackets(value) || value === ',';
}

function isOpenBrackets(value) {
  const openBrackets = ['['];
  return openBrackets.indexOf(value) > -1;
}

function isCloseBrackets(value) {
  const closeBrackets = [']'];
  return closeBrackets.indexOf(value) > -1;
}

function isBooleanType(value) {
  return value === 'true' || value === 'false';
}

function isStringType(value) {
  if (value.match(/^['"].*$/m)) return true;
  // if (value.match(/^(?=.*\')(?=.*[a-z])(?=.*\').*$/m) && !isBooleanType(value)) {
  //   throw new Error(ERROR_MSG.TOKEN_ERROR) + value;
  // } else {
  //   return true;
  // }
}

function isNumberType(value) {
  return value.match(/^(?=.*[0-9]).*$/m)
}

function checkDataType(value) {
  console.log(value.match(/^['"].*$/m))
  if (isStringType(value)) {
    return new DataStructure(dataType.string, value.substring(1, value.length - 1));
  } else if (isBooleanType(value)) {
    if (value === 'true') return new DataStructure(booleanType.true, value);
    else return new DataStructure(booleanType.false, value);
  } else if (isNumberType(value)) {
    return new DataStructure(dataType.number, value);
  } else if (value === 'null') {
    return new DataStructure(dataType.null, value);
  }
}

// parsing 기능
function stackData(strData) {
  const stack = new Stack();
  let temp = '';

  for (let value of strData) {
    if (isOpenBrackets(value)) {
      stack.addData(new DataStructure(dataType.array, dataType.arrayObj));
    } else if (isCommaOrCloseBrackets(value)) {
      temp ? stack.pushChild(checkDataType(temp)) : null;
      temp = '';
      if (isCloseBrackets(value)) temp = stack.pushChild(stack.popData());
    } else {
      temp = temp + value.trim();
    }
  }
  return temp;
}

function parsingObj(strData) {
  const checkError = checkBlockError(strData);

  if (checkError) {
    const parsingResult = {
      type: dataType.array,
      child: stackData(strData)
    };
    return parsingResult;
  }
}

const testcase1 = '[11, 22,[3,41, 5]]';
const testcase2 = '[12, [14, 55], 15]';
const testcase3 = '[1, [55, [3]],[]]';
const testcase4 = '[1,3,[1,21,[2, 4324,[543, 432]]],324,[51,63],7]';
const testcase5 = '[[1123, 354445324328103829,[1, 2, [3],4,5,6]],[1,2],4,[5,6]]';
const testcase6 = '12345';
const testcase7 = '[[[]]]';
const testcase8 = '[[],[],4,[6,5,87],[78]]';
const testcase9 = '[[1],[[2],3]]';
const testcase10 = '[11, [22], 33]';
const testcase11 = '[[[[1,[],2]],[]]]';
const testcase12 = '[1, [[2]]]';
const testcase13 = '[123,[22,23,[11,[112233],112],55],33]';
const testcase14 = '[[[[12]]]]';
const testcase15 = "['123',[null,false,['11',[112233],112],55, '99'],33, true]";

const errorcase1 = '[3213, 2';
const errorcase2 = ']3213, 2[';
const errorcase3 = '[1, 55, 3]]';
const errorcase4 = '[[[p, []]]';
const errorcase5 = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
const errorcase6 = "['1a'3',[22,23,[11,[112233],112],55],33]";
const errorcase7 = "['1a3',[22,23,[11,[112233],112],55],3d3]";


// const test1 = parsingObj(testcase1);
// const test2 = parsingObj(testcase2);
// const test3 = parsingObj(testcase3);

// const test4 = parsingObj(testcase4);
// const test5 = parsingObj(testcase5);
// const test6 = parsingObj(testcase6);

// const test7 = parsingObj(testcase7);
// const test8 = parsingObj(testcase8);
// const test9 = parsingObj(testcase9);

// const test10 = parsingObj(testcase10);
// const test11 = parsingObj(testcase11);
// const test12 = parsingObj(testcase12);

// const test13 = parsingObj(testcase13);
// const test14 = parsingObj(testcase14);
const test15 = parsingObj(testcase15);

// const errorTest1 = parsingObj(errorcase1); // BLOCK ERROR
// const errorTest2 = parsingObj(errorcase2); // BLOCK ERROR
// const errorTest3 = parsingObj(errorcase3); // BLOCK ERROR
// const errorTest4 = parsingObj(errorcase4); // BLOCK ERROR

// const errorTest5 = parsingObj(errorcase5); // TOKEN ERROR
// const errorTest6 = parsingObj(errorcase6); // TOKEN ERROR
// const errorTest7 = parsingObj(errorcase7); // TOKEN ERROR

console.log(JSON.stringify(test15, null, 2));