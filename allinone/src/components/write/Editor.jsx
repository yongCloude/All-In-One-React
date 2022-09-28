import Quill from 'quill';
import React, { useEffect, useRef } from 'react';
import 'quill/dist/quill.bubble.css';
import '../../styles/Editor.scss';

const Editor = ({ title, content, onChangeField }) => {
  const quillElement = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'bubble',
      placeholder: '내용을 작성하세요...',
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'code-block', 'link', 'image'],
        ],
      },
    });

    const quill = quillInstance.current;
    quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        onChangeField({ key: 'content', value: quill.root.innerHTML });
      }
    });
  }, [onChangeField]);

  const mounted = useRef(false);
  useEffect(()=>{
    if(mounted.current) return;
    mounted.current = true;
    quillInstance.current.root.innerHTML = content;
  }, [content]);


  const onChangeTitle = (e) => {
    onChangeField({ key: 'title', value: e.target.value });
  };

  return (
    <div className="Editor">
      <input
        type="text"
        className="TitleInput"
        onChange={onChangeTitle}
        value={title}
        placeholder="제목을 입력하세요"
      />
      <div className="QuillWrapper">
        <div ref={quillElement} />
      </div>
    </div>
  );
};

export default Editor;
