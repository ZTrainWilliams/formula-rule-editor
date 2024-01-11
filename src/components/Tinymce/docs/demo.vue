<!--
 * @Description: 富文本编辑器-使用示例
-->
<template>
  <div>
    <el-button @click="disabled = !disabled">{{ disabled ? '启用' : '禁用' }}</el-button>
    <ys-tinymce v-model="content" :disabled="disabled">
      <template #menu-right>
        <el-button>自定义按钮</el-button>
      </template>
    </ys-tinymce>
    <div class="editor-content">
      <div class="ec-left">
        <div class="title">输出源码</div>
        <div class="content">{{ content }}</div>
      </div>
      <div class="ec-right">
        <div class="title">输出预览</div>
        <div class="content" v-html="content" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const content = ref(
  // eslint-disable-next-line
  '<p style="text-align: center;"><strong>测试标题</strong></p> <p style="text-align: center;"><strong>sdgdsg</strong></p> <p style="text-align: center;"><strong>sdgdsg</strong></p> <p style="text-align: center;"><strong>sdgdsg</strong></p> <p style="text-align: center;"><strong>sdgdsg</strong></p> <p style="text-align: center;"><strong>sdgdsga</strong></p> <p style="text-align: center;"><strong>gesgs</strong></p> <p style="text-align: center;"><strong>segseg</strong></p> <p style="text-align: center;"><strong>seges</strong></p> <p style="text-align: center;"><strong>ehh</strong></p> <p style="text-align: center;"><strong>2334</strong></p> <p style="text-align: center;"><strong>464564</strong></p> <p style="text-align: center;"><strong>457457</strong></p>'
);
const disabled = ref(false);
</script>

<style lang="scss" scoped>
.editor-content {
  margin-top: 20px;
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: row;
  border: solid 1px #dfdfdf;
  .ec-left {
    border-right: solid 1px #dfdfdf;
  }
  .ec-left,
  .ec-right {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    .title {
      padding: 5px 10px;
      border-bottom: solid 1px #dfdfdf;
    }
    .content {
      width: 100%;
      height: 300px;
      overflow: auto;
      padding: 5px 10px;
      box-sizing: border-box;
    }
  }
}
</style>
