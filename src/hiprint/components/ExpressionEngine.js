"use strict";
import _hinnn from "./hinnn.js"
var _context = {
    rows:[],
    allRows:[],
    templateData:{}
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
function MIN(fields, isAll, precision){
    const data = isAll ? _context.allRows : _context.rows ;
    if (!data||data.length == 0){
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
    return ROUND(_sum(obj, fields), precision);
}

/**
 * 最大值
 * @param {*} fields 
 * @returns 
 */
function MAX(fields, isAll, precision){
    const data = isAll ? _context.allRows : _context.rows ;
    if (!data||data.length == 0){
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
    return ROUND(_sum(maxObj, fields), precision);
}

function SUM(fields, isAll, precision){
    const data = isAll ? _context.allRows : _context.rows ;
    if (!data||data.length == 0){
        return 0;
    }
    if (!fields){
        return 0;
    }
    let sum = data.reduce((lastSum, row) => {
        return lastSum + _sum(row, fields);
      }, 0);
    return ROUND(sum, precision);
}

function AVG(fields, isAll, precision){
    const data = isAll ? _context.allRows : _context.rows ;
    if (!data||data.length == 0){
        return 0;
    }
    if (!fields){
        return 0;
    }
    let sum = data.reduce((lastSum, row) => {
        return lastSum + _sum(row, fields);
      }, 0);
    return ROUND(sum/data.length, precision);
}

function COUNT(fields, isAll){
    const data = isAll ? _context.allRows : _context.rows ;
    if (!data||data.length == 0){
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
 * 判断是否相同
 * @param {*} fields 
 * @param {*} isAll 
 * @returns 
 */
function IS_SAME(fields, isAll){
    const data = isAll ? _context.allRows : _context.rows ;
    if (!data||data.length == 0){
        return true;
    }
    if (!fields){
        return false;
    }
    const firstValue = data[0][fields];  // 获取首个对象的指定字段值

  return data.every(obj => obj[fields] === firstValue); // 比较后续对象的指定字段值是否与首个相同
}
/**
 * 取单行字段值，默认取第一行
 * @param {*} fields 
 * @param {*} rownum 
 * @returns 
 */
function FIELD_VALUE(fields, rownum){
    const data = _context.rows ;
    if (!data||data.length == 0){
        return "";
    }
    if (!fields){
        return "请填字段";
    }
    if (rownum === undefined || rownum === null){
        rownum = 0;
    }
    if (rownum >= data.length){
        return "";
    }
    return data[rownum][fields];
}
/**
 * 四舍五入
 * @param {*} num
 * @param {*} precision
 */
function ROUND(num, precision){
    if (precision === undefined || precision === null){
        //默认保留6位小数,解决精度问题
        precision = 6;
    }
    var times = Math.pow(10, precision);
    var des = num * times + 0.5;
    des = parseInt(des, 10) / times;
    return des;
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
ExpressionEngine.register("IS_SAME", IS_SAME);
ExpressionEngine.register("FIELD_VALUE", FIELD_VALUE);
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
        _funcMap[expstr] = new Function("regMap", "rows","allRows","templateData","row","value",varstr);
    }
    return _funcMap[expstr](_regMap, _context.rows, _context.allRows, _context.templateData||{}, row||_context.row, _context.value);

    //最好不用with
    // const func = new Function("context", "with (context) { return " + expstr + "; }")
}

export default ExpressionEngine;