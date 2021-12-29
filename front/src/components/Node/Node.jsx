import React, {useContext} from 'react';
import DirectoryNode from "./DirectoryNode";
import FileNode from "./FileNode";
import s from "../../styles/node.module.css";
import {FileStructureContext, SelectedNodesContext} from "../../App";
import {Item, Menu, useContextMenu, Separator} from "react-contexify";
import 'react-contexify/dist/ReactContexify.css';
import FileContextMenu from "./FileContextMenu";
import DirectoryContextMenu from "./DirectoryContextMenu";
import deleteNode from "../../network/deleteNode";
import downloadNode from "../../network/downloadNode";

const Node = (props) => {

  const type = props.type;
  const name = props.name;
  const path = props.path;
  const children = props.children;

  const {selectedNodes, setSelectedNodes} = useContext(SelectedNodesContext);
  const isSelected = selectedNodes[path];

  const {updateFileStructure} = useContext(FileStructureContext)

  const {show} = useContextMenu({
    id: path
  })

  const className = getClassName(s, isSelected);

  return (
    <div className={className}>
      {type === "file" ?
        <FileNode name={name}
                  onClick={handleNodeClick(path)}
                  onContextMenu={show}
        /> :
        <DirectoryNode name={name}
                       children={children}
                       onClick={handleNodeClick(path)}
                       onContextMenu={show}
        />
      }
      {type === "file" ?
        <FileContextMenu id={path} onDeleteClick={handleDeleteClick(path)} onDownloadClick={handleDownloadClick(path)}/> :
        <DirectoryContextMenu id={path} onDeleteClick={handleDeleteClick(path)} onDownloadClick={handleDownloadClick(path)}/>
      }
    </div>
  );

  function handleNodeClick(path) {
    return function (e) {
      setSelectedNodes({[path]: true});
      console.log('click node', e)
    }
  }

  function handleDeleteClick(path) {
    return async function (e) {
      const ok = await deleteNode(path);
      if(ok) updateFileStructure();
    }
  }

  function handleDownloadClick(path) {
    return function (e) {
      downloadNode(path);
    }
  }
};

const getClassName = (s, isSelected) => isSelected ? `${s.node} ${s.selected}` : `${s.node}`;

export default Node;
