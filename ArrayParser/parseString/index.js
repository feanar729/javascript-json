const {pipe} = require('../src/util/functionalUtil')
const {isString} = require('../src/util/typeCheck')
const { IdentityObjObject, IdentityObject} = require('../src/IdentityObject/IdentityObject')
const { makeIdObjPrimitiveType} = require('../src/makePrimitiveType/makePrimitiveType')
const {isArrayClosed, isObjClosed} = require('../src/checkClosed')
const splitItem = require('../src/splitItem/splitItem')


const trimed = str => str.trim()

const removeBracket = str => str.slice(1,str.length-1)

const hasEdgeValue = (str, first, last)=> str[0]===first || str[str.length-1]===last

const hasArrayBracketsEdge = str =>  hasEdgeValue(str, '[',']')

const hasObjBracketsEdge = str =>  hasEdgeValue(str, '{','}')

const checkClosedArrString = str => {
    if(isArrayClosed(str)) return parseObjandArray(str, 'array')
    throw new Error(`배열이 닫혀 있지 않습니다 ${str}`)
}

const checkClosedObjString = str => {
    if(isObjClosed(str)) return parseObjandArray(str, 'object')
    throw new Error(`객체가 닫혀 있지 않습니다 ${str}`)
}


const makeIdObjByType = str => {
    if(hasArrayBracketsEdge(str)) return checkClosedArrString(str)
    if(hasObjBracketsEdge(str)) return checkClosedObjString(str)
    return makeIdObjPrimitiveType(str)
  }

const addEachItemArrString = (ac, c)=> {
    c = trimed(c)
    const item = makeIdObjByType(c)
    ac.child.push(item)
    return ac;
}

const addEachItemObjString = (ac,c)=>{
    const divisor = c.indexOf(':')
    if(divisor===-1) throw Error(` : 이 없습니다.{${c}}`)
    const key = c.slice(0,divisor).trim()
    const value = c.slice(divisor+1).trim()
    ac.key = key;
    ac.value = makeIdObjByType(value)
    return ac;
}

const getResultToObjArrayString = arr => {
    const newArrayObj = new IdentityObject('array', 'ArrayObject')
    const result = arr.reduce(addEachItemArrString, newArrayObj)
    return result;
}

const getResultToObjObjString = arr => {
    const newObjObj = new IdentityObjObject() 
    const result = arr.reduce(addEachItemObjString, newObjObj)
    return result;
}

const makeItemList= pipe(removeBracket, splitItem)

const parseString = (str) => {
    if(!isString(str)) throw Error(`문자열로 값을 입력해주세요  현재값 :${str}`)
    str = str.trim()
    return makeIdObjByType(str)
}

const parseObjandArray = (str, type)=>{
    const methodsByType ={
        'object': {
            result: getResultToObjObjString,
        },
        'array': {
            result: getResultToObjArrayString,
        }
    }
    const result = pipe(makeItemList, methodsByType[type].result)(str)
    return result;
}


const str1 = "[1,2,3,4,5]";
const str2 = "[[1,2,3],[2],{a:'str', b:[1,2,3]},true, undefined, false]";
const str3 = "['1a3',[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]";


const sampleResult1 = parseString(str1);
const sampleResult2 = parseString(str2);
const sampleResult3 = parseString(str3);



console.log(sampleResult1)
console.log(sampleResult2)
console.log(sampleResult3)

console.log(JSON.stringify(sampleResult1, null, 2));
console.log(JSON.stringify(sampleResult2, null, 2));
console.log(JSON.stringify(sampleResult3, null, 2));


module.exports = {
    sampleResult1,
    sampleResult2,
    parseString,
}


