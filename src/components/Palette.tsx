import * as React from "react";

interface props {
  top: number,
  left: number,
  closePalette: Function,
}

const Palette = ({ top = 0, left = 0, closePalette }: props) => {
  const style:React.CSSProperties = {
    top: top + 'px',
    left: left + 'px',
  }
  const selectColor = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;

    closePalette(target.classList[0]);
  }

  return (
    <div className="palette" onClick={selectColor} style={style}>
      <div className="palette__color--deep-red"></div>
      <div className="palette__color--red"></div>
      <div className="palette__color--orrange"></div>
      <div className="palette__color--light-green"></div>
      <div className="palette__color--green"></div>
      <div className="palette__color--light-blue"></div>
      <div className="palette__color--blue"></div>
      <div className="palette__color--deep-blue"></div>
      <div className="palette__color--puple"></div>
      <div className="palette__color--grey"></div>
    </div>
  );
};

export default Palette;