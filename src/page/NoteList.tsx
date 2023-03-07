import React, {useState} from 'react';

import {INote} from 'util/type';
import Note from 'components/Note';

function NoteList() {
  const [list, setList] = useState<INote[]>([]);

  return (
    <article className="post__grid">
      {list.map((item) => (
        <Note key={ item.id } note={ item } />
      ))}
    </article>
  );
}

export default NoteList;