const dataType = {
  array: 'Array Type',
  object: 'Object Type',
  objectKey: 'Object Key',
  arrayObj: 'Array Object Type',
  number: 'Number Type',
  string: 'String Type',
  null: 'Null Type'
};

const booleanType = {
  true: 'Boolean True',
  false: 'Boolean False'
}

const ERROR_MSG = {
  BLOCK_ERROR: 'BLOCK ERROR',
  TYPE_ERROR: '알 수 없는 타입입니다.',
  COMMA_ERROR: '올바른 문자열이 아닙니다.'
};

class DataStructure {
  constructor(type, value, key) {
    this.type = type;
    this.key = key;
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


class CheckError {
  checkBlockError(arrWord) {
    let bracketPoint = 0;
    const splitWord = arrWord.split('');
    const matchOpenCase = ['['];
    const matchCloseCase = [']'];

    splitWord.forEach(matchCase => {
      if (matchOpenCase.indexOf(matchCase) > -1) bracketPoint++;
      else if (matchCloseCase.indexOf(matchCase) > -1) {
        if (bracketPoint === 0) throw new Error(ERROR_MSG.BLOCK_ERROR);
        bracketPoint--;
      }
    });
    if (bracketPoint === 0) return true;
    throw new Error(ERROR_MSG.BLOCK_ERROR);
  }

  checkNumberError(temp) {
    if (temp.match(/[0-9]\D|\D[0-9]/)) throw new Error(ERROR_MSG.TYPE_ERROR + "\nERROR_VALUE: " + temp);
  }

  checkCommaError(temp) {
    if (temp.match(/['"]/m)) {
      let commaPoint = 0;
      const splitToken = temp.split('');
      const matchCommaCase = ['"', "'"];

      splitToken.forEach(matchCase => {
        if (matchCommaCase.indexOf(matchCase) > -1) commaPoint++;
        else if (matchCommaCase.indexOf(matchCase) > -1) commaPoint--;
      });
      if (commaPoint % 2 !== 0) throw new Error(ERROR_MSG.COMMA_ERROR + "\nERROR_VALUE: " + temp);
    }
  }

  checkObjectError(temp) {
    if (/['".&^%$#@!*()]/m.test(temp)) throw new Error(ERROR_MSG.TYPE_ERROR + "\nERROR_VALUE: " + temp);
  }
}

class CheckDataType {
  constructor() {
    this.error = new CheckError();
  }
  getDataType(value) {
    if (this.isStringType(value)) return new DataStructure(dataType.string, value.trim());
    if (this.isNumberType(value)) return new DataStructure(dataType.number, value.trim());
    if (this.isBooleanType(value)) {
      if (value === 'true') return new DataStructure(booleanType.true, true);
      else return new DataStructure(booleanType.false, false);
    } else {
      return new DataStructure(dataType.null, null)
    }
  }

  isArrayOrObjectType(value) {
    this.error.checkObjectError(value);
    if (value === '[') return new DataStructure(dataType.array, dataType.arrayObj)
    else if (/\{/m.test(value)) return new DataStructure(dataType.object, undefined, value.substring(1, value.length - 1).trim());
    else if (value.match(/\:/)) return new DataStructure(dataType.object, undefined, value.substring(0, value.length - 1));
  }

  isBooleanType(temp) {
    return temp === 'true' || temp === 'false';
  }

  isStringType(value) {
    this.error.checkCommaError(value);
    return /[\'|\"]/.test(value);
    // return value.match(/[\'|\"]/);
  }

  isNumberType(temp) {
    this.error.checkNumberError(temp);
    return /^(?=.*[0-9]).*$/m.test(temp);
  }

  isObjectType(value, temp) {
    if (value === ':') {
      this.error.checkObjectError(temp)
      return temp.match(/^[\{a-zA-Z]*$/m);
    }
  }
}

function isCommaOrCloseOrColonBrackets(value) {
  return isCloseBrackets(value) || value === ',';
}

function isOpenBracketsOrObject(value) {
  if (!/['"]/.test(value)) {
    const openBrackets = ['['];
    return openBrackets.indexOf(value) > -1 || /([{a-zA-Z:])|([a-zA-Z:])/.test(value);
  }
}

function isCloseBrackets(value) {
  const closeBrackets = [']', '}'];
  return closeBrackets.indexOf(value) > -1;
}

// parsing 기능
function stackData(strData) {
  const checkType = new CheckDataType();
  const stack = new Stack();
  let temp = '';

  for (let value of strData) {
    if (isOpenBracketsOrObject(value)) {
      temp = stack.addData(checkType.isArrayOrObjectType(value));
    } else if (isCloseBrackets(value)) {
      temp = stack.pushChild(stack.popData());
    } else {
      temp = stack.pushChild(checkType.getDataType(value));
    }
  }
  temp ? temp : temp = stack;
  return temp;
}

function getTokenizer(data) {
  const tokenArr = [];
  let token = '';
  let isStrComma = false;

  for (value of data) {
    if (isStrComma) {
      if (value === "'") isStrComma = !isStrComma;
      token += value;
    } else if (value === ',') {
      tokenArr.push(token.trim());
      token = '';
    } else if (value === '[' || value === ':') {
      token += value;
      tokenArr.push(token.trim());
      token = '';
    } else if (value === ']' || value === '}') {
      tokenArr.push(token.trim());
      token = '';
      token += value;
    } else {
      if (value === "'") isStrComma = !isStrComma;
      token += value;
    }
  }
  tokenArr.push(token.trim());
  return tokenArr;
}

function parsingObj(strData) {
  const error = new CheckError();
  const isError = error.checkBlockError(strData);

  if (isError) {
    const filterData = getTokenizer(strData);
    const parsingResult = {
      type: dataType.array,
      child: stackData(filterData)
    };
    return parsingResult;
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
const testcase9 = "[1 ,[[12, {keyName:[1, {firstKey:2, secondKey: 3},'world']}], 12],'2']";
const testcase10 = "[1,[[2, {inKey:[1, {firstKey:11, secondKey:'tes13@'}, 'test']}], null], true]";
const testcase11 = "[{name: '[ 1 ]'}]";
const testcase12 = "[{name: 'c r o n           g '}]";


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


const result = parsingObj(testcase11);
console.log(JSON.stringify(result, null, 2));

// const testFilter = getTokenizer(testcase12);
// console.log(JSON.stringify(testFilter, null, 2));