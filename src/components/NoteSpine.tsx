import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

import { useAppSelector, useAppDispatch } from 'store';
import { getUser, resetUser } from 'store/userSlice';
import { setPopup } from 'store/popupSlice';
import { fbSignOut } from '../firebase';

function NoteSpine() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const [currentPage, setCurrentPage] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const setDisplayButton = () => {
    const elementBody = document.querySelector('body') as HTMLBodyElement;
    const displayWidth = elementBody.getBoundingClientRect().width;

    // 라우트 경로에 따라 버튼 추가 조절 필요
    console.log('display width : ', displayWidth);
    if (displayWidth > 800) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  };
  const onClickSetting = () => {
    if (user.email === ''){
      // popup signIn
      dispatch(setPopup({
        dimmed: true,
        popupAuth: true,
        // nextStep: 진행했어야할 로직 저장 후 실행
      }));
      return;
    }

    // popup setting
    console.log('popup setting');
  };
  const onClickSignOut = async () => {
    dispatch(resetUser());
    await fbSignOut();
  };

  useEffect(() => {
    console.log(location);
    const { pathname } = location;

    switch (pathname) {
      case '/':
        setCurrentPage('list');
        break;
      case '/write':
        setCurrentPage('write');
        break;
      case '/detail':
        setCurrentPage('detail');
        break;
      default:
        break;
    }
  }, [location]);

  useEffect(() => {
    setDisplayButton();
    window.addEventListener('resize', setDisplayButton);

    return () => {
      window.removeEventListener('resize', setDisplayButton);
    }
  }, []);

  return (
    <header className="note__spine">
      <div className="spine__side">
        <button type="button" className="btnIcon svg--gear-solid" onClick={onClickSetting}>
          <span className="hidden-text">설정</span>
        </button>
      </div>
      <div className="spine__title" onClick={onClickSignOut}>lkh's notepad</div>
      <div className="spine__side spine__side--right">
      {currentPage === 'list' && !isMobile &&
        <a href="/write" className="aIcon">
          <img alt="" className="svg--pen-to-square-solid"/><span className="hidden-text">새 노트</span>
        </a>
      }
      {currentPage === 'write' && !isMobile &&
        <button type="button" className="btnIcon svg--floppy-disk-solid">
          <span className="hidden-text">저장</span>
        </button>
      }
      {currentPage === 'detail' && !isMobile &&
        <button type="button" className="btnIcon svg--trash-can-solid-white">
          <span className="hidden-text">삭제</span>
        </button>
      }
      {currentPage === 'list' && isMobile &&
        <button type="button" className="btnIcon svg--bars-solid">
          <span className="hidden-text">메뉴</span>
        </button>
      }
      {currentPage === 'list' && isMobile &&
        <button type="button" className="btnIcon svg--xmark-solid-white">
          <span className="hidden-text">닫기</span>
        </button>
      }
        <div className="menu-list menu-list__type--menu hide">
        {currentPage === 'list' && isMobile &&
          <div className="menu moveWriteNote">
            <button type="button" className="btnIcon svg--pen-to-square-solid">
              <span className="hidden-text">새 노트</span>
            </button>
            <div className="menu__name">새 노트</div>
          </div>
        }
        {currentPage === 'list' && isMobile &&
          <div className="menu" id="showBookmarkList">
            <button type="button" className="btnIcon svg--bookmark-solid">
              <span className="hidden-text">북마크</span>
            </button>
            <div className="menu__name">북마크</div>
          </div>
        }
        </div>
      </div>
    </header>
  );
}

export default NoteSpine;