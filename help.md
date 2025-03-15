# 帮助文档

## 表格底部表达式引擎函数说明

- 表达式引擎提供了一系列用于数据处理的函数，可以在表格底部中使用。
- 使用时需要在表达式前加上等号(=,每页显示)，例如：`=SUM("amount")`。
- 使用时需要在表达式前加上等等号(==,最后一页显示)，例如：`==SUM("amount")`。
- 表达式实际上JavaScript代码，所以可以js的静态函数，比如向上取整：`=Math.ceil(SUM("amount"))`。
- 支持表达式，要用括弧包裹，比如：`=SUM("(row.type==1 ? 0 : row.amount * row.price)")`。
- 可使用变量有"rows","allRows","templateData","row"
  - rows: 当前页数据, 仅在聚合函数内使用。
  - allRows: 所有数据
  - templateData: 模板数据
  - row: 当前行数据, 仅在聚合函数内使用。

### 聚合函数

#### MIN(fields, isAll, precision)
- 功能：计算指定字段的最小值
- 参数：
  - fields: 字段名称
  - isAll: 是否统计所有数据，默认false只统计当前页数据
  - precision: 保留小数位数，默认6位
- 示例：`=MIN("amount", true, 2)` - 统计所有数据中amount字段的最小值，保留2位小数

#### MAX(fields, isAll, precision)
- 功能：计算指定字段的最大值
- 参数：
  - fields: 字段名称
  - isAll: 是否统计所有数据，默认false只统计当前页数据
  - precision: 保留小数位数，默认6位
- 示例：`=MAX("amount", true, 2)` - 统计所有数据中amount字段的最大值，保留2位小数

#### SUM(fields, isAll, precision)
- 功能：计算指定字段的合计值
- 参数：
  - fields: 字段名称
  - isAll: 是否统计所有数据，默认false只统计当前页数据
  - precision: 保留小数位数，默认6位
- 示例：`=SUM("amount", false, 2)` - 统计当前页amount字段的合计值，保留2位小数

#### AVG(fields, isAll, precision)
- 功能：计算指定字段的平均值
- 参数：
  - fields: 字段名称
  - isAll: 是否统计所有数据，默认false只统计当前页数据
  - precision: 保留小数位数，默认6位
- 示例：`=AVG("amount", true, 2)` - 统计所有数据中amount字段的平均值，保留2位小数

#### COUNT(fields, isAll)
- 功能：统计记录数量
- 参数：
  - fields: 统计条件表达式，可选
  - isAll: 是否统计所有数据，默认false只统计当前页数据
- 示例：
  - `=COUNT()` - 统计当前页记录数
  - `=COUNT("(row.amount>100)", true)` - 统计所有数据中amount大于100的记录数

### 格式化函数

#### CN_MONEY(data, type)
- 功能：数字转中文大写
- 参数：
  - data: 要转换的数值
  - type: 转换类型，默认为"9"，可选值：
    - "0": 小写数字，如：一二三四
    - "1": 小写数字(不使用零)，如：一二三四
    - "2": 大写数字(使用零)，如：壹贰叁肆
    - "3": 大写数字，如：壹贰叁肆
    - "4": 金额(使用零)，如：壹仟贰佰叁拾肆元整
    - "5": 金额，如：壹仟贰佰叁拾肆元整
    - "6": 金额(完整格式)，如：人民币壹仟贰佰叁拾肆元整
    - "7": 金额(完整格式无符号)，如：壹仟贰佰叁拾肆元整
    - "8": 金额(无符号)，如：壹仟贰佰叁拾肆元整
    - "9": 金额(使用零无符号)，如：壹仟贰佰叁拾肆元整
- 示例：
  - `=CN_MONEY(1234.56)` - 输出：壹仟贰佰叁拾肆元伍角陆分
  - `=CN_MONEY(1234, "0")` - 输出：一二三四
  - `=CN_MONEY(1234, "3")` - 输出：壹贰叁肆
  - `=CN_MONEY(1234, "6")` - 输出：人民币壹仟贰佰叁拾肆元整

#### DATE_FORMAT(data, format)
- 功能：日期格式化
- 参数：
  - data: 要格式化的日期，可以是Date对象或日期字符串
  - format: 格式化模板，默认为"yyyy-MM-dd"，支持以下格式化字符：
    - yyyy: 四位年份
    - yy: 两位年份
    - MM: 月份(01-12)
    - M: 月份(1-12)
    - dd: 日期(01-31)
    - d: 日期(1-31)
    - HH: 小时(00-23)
    - H: 小时(0-23)
    - mm: 分钟(00-59)
    - m: 分钟(0-59)
    - ss: 秒(00-59)
    - s: 秒(0-59)
    - S: 毫秒(0-999)
    - q: 季度(1-4)
- 示例：
  - `=DATE_FORMAT("2023-12-25")` - 输出：2023-12-25
  - `=DATE_FORMAT("2023-12-25", "yyyy年MM月dd日")` - 输出：2023年12月25日
  - `=DATE_FORMAT("2023-12-25 13:14:15", "yyyy-MM-dd HH:mm:ss")` - 输出：2023-12-25 13:14:15

### 其他函数

#### IS_SAME(fields, isAll)
- 功能：判断指定字段的值是否都相同
- 参数：
  - fields: 字段名称
  - isAll: 是否检查所有数据，默认false只检查当前页数据
- 示例：`=IS_SAME("type", true)` - 检查所有数据中type字段的值是否都相同

#### FIELD_VALUE(fields, rownum)
- 功能：获取指定行的字段值
- 参数：
  - fields: 字段名称
  - rownum: 行号，默认0(第一行)
- 示例：`=FIELD_VALUE("name", 0)` - 获取第一行的name字段值

#### ROUND(num, precision)
- 功能：数字四舍五入
- 参数：
  - num: 要处理的数值
  - precision: 保留小数位数，默认6位
- 示例：`=ROUND(123.456789, 2)` - 输出：123.46