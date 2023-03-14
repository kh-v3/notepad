import React from 'react';

import { useAppSelector, useAppDispatch } from 'store';
import { getPopup } from 'store/popupSlice';
import PopupAuth from 'components/PopupAuth';
import PopupManageBookmark from 'components/PopupManageBookmark';

function DimLayer() {
  const popup = useAppSelector(getPopup);

  return (
    <div className={`dim-layer ${popup.dimmed ? 'dimmed' : ''}`}>
      {popup.popupAuth && <PopupAuth />}
      {popup.popupManageBookmark && <PopupManageBookmark />}
    </div>
  );
}

export default DimLayer;