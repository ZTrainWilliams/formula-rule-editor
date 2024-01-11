<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
import demo1 from './demo1.vue'

</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# 富文本编辑器

基于 TinyMCE 的富文本编辑器（复制于 vue-element-admin 项目中组件 Tinymce 做适应）

## 基础用法

<Preview comp-name="Tinymce" demo-name="demo">
  <demo />
</Preview>

## 编辑器-插入内容

<Preview comp-name="Tinymce" demo-name="demo1">
  <demo1 />
</Preview>

## 属性

| 参数         |      类型      | 是否必须 |            说明             | 默认值                                         |
| :----------- | :------------: | :------: | :-------------------------: | :--------------------------------------------- |
| `id`         |     String     |    否    |           组件 ID           | 基于时间戳和随机数自动生成 id                  |
| `modelValue` |     String     |    否    | 组件内容-基于 html 的字符串 | ``                                             |
| `toolbar`    |     Array      |    否    |         组件工具条          | 默认工具条                                     |
| `menuBar`    |     String     |    否    |         组件菜单项          | `file edit insert view format table`           |
| `fontsizes`  |     String     |    否    |          字号选择           | `11px 12px 14px 16px 18px 20px 24px 36px 48px` |
| `height`     |     Number     |    否    |          组件高度           | 360                                            |
| `width`      | Number，String |    否    |          组件宽度           | -                                              |
| `disabled`   |    Boolean     |    否    |          是否禁用           | 否                                             |
| `config`     |     Object     |    否    |     覆盖组件初始化配置      | -                                              |

## 事件

|       事件名        |   说明   | 参数列表 |          参数说明           |
| :-----------------: | :------: | :------: | :-------------------------: |
| `update:modelValue` | 更新内容 | content  | 编辑器的内容（html 字符串） |

## 插槽

| 名称         | 说明               |
| :----------- | :----------------- |
| `menu-right` | 菜单栏右侧区域插槽 |
