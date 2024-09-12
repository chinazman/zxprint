"use strict";
import _hinnn from "./hinnn.js"
var _context = {
    rows:[],
    allRows:[],
    srcData:{}
};
var _regMap = {};
var _funcMap = {};
/**
 * 表达式引擎
 */
class ExpressionEngine {
    static execute(expstr, context) {
        if (!expstr){
            return "";
        }
        if (expstr.startsWith("=")){
            expstr = expstr.substring(1);
        }
        Object.assign(_context, context);
        try{
            let ret = _eval(expstr);
            return ret;
        }catch (error) {
            console.log(error);
            return "异常："+ error;
        }
    }
    /**
     * 注册一个函数到上下文对象
     *
     * @param {string} name - 要注册的函数名称
     * @param {function} func - 要注册的函数
     */
    static register(name, func){
        _regMap[name] = func;
    }

}

/**
 * 最小值
 * @param {*} fields 
 * @returns 
 */
function MIN(fields, isAll){
    const data = isAll ? _context.allRows : _context.rows ;
    if (data.length == 0){
        return 0;
    }
    if (!fields){
        return 0;
    }
    let obj = data.reduce((lastRow, row) => {
        const currentSum = _sum(row, fields);
        const lastSum = _sum(lastRow, fields);
        return currentSum < lastSum ? row : lastRow;
      });
    return _sum(obj, fields);
}

/**
 * 最大值
 * @param {*} fields 
 * @returns 
 */
function MAX(fields, isAll){
    const data = isAll ? _context.allRows : _context.rows ;
    if (data.length == 0){
        return 0;
    }
    if (!fields){
        return 0;
    }
    let maxObj = data.reduce((lastRow, row) => {
        const currentSum = _sum(row, fields);
        const lastSum = _sum(lastRow, fields);
        return currentSum > lastSum ? row : lastRow;
      });
    return _sum(maxObj, fields);
}

function SUM(fields, isAll){
    const data = isAll ? _context.allRows : _context.rows ;
    if (data.length == 0){
        return 0;
    }
    if (!fields){
        return 0;
    }
    let sum = data.reduce((lastSum, row) => {
        return lastSum + _sum(row, fields);
      }, 0);
    return sum;
}

function AVG(fields, isAll){
    const data = isAll ? _context.allRows : _context.rows ;
    if (data.length == 0){
        return 0;
    }
    if (!fields){
        return 0;
    }
    let sum = data.reduce((lastSum, row) => {
        return lastSum + _sum(row, fields);
      }, 0);
    return sum/data.length;
}

function COUNT(fields, isAll){
    const data = isAll ? _context.allRows : _context.rows ;
    if (data.length == 0){
        return 0;
    }
    let sum = data.reduce((lastSum, row) => {
        if (!fields || _eval(fields, row)){
            return lastSum + 1;
        }
        return lastSum;
      }, 0);
    return sum;
}
/**
 * 转大写汉字
 * @param {*} data 
 * @param {*} type 
 */
 function CN_MONEY(data, type){
    type = type === undefined ?  "9" : type+"";
    return _hinnn.toUpperCase(type, data);
}

/**
 * 转大写汉字
 * @param {*} data 
 * @param {*} type 
 */
function DATE_FORMAT(data, format){
    return _hinnn.dateFormat(data, format);
}

/**
 * 字段求和
 * @param {*} row 
 * @param {*} fields 
 * @returns 
 */
function _sum(row, fields){
    if (fields.startsWith("(")){
        return _eval(fields, row)*1;
    }else{
        return row[fields]*1;
    }
}

ExpressionEngine.register("MIN", MIN);
ExpressionEngine.register("MAX", MAX);
ExpressionEngine.register("SUM", SUM);
ExpressionEngine.register("AVG", AVG);
ExpressionEngine.register("COUNT", COUNT);
ExpressionEngine.register("CN_MONEY", CN_MONEY);
ExpressionEngine.register("DATE_FORMAT", DATE_FORMAT);
/**
 * 执行表达式
 * 有待优化，可以考虑将Function缓存
 * @param {*} expstr 
 * @param {*} row 
 * @returns 
 */
function _eval(expstr, row){
    if (!_funcMap[expstr]){
        let arr = [];
        Object.keys(_regMap).forEach(function(key) {
            arr.push("var "+key + "= regMap." + key);
        });
        arr.push("return " + expstr + ";");
        let varstr = arr.join(";");
        // console.log(varstr);
        _funcMap[expstr] = new Function("regMap", "rows","allRows","srcData","row","value",varstr);
    }
    return _funcMap[expstr](_regMap, _context.rows, _context.allRows, _context.srcData, row||_context.row, _context.value);

    //最好不用with
    // const func = new Function("context", "with (context) { return " + expstr + "; }")
}

export default ExpressionEngine;