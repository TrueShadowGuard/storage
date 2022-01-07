import React, {useContext} from 'react';
import DirectoryNode from "./DirectoryNode";
import FileNode from "./FileNode";
import s from "../../styles/node.module.css";
import {FileStructureContext, SelectedNodesContext} from "../pages/MainPage";
import {useContextMenu} from "react-contexify";
import deleteNode from "../../network/deleteNode";
import downloadNode from "../../network/downloadNode";
import createFile from "../../network/createFile";
import createFolder from "../../network/createFolder";
import readAsText from "../../utils/readAsText";
import ContextMenu from "./ContextMenu";
import renameNode from "../../network/renameNode";

import 'react-contexify/dist/ReactContexify.css';
import {useParams} from "react-router-dom";

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
  });

  const params = useParams();

  const className = getClassName(s, isSelected);

  const contextMenuButtons = [
    {action: handleDownloadClick(path, params.userId), title: "Download"},
    {action: handleCreateFileClick(path, params.userId), title: "Create file"},
    {action: handleCreateFolderClick(path, params.userId), title: "Create folder"},
    {action: handleDeleteClick(path, params.userId), title: "Delete"},
    {action: handleRenameClick(path, params.userId), title: "Rename"},
  ]

  return (
    <div className={className}>
      {type === "file" ?
        <FileNode name={name}
                  onClick={handleNodeClick(path)}
                  onContextMenu={handleRightClick(path, show)}
        /> :
        <DirectoryNode name={name}
                       children={children}
                       onClick={handleNodeClick(path)}
                       onContextMenu={handleRightClick(path, show)}
        />
      }
      <ContextMenu buttons={contextMenuButtons} id={path} />
    </div>
  );

  function handleNodeClick(path) {
    return function (e) {
      setSelectedNodes({[path]: true});
    }
  }

  function handleDeleteClick(path, userId) {
    return async function (e) {
      const ok = await deleteNode(path, userId);
      if (ok) updateFileStructure();
    }
  }

  function handleDownloadClick(path, userId) {
    return function (e) {
      downloadNode(path, userId);
    }
  }

  function handleCreateFileClick(path, userId) {
    return () => {
      const inp = document.createElement('input');
      inp.type = "file";
      inp.click();
      inp.onchange = async e => {
        const file = e.target.files[0];
        const text = await readAsText(file);
        const ok = await createFile(path, text, file.name, userId);
        if (ok) updateFileStructure();
      }
    }
  }

  function handleCreateFolderClick(path, userId) {
    return async function (e) {
      const ok = await createFolder(path, userId);
      if (ok) updateFileStructure();
    }
  }

  function handleRightClick(path, show) {
    return function (e) {
      show(e);
      setSelectedNodes({[path]: true});
    }
  }

  function handleRenameClick(path, userId) {
     return async function (e) {
       const name = window.prompt("Enter new file name");
       if(name === null) return;
       const ok = await renameNode(path, name, userId);
       if(ok) updateFileStructure();
     }
  }
};

const getClassName = (s, isSelected) => isSelected ? `${s.node} ${s.selected}` : `${s.node}`;

export default Node;
