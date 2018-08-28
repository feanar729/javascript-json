# Array Parser / Array Parser Test code 문서화
## Array Parser
### 1. 기능
- 문자열을 통해 파싱된 토큰 단위의 데이터를 타입 판별
- 토큰에 에러사항에 해당된 토큰이 있을 시 에러 처리
- 해당 parsing된 결과 값의 데이터 타입의 개수를 누적 통계로 출력 

### 2. Parser 과정 시각화 
- parsing 과정
getTokenizer => stackData => Token된 데이터 구조 구분(Method: getDataStructure, isArrayOrObjectType) => stackData 종료 조건시 result에 반환.

#### getTokenizer
- parsing을 진행할 문자열을 차례대로 Token화 진행 및 배열에 넣어 반환
  > input: ex)'[1, 'park', [true, {name: 'p'}]];
  > output: '[ '[', '1', '"park"', '[', 'true', '{', 'name:'p', '}', ']', ']' ]'

#### stackData
- Stack Class에 위에 getTokenizer의 결과 값을 for-of로 파악해 token값의 타입이 구분된 데이터 구조를 쌓아 넣는다.
- Stack 과정 
  - token Value가 `[` 시 

    ![Stack_1](https://github.com/feanar729/javascript-json/blob/STEP9/image/Stack_1.png){ : width="100" height="100"}

  - token Value가 `1` 시 

    ![Stack_2](https://github.com/feanar729/javascript-json/blob/STEP9/image/Stack_2.png){ : width="100" height="100"}

    ![Stack_3](./../image/Stack_3.png)  

  - token Value가 `"park"` 시 

    ![Stack_4](./../image/Stack_4.png)

    ![Stacj_5](./../image/Stack_5.png)

  - token Value가 `[` 시 

    ![Stack_6](./../image/Stack_6.png)

  - token Value가 `true` 시 

    ![Stack_7](./../image/Stack_7.png)
    
    ![Stack_8](./../image/Stack_8.png) 

  - token Value가 `{` 시 

    ![Stack_9](./../image/Stack_9.png) 

  - token Value가 `name:'p'` 시 

    ![Stack_10](./../image/Stack_10.png)

    ![Stack_11](./../image/Stack_11.png) 

  - token Value가 `}` 시 

    ![Stack_12](./../image/Stack_12.png)

  - token Value가 `]` 시
  
    ![Stack_13](./../image/Stack_13.png)

  - token Value가 `]` 시

    ![Stack_14](./../image/Stack_14.png)

    ![Stack_15](./../image/Stack_15.png)

  - 마지막 stack은 비워지고 result에 담겨져 반환 

### 3. 결과물
- Input
```
ex_1) "[1, 'park', [true, {name: 'p'}]]"
ex_2) "[{keyName:'name', value:3213, child:[1,true,false,null,['test']]}]"
```

- Output
- ex_1
  ```
  {
    "type": "ARRAY",
    "value": "ARRAY OBJECT",
    "child": [
      {
        "type": "NUMBER",
        "value": "1",
        "child": []
      },
      {
        "type": "STRING",
        "value": "'park'",
        "child": []
      },
      {
        "type": "ARRAY",
        "value": "ARRAY OBJECT",
        "child": [
          {
            "type": "BOOLEAN",
            "value": true,
            "child": []
          },
          {
            "type": "OBJECT",
            "child": [
              {
                "type": "STRING",
                "key": "name",
                "value": "'p'",
                "child": []
              }
            ]
          }
        ]
      }
    ]
  }
  ARRAY Type: 2개
  OBJECT Type: 1개
  NUMBER Type: 1개
  STRING Type: 2개
  NULL Type: 0개
  BOOLEAN Type: 1개

  배열: 2개 객체: 1개 숫자: 1개 문자: 2개 Boolean: 1개 Null: 0개
  ```
- ex_2
  ```
  {
    "type": "ARRAY",
    "value": "ARRAY OBJECT",
    "child": [
      {
        "type": "OBJECT",
        "child": [
          {
            "type": "STRING",
            "key": "keyName",
            "value": "'name'",
            "child": []
          },
          {
            "type": "NUMBER",
            "key": "value",
            "value": "3213",
            "child": []
          },
          {
            "type": "ARRAY",
            "key": "child",
            "value": "ARRAY OBJECT",
            "child": [
              {
                "type": "NUMBER",
                "value": "1",
                "child": []
              },
              {
                "type": "BOOLEAN",
                "value": true,
                "child": []
              },
              {
                "type": "BOOLEAN",
                "value": false,
                "child": []
              },
              {
                "type": "NULL",
                "value": null,
                "child": []
              },
              {
                "type": "ARRAY",
                "value": "ARRAY OBJECT",
                "child": [
                  {
                    "type": "STRING",
                    "value": "'test'",
                    "child": []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
  ARRAY Type: 3개
  OBJECT Type: 1개
  NUMBER Type: 2개
  STRING Type: 2개
  NULL Type: 1개
  BOOLEAN Type: 2개

  배열: 3개 객체: 1개 숫자: 2개 문자: 2개 Boolean: 2개 Null: 1개
  ```

### 4. 파일별 기능
#### parser.js
- tokenizing된 데이터의 문자열에 따라 stack에 데이터 타입(=DataStructure) 객체를 쌓음
- DataStructure 구조
  ```
  DataStructure {
    type: 데이터 타입 ex) Array, Object, Primitive Data...
    key: Key가 있을 시 / Key 값
    value: 데이터 값
    child: 비어있을 시 [] / 값이 있다면 child: [ type: .... ] 
  }
  ```
- Class 별 Method
  - Parser 클래스
    - parsingObj
      > 기능 : 문자열 데이터에서 배열, 객체등의 문자열 괄호가 올바르면 `tokenizer & parsing 진행`, 아니면 `ERROR 출력`
      > 반환 : parsing된 결과 값
    - isOpenBrackets
      > 기능 : 열린 괄호 ( '[' , '{' )에 해당 되는 지 판별
      > 반환 : true / false 
    - isCloseBrackets
      > 기능 : 닫힌 괄호 ( ']' , '}' )에 해당 되는 지 판별
      > 반환 : true / false 
    - stackData
      > 기능 : token단위의 열린 괄호와 데이터 발견시 해당 데이터 타입 판별 및 stack에  닫힌 괄호가 나올 때까지 반복 진행
      > 반환 : Stack Class에 쌓인 데이터 값
    - showCalDataType
      > 기능 : parsing 된 결과 값의 데이터 타입별 개수의 누적통계 결과 출력
      > 반환 : 누적 된 데이터 타입 결과 내용
  - Stack 클래스
    - addData
      > 기능 : stack 배열에 DataStructure를 stack에 push 
    - popData
      > 기능 : stack에 쌓인 데이터를 pop하게 함
      > 반환 : pop된 데이터 보유
    - pushChild
      > 기능 : 
      > 1) stack에 child가 있다면 마지막 stack에 쌓인 child에 push 
      > 2) child가 없다면 return 진행
      > 3) DataStructure 객체에서 'type: ARRAY'의 'key'값 `보유시 error` 출력

#### tokenizer.js
- 문자열 데이터를 분석하기 위한 데이터 token화 진행 기능 
- token단위로 나눈 데이터는 배열에 담겨 반환되고 parsing과정으로 넘어감 
- 문자열의 token 구분 및 생성 구분 단위는 ` " `, ` , `, ` [ `, ` { `, ` } `, ` ] `, ` " `로 나뉨
  - ex) '[1,2,'3',true,null]'
  - 결과: `['[', '1', '2', '"3"', 'true', 'null', ']' ]` 

