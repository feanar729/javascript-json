const ERROR_MSG = {
  BLOCK_ARRAY_ERROR: '정상적으로 종료되지 않은 배열이 있습니다.',
  BLOCK_OBJECT_ERROR: '정상적으로 종료되지 않은 객체가 있습니다.',
  TYPE_ERROR: '알 수 없는 타입입니다.',
  COMMA_ERROR: '올바른 문자열이 아닙니다.',
  BLOCK_ERROR: '올바르지 않는 괄호'
};

exports.CheckError = class CheckError {
  checkBlockError(arrWord) {
    let bracketPoint = 0;
    const splitWord = arrWord.split('');
    const matchOpenCase = ['[', '{'];
    const matchCloseCase = [']', '}'];

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

  checkCommaError(value) {
    if (value.match(/['"]/m)) {
      let commaPoint = 0;
      const splitToken = value.split('');
      const matchCommaCase = ['"', "'"];

      splitToken.forEach(matchCase => {
        if (matchCommaCase.indexOf(matchCase) > -1) commaPoint++;
        else if (matchCommaCase.indexOf(matchCase) > -1) commaPoint--;
      });
      if (commaPoint % 2 !== 0) throw new Error(ERROR_MSG.COMMA_ERROR + "\nERROR_VALUE: " + value);
    }
  }

  checkObjKeyError(temp) {
    if (/['".&^%$#@!*()]/m.test(temp)) throw new Error(ERROR_MSG.TYPE_ERROR + "\nERROR_VALUE: " + temp);
  }
}