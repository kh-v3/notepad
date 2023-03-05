import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import NoteList from 'components/NoteList';
import NoteWrite from 'components/NoteWrite';
import NoteDetail from 'components/NoteDetail';

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