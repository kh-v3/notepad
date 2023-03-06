import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import NoteList from 'page/NoteList';
import NoteWrite from 'page/NoteWrite';
import NoteDetail from 'page/NoteDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <NoteList />,
      },
      {
        path: 'write',
        element: <NoteWrite />,
      },
      {
        path: 'detail',
        element: <NoteDetail />,
      },
    ],
  },
  /* {
    path: 'write',
    element: <NoteWrite />,
  },
  {
    path: 'detail',
    element: <NoteDetail />,
  }, */
]);

export default router;