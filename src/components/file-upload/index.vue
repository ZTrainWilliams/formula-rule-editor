<template>
  <div class="file-upload-main">
    <el-upload
      class="file-upload-main-item"
      :class="className"
      ref="refFile"
      :action="actionUrl"
      :list-type="type"
      :disabled="disabled"
      v-model:file-list="files"
      :headers="uploadHeaders"
      :accept="currentAccept"
      :limit="uploadLimit"
      :auto-upload="autoUpload"
      :multiple="multiple"
      :drag="drag"
      :data="data"
      v-bind="$attrs"
      :on-preview="handlePreview"
      :before-upload="beforeUpload"
      :on-remove="remove"
      :before-remove="beforeRemove"
      :on-success="success"
      :on-error="error"
      :on-change="changeFile"
      :on-exceed="handleExceed"
    >
      <template v-if="view"></template>
      <template v-else>
        <el-icon v-if="type === 'picture-card'"><Plus /></el-icon>
        <template v-else>
          <template v-if="drag">
            <el-icon class="el-icon--upload">
              <UploadFilled />
            </el-icon>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </template>
          <template v-else>
            <el-button
              v-if="!disabled && (reUpload || files.length < limit)"
              icon="el-icon-upload-filled"
              type="primary"
            >
              {{ uploadBtnName }}
            </el-button>
          </template>
        </template>
      </template>

      <template #tip v-if="curShowTip">
        <slot name="tips">
          <div class="text-tips" style="padding: 6px">
            格式支持：{{ accept }}<br />
            大小限制：单个文件大小不超过{{ limtFileSizeText }}
            <template v-if="!reUpload && limit > 1">
              <br />
              数量限制：{{ limit }}
            </template>
            <template v-if="imgCheckedWH">
              <br />
              图片尺寸: 建议为{{ imgCheckedWH.width }}*{{ imgCheckedWH.height }}px
            </template>
          </div>
        </slot>
      </template>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<script>
import { getAuthHeaders } from '@/util/auth';
import { Base64 } from 'js-base64';
import { Plus, UploadFilled } from '@element-plus/icons-vue';

