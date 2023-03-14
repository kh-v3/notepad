import React, { useState } from 'react';

import { useAppDispatch } from 'store';
import { setUser } from 'store/userSlice';
import { setPopup } from 'store/popupSlice';
import { fbSignIn } from '../firebase';

function PopupAuth() {
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState('');
  const onClickClosePopup = () => {
    dispatch(setPopup({
      dimmed: false,
      popupAuth: false,
    }));
  };
  const onChangePassword = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(e.target.value);
  };
  const onClickSignIn = () => {
    fbSignIn(password)
      .then((result) => {
        dispatch(setUser({
          displayName: result.data?.displayName || '',
          email: result.data?.email || '',
        }));
        dispatch(setPopup({
          dimmed: false,
          popupAuth: false,
        }));
      })
      .catch((fail) => {
        alert(fail.message);
      });
  };

  return (
    <div className="popup popup__type--auth">
      <div className="popup__header">
        <div className="popup__title">Are you lkh?</div>
        <div className="popup__close closePopup" onClick={onClickClosePopup}></div>
      </div>
      <div className="popup__body">
        <input
          type="password"
          className="popup__password"
          placeholder="비밀번호를 입력해주세요."
          onChange={onChangePassword}
          value={password}
        />
      </div>
      <div className="popup__footer">
        <button type="button" className="btn buttonOk" onClick={onClickSignIn}>확인</button>
      </div>
    </div>
  );
}

export default PopupAuth;