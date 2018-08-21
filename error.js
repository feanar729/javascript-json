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
    const splitWord = arrWord.split('');

    const isAllArrBracket = this.checkArrBracket(splitWord);
    const isAllObjBracket = this.checkObjBracket(splitWord);
    if (isAllArrBracket === true && isAllObjBracket === true) return true;
  }

  checkArrBracket(splitWord) {
    const OpenArrCase = '[';
    const CloseArrCase = ']';
    let arrBracketPoint = 0;

    splitWord.forEach(matchCase => {
      if (OpenArrCase === matchCase) arrBracketPoint++;
      else if (CloseArrCase === matchCase) {
        if (arrBracketPoint === 0) throw new Error(ERROR_MSG.BLOCK_ARRAY_ERROR);
        arrBracketPoint--;
      }
    });
    if (arrBracketPoint !== 0) throw new Error(ERROR_MSG.BLOCK_ARRAY_ERROR);
    else return true;
  }

  checkObjBracket(splitWord) {
    const OpenObjCase = '{';
    const CloseObjCase = '}';
    let objBracketPoint = 0;

    splitWord.forEach(matchCase => {
      if (OpenObjCase === matchCase) objBracketPoint++;
      else if (CloseObjCase === matchCase) {
        if (objBracketPoint === 0) throw new Error(ERROR_MSG.BLOCK_OBJECT_ERROR);
        objBracketPoint--;
      }
    });
    if (objBracketPoint !== 0) throw new Error(ERROR_MSG.BLOCK_OBJECT_ERROR);
    else return true;
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

  checkArrKeyError(lastData, child) {
    if (lastData.type === 'Array_Type' && child.key) throw new Error(ERROR_MSG.ARRAY_KEY_ERROR);
  }
}