#### checkDataType.js
- tokenizing된 데이터의 타입을 구분 및 DataStructure Class에 기입 반환
- Class 별 Method
  - getDataStructure
    > 기능 : token 값의 데이터 타입을 구분  
    > 반환 : DataStructure의 key / value 반환 => 기본 자료형 token시 : type, value, child / object 타입 token시 getObjKeyValType() Method로 
  - checkPrimitiveDataType
    > 기능 : token의 object value 값에서 기본 자료형의 타입 구분 
    > 반환 : 기본 자료형 타입만 ( String, Number, Null, Boolean ) 반환
  - isArrayOrObjectType
    > 기능 : token 데이터 값이 배열 괄호, 객체 괄호 시 각각의 타입 구분 
    > 반환 : DataStructure - Array, Array Obj / Object Type, child
  - getObjKeyValType
    > 기능 : Key:Value token시 Object 타입의 Key Name과 Value의 데이터 타입(기본자료형, 배열, 객체) 구분, Object DataStructure의 child에 push
    > 반환 : DataStructure - Object Type, child / Key name / value Type, value, child(배열, 객체시)
  - isBooleanType
    > 기능 : Token 값 Boolean Type 구분 
    > 반환 : true / false
  - isStringType
    > 기능 : Token 값 String Type 구분
    > 반환 : true / false
  - isNumberType
    > 기능 : Token 값 Number Type 구분
    > 반환 : true / false
  - isObjKeyValueType
    > 기능 : Token 값 Obj Key:value 구분 ex) name: 'park', first: 1 ....
    > 반환 : true / false
  - isNullType
    > 기능 : Token 값 Null Type 구분
    > 반환 : true / false  

