exports.getTokenizer = function (data) {
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
    } else if (value === '[' || value === '{') {
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