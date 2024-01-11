<template>
  <div
    class="tinymce-container"
    :class="{ fullscreen: fullscreen, 'tinymce-container-disabled': disabled }"
    :style="{ width: containerWidth }"
  >
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <div class="editor-custom-menu-right" v-show="!disabled">
      <slot name="menu-right"></slot>
    </div>
    <!-- 编辑器自定义组件使用示例 -->
    <!-- <div class="editor-custom-menu-right">
      <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
    </div> -->
  </div>
</template>

<script>
/**
 * docs:
 * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
 */
// import editorImage from './components/EditorImage.vue';
import plugins from './plugins';
import toolbar from './toolbar';
import load from './dynamicLoadScript';
// import registerPlugin from './components/plugin'; // 用于测试插件

export default {
  name: 'Tinymce',
  // components: { editorImage },
  props: {
    id: {
      type: String,
      default() {
        return `vue-tinymce-${+new Date()}${(Math.random() * 1000).toFixed(0)}`;
      },
    },
    tinymceCDN: {
      type: String,
      // why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
      // 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js';
      default: 'https://public-web-res-1312176471.cos.ap-guangzhou.myqcloud.com/tinymce-5.10.0/tinymce.min.js',
    },
    disabled: { type: Boolean, default: false },
    modelValue: {
      type: String,
      default: '',
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    fontsizes: {
      type: String,
      default: '11px 12px 14px 16px 18px 20px 24px 36px 48px',
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table my1',
    },
    height: {
      type: [Number, String],
      required: false,
      default: 360,
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto',
    },
    config: {
      type: Object,
    },
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        en: 'en',
        zh: 'zh_CN',
        es: 'es_MX',
        ja: 'ja',
      },
    };
  },
  computed: {
    containerWidth() {
      const width = this.width;
      if (/^[\d]+(\.[\d]+)?$/.test(width)) {
        // matches `100`, `'100'`
        return `${width}px`;
      }
      return width;
    },
  },
  watch: {
    modelValue(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val || ''));
      }
    },
    disabled(val) {
      if (window.tinymce && window.tinymce.get(this.tinymceId)) {
        window.tinymce.get(this.tinymceId).mode.set(val ? 'readonly' : 'design');
      }
    },
  },
  mounted() {
    this.init();
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce();
    }
  },
  deactivated() {
    this.destroyTinymce();
  },
  unmounted() {
    this.destroyTinymce();
  },
  methods: {
    init() {
      // dynamic load tinymce from cdn
      load(this.tinymceCDN, (err) => {
        this.$emit('loadTinymce', err);
        if (err) {
          this.$message.error(err.message);
          return;
        }
        this.initTinymce();
      });
    },
    initTinymce() {
      // registerPlugin();
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this;
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        language: this.languageTypeList.zh,
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        fontsize_formats: this.fontsizes,
        plugins,
        readonly: this.disabled,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: (editor) => {
          this.$emit('initInstanceCallback', editor);
          if (that.modelValue) {
            editor.setContent(that.modelValue);
          }
          that.hasInit = true;
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true;
            this.$emit('update:modelValue', editor.getContent());
          });
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            that.fullscreen = e.state;
          });
        },
        // it will try to keep these URLs intact
        // https://www.tiny.cloud/docs-3x/reference/configuration/Configuration3x@convert_urls/
        // https://stackoverflow.com/questions/5196205/disable-tinymce-absolute-to-relative-url-conversions
        convert_urls: false,
        // 整合七牛上传
        // images_dataimg_filter(img) {
        //   setTimeout(() => {
        //     const $image = $(img);
        //     $image.removeAttr('width');
        //     $image.removeAttr('height');
        //     if ($image[0].height && $image[0].width) {
        //       $image.attr('data-wscntype', 'image');
        //       $image.attr('data-wscnh', $image[0].height);
        //       $image.attr('data-wscnw', $image[0].width);
        //       $image.addClass('wscnph');
        //     }
        //   }, 0);
        //   return img
        // },
        // images_upload_handler(blobInfo, success, failure, progress) {
        //   progress(0);
        //   const token = that.$store.getters.token;
        //   getToken(token).then(response => {
        //     const url = response.data.qiniu_url;
        //     const formData = new FormData();
        //     formData.append('token', response.data.qiniu_token);
        //     formData.append('key', response.data.qiniu_key);
        //     formData.append('file', blobInfo.blob(), url);
        //     upload(formData).then(() => {
        //       success(url);
        //       progress(100);
        //     })
        //   }).catch(err => {
        //     failure('出现未知问题，刷新页面，或者联系程序员')
        //     console.log(err);
        //   });
        // },
        ...this.config,
      });
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId);
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen');
      }

      if (tinymce) {
        tinymce.destroy();
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value);
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent();
    },
    // imageSuccessCBK(arr) {
    //   arr.forEach((v) => window.tinymce.get(this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`));
    // },
  },
};
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}

.tinymce-container {
  :deep(.mce-fullscreen) {
    z-index: 10000;
  }
}

.tinymce-container-disabled {
  // pointer-events: none;
  :deep(.tox-editor-container) {
    .tox-editor-header {
      display: none;
    }
  }
  :deep(.tox-statusbar) {
    display: none;
  }
  :deep(.mce-container) {
    border-width: 0 !important;
    .mce-top-part {
      display: none;
    }
  }
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}

.editor-custom-menu-right {
  position: absolute;
  right: 4px;
  top: 4px;
  z-index: 1;
}

.fullscreen .editor-custom-menu-right {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}
</style>
