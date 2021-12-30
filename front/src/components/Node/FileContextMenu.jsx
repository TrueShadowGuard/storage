import React from 'react';
import {Item, Menu, Separator} from "react-contexify";

const FileContextMenu = ({id, onDeleteClick, onDownloadClick, onCreateFileClick, onCreateFolderClick}) => {
  return (
    <Menu id={id}>
      <Item onClick={onDownloadClick}>Download</Item>
      <Separator />
      <Item onClick={onDeleteClick}>Delete</Item>
      <Separator />
      <Item onClick={onCreateFileClick}>Create file</Item>
      <Separator />
      <Item onClick={onCreateFolderClick}>Create folder</Item>
    </Menu>
  );
};

export default FileContextMenu;
