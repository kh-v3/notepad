import React, {useEffect, useState} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

import { fbAuth } from './firebase';
import { IBookmark } from 'util/type';
import { useAppDispatch } from 'store';
import { setUser } from 'store/userSlice';
import Bookmark from 'components/Bookmark';
import NoteSpine from "components/NoteSpine";
import DimLayer from 'components/DimLayer';

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [bookmarkList, setBookmarkList] = useState<IBookmark[]>([]);
  const changeBookmark = (bookmarkId: number) => {
    // request select api
    // navigate(`/${bookmarkId}`);
  }

  useEffect(() => {
    onAuthStateChanged(fbAuth, (user) => {
      if (user) {
        alert('user info exist!!');
        console.log('user is ', user.email);
        dispatch(setUser({
          displayName: user.displayName || '',
          email: user.email || '',
        }));
        // 나중에 서버에 유저정보 필요하면 쓰면 될듯
        // console.log('>>> ', user.getIdTokenResult().then((res) => {console.log(res)}));
      } else {
        alert('user info not exist!!');
        console.log(user);
      }

      // setInit(true);
    });
  }, []);

  return (
    <>
      <div className="note__container">
        <NoteSpine />

        <section className="note__body">
          <aside className="note__left-side">
            <div className="bookmark__list">
              {bookmarkList.map((item) => (
                <Bookmark bookmark={item} onClick={() => changeBookmark(item.bm_id)} isSelected={false} />
              ))}
            </div>
          </aside>

          <Outlet />
        </section>
      </div>

      <DimLayer />
    </>
  );
}

export default App;
