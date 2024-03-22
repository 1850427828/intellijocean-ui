<template>
  <div class="json-editor">
    <textarea ref="textarea" />
  </div>
</template>

<script>
import CodeMirror from "codemirror";
import "codemirror/addon/lint/lint.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/panda-syntax.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/lint/json-lint";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/xml-fold.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/comment-fold.js";

export default {
  name: "CodeEditor",
  props: ["value", "readOnly"],
  data() {
    return {
      jsonEditor: null,
    };
  },
  watch: {
    value(newValue) {
      console.log(this.jsonEditor.getValue());
      if (newValue !== this.jsonEditor.getValue()) {
        console.log(newValue);
        // this.jsonEditor.setValue(JSON.stringify(newValue, null, 2));
        this.jsonEditor.setValue(newValue);
      }
    },
    readOnly(newValue) {
      if (this.jsonEditor) {
        this.jsonEditor.setOption("readOnly", newValue);
      }
    },
  },
  mounted() {
    this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true,
      mode: "application/json",
      gutters: [
        "CodeMirror-lint-markers",
        "CodeMirror-linenumbers",
        "CodeMirror-foldgutter",
      ],
      theme: "panda-syntax",
      lint: true,
      foldGutter: {
        rangeFinder: new CodeMirror.fold.combine(
          CodeMirror.fold.indent,
          CodeMirror.fold.comment
        ),
      },
      readOnly: this.readOnly,
    });
    this.jsonEditor.setValue(JSON.stringify(this.value, null, 2));
    this.jsonEditor.on("change", (cm) => {
      this.$emit("changed", cm.getValue());
    });

  },
  methods: {
    //刷新视图
    refresh() {
      if (this.jsonEditor) {
        this.jsonEditor.refresh();
      }
    },
    getValue() {
      if (this.jsonEditor) {
        return this.jsonEditor.getValue();
      }
      return null;
    },
  },
};
</script>

<style scoped>
.json-editor {
  height: 100%;
  position: relative;
}
.json-editor >>> .CodeMirror {
  height: auto;
  min-height: 180px;
}
.json-editor >>> .CodeMirror-scroll {
  min-height: 180px;
}
.json-editor >>> .cm-s-rubyblue span.cm-string {
  color: #f08047;
}

/* 设置选中文本的背景色为蓝色 */
.json-editor >>> .CodeMirror-selected {
  background-color: #0337a1 !important;
}
</style>