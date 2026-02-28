import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const baseDir = './public/daumeditor/js/';
const outputFile = './public/daumeditor/daumeditor.all.js';
const minifiedFile = './public/daumeditor/daumeditor.all.min.js';

// 파일 로드 순서 (에디터 엔진의 의존성 순서) - 원본 js/editor.js의 순서를 100% 재현
const coreFiles = [
    "scopeVariable.js",
    /* common library */
    "lib/json2.js",
    "lib/txlib.js",
    "lib/closure-range.js",
    "lib/hyperscript.js",
    "lib/template.js",
    "lib/dgetty.js",
    "lib/dfindy.js",
    "lib/xgetty.js",
    "lib/font_css_property.js",
    /* trex engine & config */
    "trex/eval.js",
    "trex/trex.js",
    "trex/event.js",
    "trex/config.js",
    "trex/message.js",
    "trex/configbuilder.js",
    /* trex library */
    "trex/lib/markup.js",
    "trex/lib/domutil.js",
    "trex/lib/utils.js",
    "trex/lib/imageresizer.js",
    "trex/lib/tableutil.js",
    /* trex mixins */
    "trex/mixins/ajax.js",
    "trex/mixins/observable.js",
    "trex/mixins/colorpallete.js",
    "trex/mixins/cookiebaker.js",
    /* trex common */
    "trex/common/button.js",
    "trex/common/menu.js",
    "trex/common/menuback.js",
    /* editor core */
    "trex/editor.js",
    "trex/toolbar.js",
    "trex/sidebar.js",
    "trex/docparser.js",
    "trex/entryproxy.js",
    "trex/formproxy.js",
    "trex/saver.js",
    "trex/resizer.js",
    /* canvas & panels */
    "trex/history.js",
    "trex/canvas.js",
    "trex/panels/panel.js",
    "trex/panels/wysiwyg/iframeloader.js",
    "trex/panels/wysiwyg/webfontloader.js",
    "trex/panels/wysiwyg/wysiwygrelative.js",
    "trex/panels/wysiwyg/eventbinder.js",
    "trex/panels/wysiwygpanel.js",
    "trex/panels/textareapanel.js",
    "trex/panels/htmlpanel.js",
    "trex/panels/textpanel.js",
    /* processor */
    "trex/processor/marker.js",
    "trex/processor/selection.js",
    "trex/processor/bookmark.js",
    "trex/processor/processor_textarea.js",
    "trex/processor/processor_standard.js",
    "trex/processor/processor_trident.js",
    "trex/processor/processor_trident_standard.js",
    "trex/processor/processor_gecko.js",
    "trex/processor/processor_webkit.js",
    "trex/processor/processor_presto.js",
    "trex/processor/p/processor_standard_p.js",
    "trex/processor/p/processor_trident_p.js",
    "trex/processor/p/processor_trident_standard_p.js",
    "trex/processor/p/processor_gecko_p.js",
    "trex/processor/p/processor_webkit_p.js",
    "trex/processor/p/processor_presto_p.js",
    "trex/processor/processor.js",
    /* each > filter */
    "trex/filters/converting.js",
    "trex/filters/redundancy.js",
    /* attacher */
    "trex/attachment.js",
    "trex/attachbox.js",
    "trex/attachbox/attachbox_ui.js",
    "trex/attachbox/filecapacity.js",
    "trex/attacher.js",
    /* embeder */
    "trex/embeder.js",
    "trex/embedentry.js",
    /* tools */
    "trex/tool/buttonFontTool.js",
    "trex/tool/menuFontTool.js",
    "trex/tool/fontTool.js",
    "trex/tool/switcher.js",
    "trex/tool/switchertoggle.js",
    "trex/tool/fontfamily.js",
    "trex/tool/fontsize.js",
    "trex/tool/bold.js",
    "trex/tool/underline.js",
    "trex/tool/italic.js",
    "trex/tool/strike.js",
    "trex/tool/forecolor.js",
    "trex/tool/backcolor.js",
    "trex/tool/indent.js",
    "trex/tool/indentHelper.js",
    "trex/tool/outdent.js",
    "trex/mixins/alignexecution.js",
    "trex/tool/alignleft.js",
    "trex/tool/aligncenter.js",
    "trex/tool/alignright.js",
    "trex/tool/alignfull.js",
    "trex/tool/insertcells.js",
    "trex/tool/deletecells.js",
    "trex/tool/mergecells.js",
    "trex/tool/cellslineheight.js",
    "trex/tool/cellslinecolor.js",
    "trex/tool/cellslinestyle.js",
    "trex/tool/cellsoutline.js",
    "trex/tool/cellslinepreview.js",
    "trex/tool/tablebackcolor.js",
    "trex/tool/tableedittool.js",
    "trex/tool/tabletemplate.js",
    "trex/tool/lineheight.js",
    "trex/tool/styledlist.js",
    "trex/tool/insertlink.js",
    "trex/tool/richtextbox.js",
    "trex/tool/quote.js",
    "trex/tool/table.js",
    "trex/tool/emoticon.js",
    "trex/tool/redo.js",
    "trex/tool/undo.js",
    "trex/tool/removeformat.js",
    "trex/tool/horizontalrule.js",
    "trex/tool/specialchar.js",
    "trex/tool/dictionary.js",
    "trex/tool/background.js",
    "trex/tool/advanced.js",
    "trex/tool/extraButtonDropdown.js",
    "trex/tool/fullscreen.js",
    /* 각 항목 > attacher/embeder/module */
    "trex/attacher/image.js",
    "trex/attacher/file.js",
    "trex/embeder/media.js",
    "trex/modules/blockingunload.js",
    "trex/modules/alignbuttons.js",
    "trex/modules/canvassize.js",
    "trex/modules/blockingedit.js",
    "trex/modules/saveimagehistory.js",
    "trex/modules/noticepanel.js",
    "trex/modules/table.js",
    "trex/modules/table/selector.js",
    "trex/modules/table/merge.js",
    "trex/modules/table/insert.js",
    "trex/modules/table/delete.js",
    "trex/modules/table/border.js",
    "trex/modules/table/template.js",
    "trex/modules/pageupdown.js",
    "trex/modules/tabledragger.js",
    "trex/modules/exiteditor.js"
];

console.log('📦 번들링 시작...');

let combinedContent = '';
coreFiles.forEach(file => {
    const filePath = path.join(baseDir, file);
    if (fs.existsSync(filePath)) {
        combinedContent += fs.readFileSync(filePath, 'utf8') + '\n';
        console.log(`+ ${file} 추가됨`);
    } else {
        console.warn(`! ${file} 파일을 찾을 수 없습니다.`);
    }
});

fs.writeFileSync(outputFile, combinedContent);
console.log(`✅ 번들 생성 완료: ${outputFile}`);

console.log('⚡ 압축(Minify) 시작...');
try {
    execSync(`npx terser ${outputFile} -o ${minifiedFile} --compress --mangle`);
    console.log(`✨ 압축 완료: ${minifiedFile}`);
} catch (error) {
    console.error('❌ 압축 도중 에러 발생:', error.message);
}
