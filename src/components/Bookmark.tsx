import React from "react";

import {IBookmark} from 'util/type';

type TProps = {
  bookmark: IBookmark;
  onClick: () => void;
  isSelected: Boolean;
}
function Bookmark(props: TProps) {
  const { bookmark, onClick, isSelected } = props;
  return (
    <div className="bookmark" onClick={onClick}>
      <div className={`bookmark__color--${bookmark.color} ${isSelected && 'bookmark__selected'}`}>{`bookmark__color--${bookmark.bm_name}`}</div>
      <div></div>
    </div>
  );
}

export default Bookmark;