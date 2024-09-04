# file-upload

附件上传组件
基于 el-upload 组件修改

参考文档：https://avuejs.com/default/text-ellipsis.html#%E5%9F%BA%E6%9C%AC%E8%B0%83%E7%94%A8

## 属性说明

| 参数         |         说明         |     类型     |              可选值              | 默认值       |
| :----------- | :------------------: | :----------: | :------------------------------: | :----------- |
| limit        |       个数限制       |    Number    |             1~99999              | 1            |
| type         |         类型         |    String    |       text、 picture-card        | text         |
| valueField   |      指定值字段      |    String    |              string              | attachmentId |
| disabled     |       是否禁用       |   Boolean    |           true、false            | false        |
| showTip      |     是否显示提示     |   Boolean    |           true、false            | true         |
| reUpload     |   是否开启重新上传   |   Boolean    |                -                 | -            |
| fileSize     |  文件大小 1kb 起步   |    Number    |                -                 | -            |
| imgCheckedWH |     图片尺寸限制     | null, Object | { width: Number, height: Number} | null         |
| modelValue   |   默认值 fileList    |    Array     |                -                 | -            |
| btnName      |     上传按钮文本     |    String    |                -                 | 上传         |
| autoUpload   |       自动上传       |   Boolean    |                -                 | -            |
| actionUrl    |       上传 url       |    String    |                -                 | -            |
| multiple     |         多选         |   Boolean    |                -                 | true         |
| data         | 上传时附带的额外参数 |    Object    |                -                 | {}           |
| accept       |       附件格式       |    String    |                -                 | .pdf         |
| isChecking   |    操作前是否校验    |   Boolean    |                -                 | false        |

## 事件说明

| 事件名  |       说明       |      参数      |
| :------ | :--------------: | :------------: |
| remove  | 附件列表删除回调 | file, fileList |
| success | 附件上传成功回调 | file, fileList |
