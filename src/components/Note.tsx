import React from "react";

import {INote} from 'util/type';

type TProps = {
  note: INote;
}

function Note(props: TProps) {
  const { note } = props;
  return (
    <div className="post__cell">
      <div className="post">
        <a href="/detail" className="post__link"><span className="hidden-text">상세보기</span></a>
        <div className="post__title">{ note.title }</div>
        <div className="post__thumbnail">
          <img src={note.thumbnailSrc} alt="" />
        </div>
        <div className="post__content">{ note.content }</div>
        <div className="post__regist-date">{ note.registDate }</div>
      </div>
    </div>
  );
}

export default Note;