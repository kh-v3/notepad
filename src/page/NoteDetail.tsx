import React from 'react';

function NoteDetail() {
  return (
    <article className="detail-wrap">
      <div className="detail__head">
        <div className="regist-date">2022-09-25</div>
        <div className="title">제목</div>
      </div>
      <hr />
      <div className="detail__content">
        <div className="content">본문 영역</div>
      </div>
    </article>
  );
}

export default NoteDetail;