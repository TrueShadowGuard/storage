import React, {useContext} from 'react';
import DirectoryNode from "./DirectoryNode";
import FileNode from "./FileNode";
import s from "../../styles/node.module.css";
import {SelectedNodesContext} from "../../App";

const Node = (props) => {

  const type = props.type;
  const name = props.name;
  const path = props.path;
  const children = props.children;

  const {selectedNodes, setSelectedNodes} = useContext(SelectedNodesContext);
  const isSelected = selectedNodes[path];

  const className = getClassName(s, isSelected);

  return (
    <div className={className}>
      {type === "file" ?
        <FileNode name={name} onClick={handleNodeClick(path)}/> :
        <DirectoryNode name={name} children={children} onClick={handleNodeClick(path)}/>
      }
    </div>
  );

  function handleNodeClick(path) {
    return function(e) {
      setSelectedNodes({[path]: true});
      console.log('click node', e)
    }
  }
};

const getClassName = (s, isSelected) => isSelected ? `${s.node} ${s.selected}` : `${s.node}`;

export default Node;
