const startEditor = (Editor: any) => {
    const config = {
        txHost: '',
        txPath: '/daumeditor/',
        txService: 'sample',
        txProject: 'sample',
        initializedId: "",
        wrapper: "tx_trex_container",
        form: 'tx_editor_form' + "",
        txIconPath: "/daumeditor/images/icon/editor/",
        txDecoPath: "/daumeditor/images/deco/contents/",
        canvas: {
            styles: {
                color: "#123456",
                fontFamily: "굴림",
                fontSize: "10pt",
                backgroundColor: "#fff",
                lineHeight: "1.5",
                padding: "8px"
            },
            showGuideArea: false
        },
        events: {
            preventUnload: false
        },
        sidebar: {
            attachbox: {
                show: true,
                confirmForDeleteAll: true
            }
        },
        size: {
            contentWidth: 700
        }
    };

    if (Editor) {
        // According to original behavior, we should use `new Editor(config)`
        const editor = new Editor(config);
        console.log('DaumEditor initialized successfully via public paths:', editor);
        
        window.editorInstance = editor;

        const saveButton = document.getElementById('save_button');
        if (saveButton) {
            saveButton.onclick = () => {
                Editor.save();
            };
        }
    }
};

window.validForm = function(editor: any) {
    const validator = new window.Trex.Validator();
    const content = editor.getContent();
    if (!validator.exists(content)) {
        alert('내용을 입력하세요');
        return false;
    }
    return true;
};

window.setForm = function(editor: any) {
    const content = editor.getContent();
    console.log('Saving content:', content);
    alert('Content saved! Check console.');
    return true;
};

if (window.EditorJSLoader) {
    window.EditorJSLoader.ready(startEditor);
} else {
    console.error('EditorJSLoader not found');
}

declare global {
    interface Window {
        Editor: any;
        editorInstance: any;
        Trex: any;
        validForm: any;
        setForm: any;
        EditorJSLoader: any;
        DAUM_EDITOR_LOADED: boolean;
        _DOC: Document;
        _WIN: Window;
        _DOC_EL: HTMLElement;
        _FALSE: boolean;
        _TRUE: boolean;
        _NULL: any;
        TREX_STRICT_MODE: boolean;
        DEBUG: number;
    }
}
export {};