#### error.js
- error 조건에 해당 되는 데이터 발견 시 ERROR 메시지 출력
- Class 별 Method
  - checkBlockError
    > 기능 : 배열과 객체의 열린 닫힘 괄호가 짝지어져 올바르게 되어 있는지 파악
    > 반환 : 조건시 각 괄호가 올바르지 않다는 ERROR 메세지 출력 / 올바르면 true 반환
    - checkArrBracket => 배열 괄호 파악
    - checkObjBracket => 객체 괄호 파악
  - checkNumberError
    > 기능 : 숫자 타입 외에 다른 문자가 있는지 파악
    > 반환 : 조건시 알 수 없는 타입 ERROR 메세지 출력 
  - checkQuotesError
    > 기능 : 문자열 기호가 올바르게 짝지어져 있는지 파악 
    > 반환 : 조건시 올바르지 않은 문자열 ERROR 메세지 출력
  - checkObjKeyError
    > 기능 : key 값에 특수한 기호가 섞여 있는지 파악 
    > 반환 : 조건시 올바르지 않은 Key Name ERROR 메세지 출력
  - checkObjValueError
    > 기능 : Value Token값에 문자열 기호가 없는 value인지 파악  
    > 반환 : 조건시 올바른 문자열이 아니라는 ERROR 메세지 출력 
  - checkExpectedObjToken
    > 기능 : Token 값이 Object `:`이 없는 잘못된 Token값인지 파악  
    > 반환 : 조건시 COLON이 없다는 ERROR 메세지 출력
  - checkArrKeyError
    > 기능 : Array 타입시 Key 값을 보유했는지 파악 
    > 반환 : 조건시 배열에는 Key 값을 설정할 수 없다는 ERROR 메세지 출력

#### count.js
- parsing 된 결과 값의 데이터 타입에 따라 개수 누적 및 통계 출력
- Class 별 Method
  - updateChildTypeCount
    > 기능 : parsing된 결과 값의 child에서 Data Type 파악 및 Type별 개수 누적
  - updateTypeCount
    > 기능 : parsing된 결과 값에서 Data Type 파악 및 Type별 개수 누적
  - printTypeResult
    > 기능 : 누적 된 Data Type 별 개수를 출력
    > 반환 : 누적 된 Data Type 별 수치 문자열 반환

------------------------------------------------------------------------------

## Array Parser Test Code

### 1. 기능
- Array Parser의 주요 기능 단위로 TEST 코드를 제작
- 각각의 기능이 목적에 맞게 올바르게 작동 되는지 test를 진행 일치시 `ok`출력 불일치시 `예상값과 결과값`을 비교
- test함수에 비교된 결과값을 출력
- Error, Parser, PrimitiveData Type 판별, Tokenizer로 구분

### 2. Input / Output
ex) test_error.js
- Input
```
  errorcase = '[[[p, []]]';
  예상결과값 = "정상적으로 종료되지 않은 배열이 있습니다.";
```

- Output
```
- 일치시
  "배열 괄호가 올바르지 않는다면 Error 출력" 
  OK

- 불일치시
 FAIL(targetValue is "정상적으로 종료되지 않은 배열이 있습니다.",
  expectValue is "....")
```

### 3. 파일별 기능 
#### test_error.js
- error 기능이 조건에 맞게 출력 되는지 확인

#### test_parser.js
- 문자열을 넣을시 parsing 된 결과가 목적에 맞게 출력 되는지 확인

#### test_PrimitiveData.js
- 기본자료형 타입 판별 기능이 목적에 맞게 출력 되는지 확인

#### test_Tokenizer.js
- tokenizer 기능이 목적에 맞게 출력 되는지 확인

#### expect.js
- 각 기능을 test_error의 경우 try / catch로 그 외는 각 Class Method에 기능 작동시 결과 값을 설정한 예상 값과 비교. 
- 일치시 `ok` 불일치시 test코드의 `예상값과 결과값`을 함께 출력
- Class Method
  - toEqual
    > 설정된 예상 값과 기능에서 출력된 결과 값이 일치하는지 아닌지 판별하는 기능
    > result: 결과값
    > answer: 설정 된 예상 값