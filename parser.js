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
}

class CheckDataType {
  constructor() {
    this.error = new CheckError();
  }
  getDataType(value, temp) {
    if (this.isObjectType(value, temp)) return new DataStructure(dataType.objectKey, undefined, temp);
    if (this.isStringType(temp)) return new DataStructure(dataType.string, temp.substring(1, temp.length - 1));
    if (this.isNumberType(temp)) return new DataStructure(dataType.number, temp);
    if (this.isBooleanType(temp)) {
      if (temp === 'true') return new DataStructure(booleanType.true, true);
      else return new DataStructure(booleanType.false, false);
    } else {
      return new DataStructure(dataType.null, null)
    }
  }

  isArrayOrObjectType(value) {
    if (value.match(/\[/)) return new DataStructure(dataType.array, dataType.arrayObj)
    else if (value.match(/\{/)) return new DataStructure(dataType.object);
  }

  isBooleanType(temp) {
    return temp === 'true' || temp === 'false';
  }

  isStringType(temp) {
    this.error.checkCommaError(temp);
    return temp.match(/^['"].*$/m);
  }

  isNumberType(temp) {
    this.error.checkNumberError(temp);
    return temp.match(/^(?=.*[0-9]).*$/m);
  }

  isObjectType(value, temp) {
    return temp.match(/^[a-zA-Z]*$/m) && value === ':';
  }
}

function isCommaOrCloseOrColonBrackets(value) {
  return isCloseBrackets(value) || value === ',' || value === ':';
}

function isOpenBrackets(value) {
  const openBrackets = ['[', '{'];
  return openBrackets.indexOf(value) > -1;
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
    if (isOpenBrackets(value)) {
      stack.addData(checkType.isArrayOrObjectType(value));
    } else if (isCommaOrCloseOrColonBrackets(value)) {
      temp ? stack.pushChild(checkType.getDataType(value, temp)) : null;
      temp = '';
      if (isCloseBrackets(value)) temp = stack.pushChild(stack.popData());
    } else {
      temp = temp + value.trim();
    }
  }
  return temp;
}

function parsingObj(strData) {
  const error = new CheckError();
  const isError = error.checkBlockError(strData);

  if (isError) {
    const parsingResult = {
      type: dataType.array,
      child: stackData(strData)
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
const testcase10 = "[1,[[2, {keyName:[1, {inKey:22}, 'test']}], null], true]";

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

const result = parsingObj(testcase8);
console.log(JSON.stringify(result, null, 2));