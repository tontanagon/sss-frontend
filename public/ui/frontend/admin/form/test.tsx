import { FC, memo, useEffect, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import { Delta } from 'quill';
import Sources from "quill";
import 'react-quill/dist/quill.snow.css';
// @ts-ignore
import ImageUploader from 'quill-image-uploader';
// @ts-ignore
import ImageResize from 'quill-image-resize';
// import { toolbarOptions } from '../../constants/wysiwyg';

Quill.register('modules/imageUploader', ImageUploader);
Quill.register('modules/ImageResize', ImageResize);

interface IWysiwygProps {
  initialValue?: string;
  disabled?: boolean;
  onChange?: (content: string) => void;
}

const Wysiwyg: FC<IWysiwygProps> = memo(
  ({ initialValue, disabled, onChange }) => {
    const { REACT_APP_API_URL } = process.env;

    const quillInstance = useRef<ReactQuill>(null);

    useEffect(() => {
      quillInstance?.current?.getEditor().enable(!disabled);
    }, [disabled]);

    const undoChange = () => {
      // @ts-ignore
      if (typeof quillInstance?.current?.getEditor !== 'function') return;
      // @ts-ignore
      const quillRef = quillInstance?.current?.getEditor();
      /**
       * ignore type because the wrapper not provider history method which exist in native quill library
       */
      // @ts-ignore
      quillRef.history.undo();
    };

    const redoChange = () => {
      // @ts-ignore
      if (typeof quillInstance?.current?.getEditor !== 'function') return;
      // @ts-ignore
      const quillRef = quillInstance?.current?.getEditor();
      /**
       * ignore type because the wrapper not provider history method which exist in native quill library
       */
      // @ts-ignore
      quillRef.history.redo();
    };

    // editor option

    const modules = {
      toolbar: {
        container: toolbarOptions,
        handlers: {
          undo: undoChange,
          redo: redoChange,
        },
      },
      history: { delay: 200, maxStack: 500, userOnly: true },
      imageUploader: {
        upload: (file: any) => {
          return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', file);
            client.post<string>('/api/v1/files', formData).then((response) => {
              resolve(`${REACT_APP_API_URL}api/v1/files/${response.data}`);
            });
          });
        },
      },
      ImageResize: {
        modules: ['Resize', 'DisplaySize'],
        displayStyles: {
          backgroundColor: 'black',
          border: 'none',
          color: 'white',
        },
      },
    };

    return (
      <ReactQuill
        className="size-react-quill"
        value={initialValue}
        modules={modules}
        onChange={(content: string, delta: Delta, source: Sources) => {
          onChange && onChange(content);
        }}
        ref={quillInstance}
      />
    );
  },
  (prevProps, currentProps) => true,
);

export default Wysiwyg;

// import { Quill } from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// const icons = Quill.import('ui/icons');

// export const fontFamilyArr = ['Prompt', 'TH Sarabun'];
// const fonts = Quill.import('attributors/style/font');
// fonts.whitelist = fontFamilyArr;
// Quill.register(fonts, true);

// const fontSizeArr = [
//   '8px',
//   '16px',
//   '18px',
//   '20px',
//   '24px',
//   '28px',
//   '32px',
//   '42px',
//   '54px',
//   '68px',
//   '84px',
//   '98px',
// ];
// const Size = Quill.import('attributors/style/size');
// Size.whitelist = fontSizeArr;
// Quill.register(Size, true);

// icons['undo'] = `<svg viewbox="0 0 18 18">
// <polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon>
// <path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path>
// </svg>`;

// icons['redo'] = `<svg viewbox="0 0 18 18">
// <polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon>
// <path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path>
// </svg>`;

// export const toolbarOptions = [
//   { header: ['1', '2', '3', '4'] },
//   { font: fontFamilyArr },
//   { size: fontSizeArr },
//   {},
//   'bold',
//   'italic',
//   'underline',
//   'strike',
//   'link',
//   {
//     color: [
//       '#000000',
//       '#666666',
//       '#999999',
//       '#cccccc',
//       '#d9d9d9',
//       '#f3f3f3',
//       '#ffffff',
//       '#ff0000',
//       '#ff9900',
//       '#ffff00',
//       '#00ff00',
//       '#4a86e8',
//       '#9900ff',
//       '#ff00ff',
//       '#f4cccc',
//       '#fce5cd',
//       '#fff2cc',
//       '#d9ead3',
//       '#c9daf8',
//       '#d9d2e9',
//       '#ead1dc',
//       '#ea9999',
//       '#f9cb9c',
//       '#ffe599',
//       '#b6d7a8',
//       '#a4c2f4',
//       '#b4a7d6',
//       '#d5a6bd',
//       '#e06666',
//       '#f6b26b',
//       '#ffd966',
//       '#93c47d',
//       '#6d9eeb',
//       '#8e7cc3',
//       '#c27ba0',
//       '#cc0000',
//       '#e69138',
//       '#f1c232',
//       '#6aa84f',
//       '#3c78d8',
//       '#674ea7',
//       '#a64d79',
//       '#990000',
//       '#b45f06',
//       '#bf9000',
//       '#38761d',
//       '#1155cc',
//       '#351c75',
//       '#741b47',
//       '#660000',
//       '#783f04',
//       '#7f6000',
//       '#274e13',
//       '#1c4587',
//       '#20124d',
//       '#4c1130',
//     ],
//   },
//   { list: 'ordered' },
//   { list: 'bullet' },
//   { align: '' },
//   { align: 'center' },
//   { align: 'right' },
//   { align: 'justify' },
//   { direction: 'rtl' },
//   { script: 'sub' },
//   { script: 'super' },
//   { indent: '+1' },
//   'clean',
//   'image',
//   'blockquote',
//   'undo',
//   'redo',
// ];
