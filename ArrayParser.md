# Array Parser / Array Parser Test code 문서화
## Array Parser
### 기능
- 문자열을 통해 파싱된 토큰단위의 데이터를 타입 판별
- 토큰에 에러사항에 해당된 토큰이 있을 시 에러 처리
- 해당 parsing된 결과 값의 데이터 타입의 개수를 누적 통계로 출력 

#### 파일별 기능
##### parser.js
>
##### tokenizer.js
>
##### checkDataType.js
>
##### error.js
> 
##### count.js
> parsing 된 결과 값의 데이터 타입에 따라 개수 누적 및 통계 출력

### 과정

### 과정 시각화 

### 결과물

------------------------------------------------------------------------------

## Array Parser Test Code
### 기능
- Array Parser의 주요 기능 단위로 TEST 코드를 제작
- 각각의 기능이 목적에 맞게 올바르게 작동 되는지 test를 진행 일치시 `ok`출력 불일치시 `예상값과 결과값`을 출력
- Error, Parser, PrimitiveData Type 판별, Tokenizer로 구분

#### 파일별 기능 
##### test_error.js
> error 기능이 올바르게  
##### test_parser.js
##### test_PrimitiveData.js
##### test_Tokenizer.js

##### expect.js
> parsing 된 결과 값의 데이터 값을 비교 일치시 ok 불일치시 test코드의 예상값과 결과값을 동시에 출력
- 
### 과정

### 과정 시각화 

### 결과물
