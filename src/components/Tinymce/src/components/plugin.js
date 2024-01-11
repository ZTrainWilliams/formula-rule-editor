/*
 * @Description: 可维护自定义插件
 */
const registerPlugin = () => {
  // indent2em 首行缩进插件 示例 用于插件测试； 插件开发完成可上传到插件库
  window.tinymce.PluginManager.add('indent2em', function (editor) {
    const pluginName = '首行缩进';
    const global$1 = window.tinymce.util.Tools.resolve('tinymce.util.Tools');
    const indent2emVal = editor.getParam('indent2em_val', '2em');
    const doAct = function () {
      const dom = editor.dom;
      const blocks = editor.selection.getSelectedBlocks();
      let act = '';
      global$1.each(blocks, function (block) {
        if (act === '') {
          act = dom.getStyle(block, 'text-indent') === indent2emVal ? 'remove' : 'add';
        }
        if (act === 'add') {
          dom.setStyle(block, 'text-indent', indent2emVal);
        } else {
          let style = dom.getAttrib(block, 'style');
          const reg = new RegExp(`text-indent:[\\s]*${indent2emVal};`, 'ig');
          style = style.replace(reg, '');
          dom.setAttrib(block, 'style', style);
        }
      });
    };

    editor.ui.registry.getAll().icons.indent2em ||
      editor.ui.registry.addIcon(
        'indent2em',
        '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M170.666667 563.2v-102.4H887.466667v102.4zM170.666667 836.266667v-102.4H887.466667v102.4zM512 290.133333v-102.4H887.466667v102.4zM238.933333 341.333333V136.533333l204.8 102.4z" fill="#2c2c2c" p-id="5210"></path></svg>'
      );

    const stateSelectorAdapter = function (ed, selector) {
      return function (buttonApi) {
        return ed.selection.selectorChangedWithUnbind(selector.join(','), buttonApi.setActive).unbind;
      };
    };

    editor.ui.registry.addToggleButton('indent2em', {
      icon: 'indent2em',
      tooltip: pluginName,
      onAction() {
        doAct();
      },
      onSetup: stateSelectorAdapter(editor, ['*[style*="text-indent"]', '*[data-mce-style*="text-indent"]']),
    });

    editor.ui.registry.addMenuItem('indent2em', {
      text: pluginName,
      onAction() {
        doAct();
      },
    });

    editor.addCommand('indent2em', doAct);

    return {
      getMetadata() {
        return {
          name: pluginName,
          url: 'http://tinymce.ax-z.cn/more-plugins/indent2em.php',
        };
      },
    };
  });
};
export default registerPlugin;
