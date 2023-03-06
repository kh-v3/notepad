import React from 'react';

function NoteWrite() {
  return (
    <article className="write-wrap">
      <div className="write__bookmark">
        <select name="bookmark" className="bookmark__select">
          <option value="">선택 아님sssssssssssssssssssssssssssssssssssssssss</option>
          <option value="">선택!!</option>
          <option value="">선택 아님2</option>
          <option value="">새 카테고리</option>
        </select>
        <div className="bookmark__color selectedColor palette__color--deep-red"></div>
        <input type="text" className="bookmark__name" placeholder="북마크 명을 입력해주세요." />
      </div>
      <hr />
      <div className="write__title">
        <input type="text" className="title__name" placeholder="제목을 입력해주세요." />
      </div>
      <hr />
      <div className="write__editor">
        <div className="editor-wrap">에디터 영역</div>
      </div>
      <hr />
    </article>
  );
}

export default NoteWrite;