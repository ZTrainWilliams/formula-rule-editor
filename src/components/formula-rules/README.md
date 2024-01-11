<!--
 * @Description: 公式规则
-->

## 组件

### 公式规则弹窗: formula-dialog

#### 属性

| 参数                    |  类型   | 是否必须 |         说明         | 默认值                         |
| :---------------------- | :-----: | :------: | :------------------: | :----------------------------- |
| `request-operatorList`  |  Array  |    否    |      操作符列表      | ['+', '-', '*', '/', '(', ')'] |
| `request-functionList`  |  Array  |    否    |       函数列表       | []                             |
| `request-queryVariable` | Funtion |    是    | 获取（字段列表）接口 | () => {}                       |
| `request-checkRule`     | Funtion |    是    |     公式检查接口     | () => {}                       |
| `request-extraParams`   | Object  |    否    |  checkRule 额外传参  | {}                             |

## 事件

|  事件名  |     说明     |    参数    |                          参数说明                           |
| :------: | :----------: | :--------: | :---------------------------------------------------------: |
|  `open`  |   打开弹窗   |    data    | (expressionContent、calcExpression、calcList、variableType) |
| `change` | 回调更新内容 | formValues |     公式编辑器内容（calcExpression、expressionContent）     |

### 公式编辑器（基于富文本 Tinymce）: tinymce-formula

主要原理：组件 ys-tinymce 使用的是 vue-tinymce；插入字段标签、文本，使用 insertContent 方法；字段标签设置 contenteditable="false"控制不可操作；
富文本编辑器内容是 html，公式文本需获取内容节点信息，区分字段（feild）类型、文本类型。

#### 属性

| 参数           |  类型  | 是否必须 |    说明    | 默认值            |
| :------------- | :----: | :------: | :--------: | :---------------- |
| `modelValue`   | String |    否    |  公式文本  | ''                |
| `id`           | String |    否    | 富文本 id  | 'tinymce-formula' |
| `operatorList` | Array  |    否    | 操作符列表 | () => []          |
| `functionList` | Array  |    否    |  函数列表  | () => []          |
| `color`        | String |    否    | field-颜色 | '#1C88E5'         |

## 事件

|       事件名        |       说明       |  参数  |   参数说明   |
| :-----------------: | :--------------: | :----: | :----------: |
| `changeHtmlContent` |  回调富文本内容  | String |  富文本内容  |
|      `change`       | 回调公式类型数组 | Arrary | 公式类型数组 |
