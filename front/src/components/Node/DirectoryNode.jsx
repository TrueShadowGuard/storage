import React from 'react';
import s from "../../styles/node.module.css";
import Node from "./Node";
import Folder from "../../images/Folder.png"
import Down from "../../images/arrow-down.jpg";
import Right from "../../images/arrow-right.png";
import {useState} from "react";


const DirectoryNode = ({name, children, onClick}) => {
  const [childrenHidden, setChildrenHidden] = useState(true);
  const arrowImage = childrenHidden ? Right : Down;
  return (
    <>
      <div className={s.nodeHeader} onClick={onClick} onDoubleClick={onDoubleClick}>
        <img className={s.arrow} src={arrowImage} alt={"arrow down"} onClick={e => setChildrenHidden(!childrenHidden)}/>
        <img src={Folder} alt="folder image" className={s.typeIcon}/>
        <span>{name}</span>
      </div>
      <div style={{marginLeft: "20px"}}>
        {!childrenHidden && children && children.map && children.map(child =>
          <Node type={child.type} name={child.name} path={child.path} children={child.children}/>
        )}
      </div>
    </>
  );

  function onDoubleClick(e) {
    setChildrenHidden(!childrenHidden);
  }
};

export default DirectoryNode;
