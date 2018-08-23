exports.Count = class Count {
  constructor() {
    this.type = {
      ARRAY: 0,
      OBJECT: 0,
      NUMBER: 0,
      STRING: 0,
      NULL: 0,
      BOOLEAN: 0
    }
  }

  updateChildTypeCount(child) {
    if (child.length === 0) return;
    for (let value of child) {
      this.type[value.type]++;
      this.updateChildTypeCount(value.child);
    }
  }

  updateTypeCount(result) {
    for (let key in this.type) {
      if (result.type === key) this.type[key]++;
    }
    if (result.child) this.updateChildTypeCount(result.child);
  }

  printTypeResult(result) {
    this.updateTypeCount(result);

    for (let key in this.type) {
      console.log(`${key} Type: ${this.type[key]}개`);
    }

    const resultAllType =
      `배열: ${this.type.ARRAY}개` + ` 객체: ${this.type.OBJECT}개` +
      ` 숫자: ${this.type.NUMBER}개` + ` 문자: ${this.type.STRING}개` +
      ` Boolean: ${this.type.BOOLEAN}개` + ` Null: ${this.type.NULL}개`;
    return resultAllType;
  }
}