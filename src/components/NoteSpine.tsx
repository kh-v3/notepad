import React, {useEffect, useState} from 'react';

import { useAppSelector } from 'store';
import { getUser } from 'store/userSlice';
import {useLocation} from "react-router-dom";

function NoteSpine() {
  const location = useLocation();
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
  }

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
        <button type="button" className="btnIcon svg--gear-solid">
          <span className="hidden-text">설정</span>
        </button>
      </div>
      <div className="spine__title" id="title">lkh's notepad</div>
      <div className="spine__side spine__side--right">
      {user && currentPage === 'list' && !isMobile &&
        <a href="/write" className="aIcon">
          <img alt="" className="svg--pen-to-square-solid"/><span className="hidden-text">새 노트</span>
        </a>
      }
      {user && currentPage === 'write' && !isMobile &&
        <button type="button" className="btnIcon svg--floppy-disk-solid">
          <span className="hidden-text">저장</span>
        </button>
      }
      {user && currentPage === 'detail' && !isMobile &&
        <button type="button" className="btnIcon svg--trash-can-solid-white">
          <span className="hidden-text">삭제</span>
        </button>
      }
      {user && currentPage === 'list' && isMobile &&
        <button type="button" className="btnIcon svg--bars-solid">
          <span className="hidden-text">메뉴</span>
        </button>
      }
      {user && currentPage === 'list' && isMobile &&
        <button type="button" className="btnIcon svg--xmark-solid-white">
          <span className="hidden-text">닫기</span>
        </button>
      }
        <div className="menu-list menu-list__type--menu hide">
        {user && currentPage === 'list' && isMobile &&
          <div className="menu moveWriteNote">
            <button type="button" className="btnIcon svg--pen-to-square-solid">
              <span className="hidden-text">새 노트</span>
            </button>
            <div className="menu__name">새 노트</div>
          </div>
        }
        {user && currentPage === 'list' && isMobile &&
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