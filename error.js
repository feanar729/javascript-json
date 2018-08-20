const ERROR_MSG = {
  BLOCK_ARRAY_ERROR: '정상적으로 종료되지 않은 배열이 있습니다.',
  BLOCK_OBJECT_ERROR: '정상적으로 종료되지 않은 객체가 있습니다.',
  KEY_NAME_ERROR: '올바르지 않은 KEY NAME 입니다.',
  MISS_COLON_ERROR: "':' 이 누락된 객체표현이 있습니다.",
  ARRAY_KEY_ERROR: "배열에는 키값을 설정할 수 없습니다.",
  TYPE_ERROR: '알 수 없는 타입입니다.',
  COMMA_ERROR: '올바른 문자열이 아닙니다.'
};

exports.CheckError = class CheckError {
  checkBlockError(arrWord) {
    let arrBracketPoint = 0;
    let objBracketPoint = 0;
    const splitWord = arrWord.split('');
    const requisite = arrBracketPoint === 0 && objBracketPoint === 0;

    arrBracketPoint = this.checkArrBracket(splitWord, arrBracketPoint);
    objBracketPoint = this.checkObjBracket(splitWord, objBracketPoint);
    if (requisite) return true;
  }

  checkArrBracket(splitWord, arrBracketPoint) {
    const openArrCase = '[';
    const closeArrCase = ']';

    splitWord.forEach(matchCase => {
      if (openArrCase === matchCase) arrBracketPoint++;
      else if (closeArrCase === matchCase) {
        if (arrBracketPoint === 0) throw new Error(ERROR_MSG.BLOCK_ARRAY_ERROR);
        arrBracketPoint--;
      }
    });
    if (arrBracketPoint !== 0) throw new Error(ERROR_MSG.BLOCK_ARRAY_ERROR);
    return arrBracketPoint;
  }

  checkObjBracket(splitWord, objBracketPoint) {
    const openObjCase = '{';
    const closeObjCase = '}';

    splitWord.forEach(matchCase => {
      if (openObjCase === matchCase) objBracketPoint++;
      else if (closeObjCase === matchCase) {
        if (objBracketPoint === 0) throw new Error(ERROR_MSG.BLOCK_OBJECT_ERROR);
        objBracketPoint--;
      }
    });
    if (objBracketPoint !== 0) throw new Error(ERROR_MSG.BLOCK_OBJECT_ERROR);
    return objBracketPoint;
  }

  checkNumberError(value) {
    if (value.match(/[0-9]\D|\D[0-9]/)) throw new Error(ERROR_MSG.TYPE_ERROR + "\nERROR_VALUE: " + value);
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

  checkObjKeyError(value) {
    if (/['".&^%$#@!*()]/m.test(value)) throw new Error(ERROR_MSG.KEY_NAME_ERROR + "\nERROR_VALUE: " + value);
  }

  checkExpectedObjToken(value) {
    if (value) throw new Error(ERROR_MSG.MISS_COLON_ERROR + "\nTOKEN: " + value);
  }
}