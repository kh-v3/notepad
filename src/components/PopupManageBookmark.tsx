import React, { useEffect, useRef, useState} from 'react';

import { IPalette, IBookmark } from 'util/type';
import { useAppSelector, useAppDispatch } from 'store';
import { setPopup } from 'store/popupSlice';
import { getBookmark } from 'store/bookmarkSlice';
import Palette from 'components/Palette';

const PopupManageBookmark = () => {
  const dispatch = useAppDispatch();
  // const bookmarkList = useAppSelector(getBookmark);
  const [bookmarkList, setBookmarkList] = useState<IBookmark[]>([]);
  const [palette, setPalette] = useState<IPalette[]>([]);
  const [newPalette, setNewPalette] = useState<IPalette>({
    show: false,
    top: 0,
    left: 0,
    selectedColor: '',
  });
  const [newBookmarkName, setNewBookmarkName] = useState('');
  const refPalette = useRef<null | HTMLDivElement>(null);
  const refNewPalette = useRef<null | HTMLDivElement>(null);
  const onClickClosePopup = () => {
    dispatch(setPopup({
      dimmed: false,
      popupManageBookmark: false,
    }));
  };
  const showPalette = (indexBookmark: number | string, e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;

    if (indexBookmark === 'new') {
      setNewPalette({
        show: true,
        top: target.getBoundingClientRect().top + 40,
        left: target.getBoundingClientRect().left,
        selectedColor: '',
      });
    } else {
      const changedPalette = palette.map((item, i) => {
        if (i === indexBookmark) {
          return {
            show: true,
            top: target.getBoundingClientRect().top + 40,
            left: target.getBoundingClientRect().left,
            selectedColor: '',
          }
        } else {
          return item;
        }
      });

      setPalette(changedPalette);
    }
  };
  const closePalette = (indexPalette: number | string, selectedColor: string) => {
    console.log(indexPalette, selectedColor);

    if (indexPalette === 'new' && refNewPalette.current) {
      refNewPalette.current.classList.value = 'bookmark__color ' + selectedColor;

      setNewPalette({
        show: false,
        top: 0,
        left: 0,
        selectedColor: selectedColor,
      });
    } else if (typeof indexPalette === 'number') {
      console.log('bookmark list!!');
    }
    // refNewPalette.current?.classList = 'bookmark__color ' + selectedColor;
    // setPalette({
    //   ...palette,
    //   [indexPalette]: {
    //     ...palette[indexPalette],
    //     selectedColor: selectedColor,
    //   }
    // });
  };
  const onChangeNewBookmarkName = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setNewBookmarkName(e.target.value);
  };
  const onClickAddNewBookmark = () => {
    setPalette((prev) => {
      return [...prev, newPalette];
    });
    setBookmarkList((prev) => {
      return [...prev, {
        bm_id: 999,
        color: newPalette.selectedColor,
        bm_name: newBookmarkName,
        bm_order: bookmarkList.length,
      }];
    });
  };

  useEffect(() => {
    console.log('detect change bookmark list : ', bookmarkList);

    setPalette(bookmarkList.map(() => ({
      show: false,
      top: 0,
      left: 0,
      selectedColor: '',
    })));
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
              onClick={showPalette.bind(this, i)}
              ref={refPalette}
            ></div>
          { palette[i]?.show && (
            <Palette
              indexPalette={i}
              top={palette[i].top}
              left={palette[i].left}
              closePalette={closePalette}
            />)
          }
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
              onClick={showPalette.bind(this, 'new')}
              ref={refNewPalette}
            ></div>
          { newPalette?.show &&
            <Palette
              indexPalette='new'
              top={newPalette.top}
              left={newPalette.left}
              closePalette={closePalette}
            />
          }
            <input
              type="text"
              className="bookmark__name__type--add"
              placeholder="북마크 명을 입력해주세요."
              onChange={onChangeNewBookmarkName}
              value={newBookmarkName}
            />
            <div className="bookmark__add" onClick={onClickAddNewBookmark}></div>
          </div>
      </div>
      <div className="popup__footer">
        <button type="button" className="btn buttonOk">확인</button>
      </div>
    </div>
  );
}

export default PopupManageBookmark;