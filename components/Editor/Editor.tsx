import { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';

// TOAST UI Editor CSS
import '@toast-ui/editor/dist/toastui-editor.css';

// color-syntax CSS
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

// code syntax highlight
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import Prism from 'prismjs'; // prism 테마 추가
import 'prismjs/components/prism-clojure.js';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

// table-merged-cell
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';

const Post = () => (
  <Editor
    initialValue="hello react editor world!"
    previewStyle="vertical"
    height="500px"
    usageStatistics={false}
    plugins={[
      colorSyntax,
      tableMergedCell,
      [codeSyntaxHighlight, { highlighter: Prism }],
    ]}
    // language="ko-KR"
  />
);

export default Post;
