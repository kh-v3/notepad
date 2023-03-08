import React, {useState} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import {IBookmark} from 'util/type';
import Bookmark from 'components/Bookmark';
import NoteSpine from "components/NoteSpine";

function App() {
  const navigate = useNavigate();
  const [bookmarkList, setBookmarkList] = useState<IBookmark[]>([]);
  const changeBookmark = (bookmarkId: number) => {
    // request select api
    // navigate(`/${bookmarkId}`);
  }

  return (
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
  );
}

export default App;
