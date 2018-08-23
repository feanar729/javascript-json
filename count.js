exports.Count = class Count {
  constructor() {
    this.type = {
      array: 0,
      object: 0,
      number: 0,
      string: 0,
      null: 0,
      boolean: 0
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
    let print = '';
    for (let key in this.type) {
      print = `${key}: ${this.type[key]}개`;
    }

    const resultCountType =
      `배열: ${this.type.array}개` + ` 객체: ${this.type.object}개` +
      ` 숫자: ${this.type.number}개` + ` 문자: ${this.type.string}개` +
      ` Boolean: ${this.type.boolean}개` + ` Null: ${this.type.null}개`;
    return resultCountType;
    // return print;
  }
}