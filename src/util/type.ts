export interface IBookmark {
  bm_id: number;
  color: string;
  bm_name: string;
  bm_order: number;
}

export interface INote {
  id: number;
  title: string;
  thumbnailSrc: string;
  content: string;
  registDate: string;
}

export interface IUser {
  displayName: string;
  email: string;
}

export interface IPopup {
  dimmed: boolean;
  popupAuth: boolean;
}

export interface IResult<T> {
  result: boolean;
  message?: string;
  data?: T;
}