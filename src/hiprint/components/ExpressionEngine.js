"use strict";
var _context = {
    data:[]
};
/**
 * 表达式引擎
 */
class ExpressionEngine {
    static execute(expstr, context) {
        //const func = new Function("context", "with (context) { return " + expstr + "; }") {
        if (!expstr){
            return "";
        }
        if (expstr.startsWith("=")){
            expstr = expstr.substring(1);
        }
        _context = context;
        let ret = eval(expstr);
        return ret;
    }
}

/**
 * 最小值
 * @param {*} fields 
 * @returns 
 */
function MIN(fields, isAll){
    const data = isAll ? _context.allData : _context.data ;
    if (data.length == 0){
        return 0;
    }
    if (!fields){
        return 0;
    }
    let arrFields = fields.split(",");
    let obj = data.reduce((lastObj, currentObj) => {
        const currentSum = _sum(currentObj, arrFields);
        const lastSum = _sum(lastObj, arrFields);
        return currentSum < lastSum ? currentObj : lastObj;
      });
    return _sum(obj, arrFields);
}

/**
 * 最大值
 * @param {*} fields 
 * @returns 
 */
function MAX(fields, isAll){
    const data = isAll ? _context.allData : _context.data ;
    if (data.length == 0){
        return 0;
    }
    if (!fields){
        return 0;
    }
    let arrFields = fields.split(",");
    let maxObj = data.reduce((lastObj, currentObj) => {
        const currentSum = _sum(currentObj, arrFields);
        const lastSum = _sum(lastObj, arrFields);
        return currentSum > lastSum ? currentObj : lastObj;
      });
    return _sum(maxObj, arrFields);
}

function SUM(fields, isAll){
    const data = isAll ? _context.allData : _context.data ;
    if (data.length == 0){
        return 0;
    }
    if (!fields){
        return 0;
    }
    let arrFields = fields.split(",");
    let sum = data.reduce((lastSum, currentObj) => {
        return lastSum + _sum(currentObj, arrFields);
      }, 0);
    return sum;
}

function AVG(fields, isAll){
    const data = isAll ? _context.allData : _context.data ;
    if (data.length == 0){
        return 0;
    }
    if (!fields){
        return 0;
    }
    let arrFields = fields.split(",");
    let sum = data.reduce((lastSum, currentObj) => {
        return lastSum + _sum(currentObj, arrFields);
      }, 0);
    return sum/data.length;
}

function COUNT(fields, isAll){
    const data = isAll ? _context.allData : _context.data ;
    if (data.length == 0){
        return 0;
    }
    fields = fields || "*";

    let arrFields = fields.split(",");
    let sum = data.reduce((lastSum, currentObj) => {
        if (fields == "*"){
            return lastSum + 1;
        }
        for (let i = 0; i < arrFields.length; i++){
            //0或空不计算
            if(!currentObj[arrFields[i]]){
                return lastSum;
            }
        }
        return lastSum + 1;
      }, 0);
    return sum;
}

function CN_MONEY(data, type){

}

function DATE_FORMAT(data, format){
    return data;
}

/**
 * 字段求和
 * @param {*} obj 
 * @param {*} arrFields 
 * @returns 
 */
function _sum(obj, arrFields){
    let num = 0;
    for (let i = 0; i < arrFields.length; i++){
        if(obj[arrFields[i]]){
            num += obj[arrFields[i]] * 1;
        }
    }
    return num;
}

export default ExpressionEngine;