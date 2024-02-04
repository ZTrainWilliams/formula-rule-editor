<!--
 * @Author: ZTrainWilliams ztrain1224@163.com
 * @Date: 2024-02-04 10:13:31
 * @Description: 模块描述
-->

# select-tree-v2

select tree
基于 tree-v2 组件修改

参考文档：https://element-plus.gitee.io/zh-CN/component/tree-v2.html

## 属性说明

| 参数          |                           说明                           |   类型   |   可选值    | 默认值                                                                 |
| :------------ | :------------------------------------------------------: | :------: | :---------: | :--------------------------------------------------------------------- |
| modelValue    |                          value                           |  Array   |     []      | []                                                                     |
| data          |                        tree-data                         |  Array   |     []      | []                                                                     |
| url           |                        data 地址                         |  String  |      -      | ''                                                                     |
| query         |                         请求传参                         |  Object  |      -      | {}                                                                     |
| formatter     |                      请求内容格式化                      | Function |      -      | (res) => res?.data ?? []                                               |
| props         |                         配置选项                         |  Array   |      -      | {label: 'title',value: 'id',children: 'children',disabled: 'disabled'} |
| checkStrictly | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法 | Boolean  | true、false | true                                                                   |
| showCheckbox  |                     节点是否可被选择                     | Boolean  | true、false | true                                                                   |
| height        |                         默认高度                         |  Number  |      -      | 320                                                                    |

## 事件说明

| 事件名     |             说明             |                  参数                  |
| :--------- | :--------------------------: | :------------------------------------: |
| treeChange | 节点选中状态发生变化时的回调 | (data: TreeNodeData, checked: boolean) |
| change     |          已勾选列表          |               selectData               |
