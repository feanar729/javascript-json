exports.expect = (answer) => new Expect(answer);

class Expect {
  constructor(answer) {
    this.answer = answer;
  }

  toEqual(checkData) {
    const answer = JSON.stringify(this.answer, null, 2);
    const result = JSON.stringify(checkData, null, 2);

    const rightComment = 'test 통과';
    const wrongComment = 'FAIL(targetValue is ' + answer + ', expectValue is ' + result + ')';
    if (result === answer) return rightComment;
    else if (checkData === undefined) return wrongComment;
    else return wrongComment;
  }
};