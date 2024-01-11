import Tinymce from './src/index.vue';

export const TinymcePlugin = {
  install(app) {
    app.component('zt-tinymce', Tinymce);
  },
};

export { Tinymce };
