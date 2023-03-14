import React, { useEffect, useRef, useState} from 'react';

import { IPalette, IBookmark } from 'util/type';
import { useAppSelector, useAppDispatch } from 'store';
import { setPopup } from 'store/popupSlice';
import { getBookmark } from 'store/bookmarkSlice';
import Palette from 'components/Palette';

let targetBookmark: HTMLDivElement | null = null;
let targetBookmarkColor: string = '';

const PopupManageBookmark = () => {
  const dispatch = useAppDispatch();
  const [bookmarkList, setBookmarkList] = useState<IBookmark[]>([]);
  const [palette, setPalette] = useState<IPalette>({
    show: false,
    top: 0,
    left: 0,
  });
  const [newBookmarkName, setNewBookmarkName] = useState('');
  const refNewBookmarkColor = useRef<HTMLDivElement>(null);
  const onClickClosePopup = () => {
    dispatch(setPopup({
      dimmed: false,
      popupManageBookmark: false,
    }));
  };
  const showPalette = (e: React.MouseEvent) => {
    targetBookmark = e.target as HTMLDivElement;
    targetBookmarkColor = '';

    setPalette({
      show: true,
      top: targetBookmark.getBoundingClientRect().top + 40,
      left: targetBookmark.getBoundingClientRect().left,
    });
  };
  const closePalette = (selectedColor: string) => {
    console.log(selectedColor);
    if (!targetBookmark) {
      console.warn('targetBookmark is null!!');
      return;
    }

    targetBookmark.classList.value = 'bookmark__color ' + selectedColor;
    targetBookmarkColor = selectedColor;
    setPalette({
      show: false,
      top: 0,
      left: 0,
    });

    targetBookmark = null;
  };
  const onChangeNewBookmarkName = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setNewBookmarkName(e.target.value);
  };
  const onClickAddNewBookmark = () => {
    if (newBookmarkName.trim() === '') {
      alert('뷱마크명을 입력해주세요.');
      return;
    }
    let color = '';
    const iterator = refNewBookmarkColor.current?.classList.values();

    if (!iterator) {
      console.warn('refNewBookmarkColor is null!!');
      return;
    }
    for (const item of iterator) {
      if (item.indexOf('palette__color') === 0) {
        color = item;
      }
    }
    setBookmarkList((prev) => {
      return [...prev, {
        bm_id: 999,
        color: color,
        bm_name: newBookmarkName.trim(),
        bm_order: bookmarkList.length,
      }];
    });
    setNewBookmarkName('');
  };

  useEffect(() => {
    console.log('detect change bookmark list : ', bookmarkList);

  }, [bookmarkList]);

  return (
    <div className="popup popup_type--bookmark-manage">
      <div className="popup__header">
        <div className="popup__title">Change bookmark order</div>
        <div className="popup__close" onClick={onClickClosePopup}></div>
      </div>
      <div className="popup__body">
        <div className="bookmark__list">
        {bookmarkList.map((bookmark, i) => (
          <div className="bookmark__item bookmarkItem" key={i}>
            <div
              className={`bookmark__color ${bookmark.color}`}
              onClick={showPalette}
            ></div>
            <input type="text" className="bookmark__name__type--exist" value={bookmark.bm_name} />
            <div className="bookmark__order"></div>
            <div className="bookmark__delete"></div>
          </div>
        ))}
        </div>
        <hr />
        <div className="bookmark__item bookmarkItem">
          <div
            className="bookmark__color palette__color--deep-red"
            onClick={showPalette}
            ref={refNewBookmarkColor}
          ></div>
          <input
            type="text"
            className="bookmark__name__type--add"
            placeholder="북마크 명을 입력해주세요."
            onChange={onChangeNewBookmarkName}
            value={newBookmarkName}
          />
          <div className="bookmark__add" onClick={onClickAddNewBookmark}></div>
        </div>
      {palette.show &&
        <Palette
          top={palette.top}
          left={palette.left}
          closePalette={closePalette}
        />
      }
      </div>
      <div className="popup__footer">
        <button type="button" className="btn buttonOk">확인</button>
      </div>
    </div>
  );
}

export default PopupManageBookmark;