export default {
  name: 'FileUpload',
  components: { Plus, UploadFilled },
  props: {
    // 个数限制
    limit: {
      type: Number,
      default: 1,
    },
    // 类型
    type: {
      type: String,
      default: 'text', // text | picture-card
    },
    valueField: { type: String, default: 'attachmentId' }, // 指定值字段
    // 是否开启重新上传
    reUpload: {
      type: Boolean,
      default: false,
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    view: {
      type: Boolean,
      default: false,
    },
    // 是否显示提示
    showTip: {
      type: Boolean,
      default: true,
    },
    // 文件大小 1kb起步
    fileSize: {
      type: Number,
      default: 10240, // 10MB
    },
    // 图片尺寸限制
    imgCheckedWH: {
      type: [null, Object],
      default: null,
      // {
      //   width: 60,
      //   height: 60
      // }
    },
    // 默认fileList
    modelValue: {
      type: Array,
      default: () => [],
    },
    // 上传按钮文本
    btnName: {
      type: String,
      default: '上传',
    },
    // 自动上传
    autoUpload: {
      type: Boolean,
      default: true,
    },
    // 上传url
    actionUrl: {
      type: String,
      default: '',
    },
    // 多选
    multiple: {
      type: Boolean,
      default: false,
    },
    // 拖拽
    drag: {
      type: Boolean,
      default: false,
    },
    // 上传时附带的额外参数
    data: {
      type: Object,
      default: () => {},
    },
    // 附件格式
    accept: {
      type: String,
      default: 'pdf', // ,间隔 文件名不带.
    },
    // 操作前是否校验
    isChecking: {
      type: Boolean,
      default: false,
    },
    // 重新上传按钮文本
    reUploadName: {
      type: String,
      default: '重新上传',
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: false,
      files: [],
      uploadingFiles: {},
    };
  },
  computed: {
    uploadHeaders() {
      return getAuthHeaders();
    },
    // 上传按钮名称
    uploadBtnName() {
      return this.reUpload && this.files.length > 0 ? this.reUploadName : this.btnName;
    },
    uploadLimit() {
      return this.reUpload ? this.limit + 1 : this.limit;
    },
    fileSizeLmit() {
      return this.fileSize * 1024; // 乘以字节
    },
    // 文件大小限制文本
    limtFileSizeText() {
      return this.fileSize > 1024 ? `${Math.ceil(this.fileSize / 1024)}MB` : `${this.fileSize}KB`;
    },
    className() {
      return `file-upload-${this.type} ${this.files.length === this.limit ? 'file-upload-limit' : ''} ${
        this.view ? 'file-upload-view' : ''
      }`;
    },
    currentAccept() {
      // 拖拽模式下设置accept，beforeUpload无法触发
      return this.drag ? null : this.accept;
    },
    curShowTip() {
      if (this.view) {
        return false;
      }
      return this.showTip;
    },
  },
  watch: {
    modelValue: {
      handler(v) {
        this.files = v || [];
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    remove(file, fileList) {
      this.files = fileList;
      this.$emit('input', this.files);
      this.$emit('update:modelValue', this.files);
      this.$emit('remove', file, fileList);
    },
    beforeRemove(file, fileList) {
      if (this.isChecking) {
        return this.$confirm(`确定删除 ${file.name}？`).then(() => {
          const i = this.files.findIndex((v) => v.id === file.id);
          if (i !== -1) {
            this.files.splice(i, 1);
          }
        });
      }
    },
    async beforeUpload(file) {
      // 文件类型限制
      const name = file.name ? file.name : '';
      const ext = name ? name.substr(name.lastIndexOf('.') + 1, name.length) : true;
      const extensions = this.accept.split(',');
      const isExt = !extensions?.includes(ext);
      if (name.includes(' ')) {
        this.$message.error(`上传的附件名称不要包含空格!`);
        return false;
      }
      if (isExt) {
        if (!this.accept) {
          // this.$message.error('请配置可上传文件的格式!');
        } else {
          this.$message.error(`上传的附件只能是 ${this.accept}格式!`);
        }
        return !isExt;
      }

      const isLmit = file.size < this.fileSizeLmit;
      if (!isLmit) {
        this.$message.error('附件大小超出限制!');
        return false;
      }

      if (this.imgCheckedWH) {
        const checked = await this.asyncImgChecked(file);
        if (!checked) {
          this.$message.error('图片尺寸不符合要求!');
          return false;
        }
      }
      this.$emit('beforeUpload', file);
      this.uploadingFiles[Base64.encode(name)] = 'eror';
    },
    // 计算图片尺寸
    asyncImgChecked(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file); // 必须用file.raw
        reader.onload = () => {
          // 让页面中的img标签的src指向读取的路径
          const img = new Image();
          img.src = reader.result;
          const width = this.imgCheckedWH.width;
          const height = this.imgCheckedWH.height;
          if (img.complete) {
            // 如果存在浏览器缓存中
            resolve(Boolean(img.width === width && img.height === height));
          } else {
            img.onload = () => {
              resolve(Boolean(img.width === width && img.height === height));
            };
          }
        };
      });
    },
    success(res, file, fileList) {
      if (res.success) {
        const data = { name: res.data?.fileName, id: res.data && res.data[this.valueField], ...res.data };
        if (this.reUpload) {
          // 重新上传-附件数据替换，this.files已被填充
          if (this.files.length > 0) {
            this.files.splice(this.files.length - 2, 2, data);
          }
        } else {
          const index = this.files.findIndex((row) => {
            const obj = row?.response ? row.response?.data || {} : row;
            return obj.id === data.id;
          });
          if (index !== -1) {
            // 上传数据格式替换
            this.files.splice(index, 1, data);
          }
        }
        this.$emit('input', this.files);
        this.$emit('update:modelValue', this.files);
        try {
          // avue-form 主动触发校验
          this.$parent.clearValidate();
        } catch (error) {}
        this.$emit('success', res, fileList);
        this.isChecking && this.$message.success(res.message);
      }
    },
    error(response, file, fileList) {
      this.files = fileList;
      this.$message.error({
        width: '50%',
        message: `上传失败:${response.message ?? response.msg ?? response}`,
      });
      delete this.uploadingFiles[Base64.encode(file.name)];
      this.$emit('error', response);
    },
    changeFile(file, fileList) {
      if (!this.autoUpload) {
        this.beforeUpload(file).then((status) => {
          if (status === false) {
            const index = this.files.findIndex((v) => {
              return v.uid === file.uid;
            });
            if (index !== -1) {
              this.files.splice(index, 1);
            }
          } else {
            this.$emit('input', this.files);
          }
        });
      }
      // this.$nextTick(() => {
      //   this.$emit('input', fileList);
      // });
    },
    /**
     * @description: 当超出限制时，执行的钩子函数
     */
    handleExceed(files, uploadFiles) {
      this.$message.warning(`文件上传数量超出限制，文件数量限制：${this.limit} `);
    },
    /**
     * @description: 手动上传文件
     */
    handleSubmitFile(form) {
      this.$nextTick(() => {
        this.$refs.refFile.submit();
      });
    },
    /**
     * @description: 打开图片做预览
     * @param {*} row
     * @return {*}
     */
    handlePreview(row) {
      const obj = row?.response ? row.response?.data || {} : row;
      if (this.type === 'picture-card') {
        this.$ImagePreview([{ thumbUrl: obj.url, url: obj.url }], 0, {
          closeOnClickModal: true,
          beforeClose: () => {},
        });
        // this.dialogImageUrl = obj.url;
        // this.dialogVisible = true;
      } else {
        window.open(obj.url);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.file-upload-view {
  ::v-deep(.el-upload) {
    display: none;
  }
  ::v-deep(.el-upload-list__item-file-name) {
    color: var(--el-color-primary);
  }
}
.file-upload-main-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: inherit;
  ::v-deep(.el-upload) {
    width: inherit;
  }
  ::v-deep(.is-disabled) {
    // 禁用状态-不显示上传成功标签
    .el-upload-list__item .el-upload-list__item-status-label {
      display: none;
    }
    .el-upload-list__item-status-label .el-icon--upload-success {
      display: none;
    }
  }
  ::v-deep(.el-upload-list) {
    margin: 0;
    width: 100%;
  }
}
// 卡片上传模式大小固定
.file-upload-picture-card {
  ::v-deep(.el-upload--picture-card),
  ::v-deep(.el-upload-list__item) {
    width: 100px;
    height: 100px;
    border-radius: 3px;
  }
}
.file-upload-picture-card.file-upload-limit {
  // 附件数达到限制不显示上传按钮
  ::v-deep(.el-upload--picture-card) {
    display: none;
  }
}
</style>
