# javascript-json

레벨 2

## STEP 1

- ArrayParser 함수를 만든다.
- 배열안에는 숫자데이터만 존재한다.
- 배열형태의 문자열을 token 단위로 해석한 후, 이를 분석한 자료구조를 - 만든다.
- 정규표현식 사용은 최소한으로 한다.(token 의 타입체크에 한해 사용가능)

> Result
```
{ type: 'array',
  child:
    [ 
      { type: 'number', value: '123', child: [] },
      { type: 'number', value: '22', child: [] },
      { type: 'number', value: '33', child: [] }
    ]
}
```

## STEP 2

- 배열안에 배열이 있는 경우도 분석한다.

  > var s = "[123,[22],33]";

- 중첩된 배열 원소도 역시, 숫자데이터만 존재한다.
- 중첩된 결과는 child 부분에 추가해서 결과가 표현돼야 한다.

실행결과

```
var str = var s = "[123,[22],33. [1,2,3,4,5]]";
var result = ArrayParser(str);
console.log(JSON.stringify(result, null, 2));
//배열안의 배열 같은경우, 다음과 같이 표현될 수 있다(예시)
{ type: 'array', value: ArrayObject, child: [{type:'number', value:22, child:[]}] }
```

## STEP 3

- 무한중첩 구조도 동작하게 한다. [[[[[]]]]]
- 배열의 원소에는 숫자타입만 존재한다.
- 복잡한 세부로직은 함수로 분리해본다.
- 중복된 코드역시 함수로 분리해서 일반화한다.
- 프로그래밍 설계를 같이 PR한다.
- hint : 중첩문제를 풀기 위해 stack구조를 활용해서 구현할 수도 있다.

실행결과
```
var str = "[123,[22,23,[11,[112233],112],55],33]";
var result = ArrayParser(str);
console.log(JSON.stringify(result, null, 2)); 
//중첩된 배열을 분석했음으로, 결과 역시 중첩된 객체형태이다.
```

## STEP 4

- 숫자타입이외에 string, boolean, null 타입도 지원하도록 구현한다.
> ['1a3',[null,false,['11',[112233],112],55, '99'],33, true]"

- 올바른 문자열이 아닌 경우 오류를 발생한다. (아래 실행결과 참고)
- 타입체크를 정규표현식을 사용하는 경우, backreference를 활용하는 것을 추천.
- 복잡한 세부로직은 함수로 분리해본다.
- 중복된 코드역시 함수로 분리해서 일반화한다.

실행결과
```
var s = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
var result = ArrayParser(str);
console.log(JSON.stringify(result, null, 2)); 

var s = "['1a'3',[22,23,[11,[112233],112],55],33]";  //'1a'3'은 올바른 문자열이 아닙니다.
var result = ArrayParser(str);
==>  //'1a'3'은 올바른 문자열이 아닙니다.

var s = "['1a3',[22,23,[11,[112233],112],55],3d3]";  // 3d3은 알수 없는 타입입니다
var result = ArrayParser(str);
==> // 3d3은 알수 없는 타입입니다
```

## STEP 5

- Object 타입 ( { key: value} ) 도 지원한다.
- 배열안에 object, object안에 배열이 자유롭게 포함될 수 있다.
- 지금까지의 코드를 리팩토링한다.
- 복잡한 세부로직은 반드시 함수로 분리해본다.
- 최대한 작은 단위의 함수로 만든다.
- 중복된 코드역시 함수로 분리해서 일반화한다.
- 객체형태의 class로 만든다.

실행결과
```
var s = "['1a3',[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99'],
{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]";

var result = ArrayParser(str);
console.log(JSON.stringify(result, null, 2));
```