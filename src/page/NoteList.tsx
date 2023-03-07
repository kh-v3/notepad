import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import {INote} from 'util/type';
import Note from 'components/Note';

function NoteList() {
  const navigate = useNavigate();
  const [list, setList] = useState<INote[]>([]);
  const moveDetail = (noteId: number) => {
    navigate(`/${noteId}`);
  };

  return (
    <article className="post__grid">
      {list.map((item) => (
        <Note key={ item.id } note={ item } onClick={() => moveDetail(item.id)} />
      ))}
    </article>
  );
}

export default NoteList;