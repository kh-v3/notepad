import React from 'react';

function NoteSpine() {
  return (
    <header className="note__spine">
      <div className="spine__side">
        <button type="button" className="btnIcon svg--gear-solid" id="showPopupSetting"></button>
      </div>
      <div className="spine__title" id="title">lkh's notepad</div>
      <div className="spine__side spine__side--right">
        <a href="/write" className="aIcon wide-screen"><img alt="" className="svg--pen-to-square-solid" /><span className="hidden-text">새 노트</span></a>
        <button type="button" className="btnIcon svg--floppy-disk-solid" id="saveNote"><span className="hidden-text">저장</span></button>
        <button type="button" className="btnIcon svg--trash-can-solid-white wide-screen"><span className="hidden-text">삭제</span></button>
        <button type="button" className="btnIcon svg--bars-solid" id="showMenu"><span className="hidden-text">메뉴</span></button>
        <button type="button" className="btnIcon svg--xmark-solid-white" id="hideMenu"><span className="hidden-text">닫기</span></button>
        <div className="menu-list menu-list__type--menu hide" id="menuMain">
          <div className="menu moveWriteNote">
            <button type="button" className="btnIcon svg--pen-to-square-solid"><span className="hidden-text">새 노트</span></button>
            <div className="menu__name">새 노트</div>
          </div>
          <div className="menu" id="showBookmarkList">
            <button type="button" className="btnIcon svg--bookmark-solid"><span className="hidden-text">북마크</span></button>
            <div className="menu__name">북마크</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NoteSpine;