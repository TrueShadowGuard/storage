import React from 'react';
import File from "../../images/File.png";
import s from "../../styles/node.module.css"

const FileNode = ({name, onClick, onContextMenu}) => {
  return (
    <div className={s.nodeHeader} onClick={onClick} onContextMenu={onContextMenu}>
      <img className={s.typeIcon} src={File} alt="file image" />
      <span>{name}</span>
    </div>
  );
};

export default FileNode;
