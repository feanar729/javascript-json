exports.expect = (result) => new Expect(result);
class Expect {
  constructor(answer) {
    this.answer = answer;
  }

  toBe(result) {
    const rightComment = 'test 통과';
    const wrongComment = 'FAIL(targetValue is ' + this.answer + ', expectValue is ' + result + ')';
    if (result === this.answer) console.log(rightComment);
    else if (this.answer === undefined) console.log(wrongComment);
    else console.log(wrongComment);
  }
};