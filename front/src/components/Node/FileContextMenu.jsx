import React from 'react';
import {Item, Menu, Separator} from "react-contexify";

const FileContextMenu = ({id, onDeleteClick, onDownloadClick}) => {
  return (
    <Menu id={id}>
      <Item onClick={onDownloadClick}>Download</Item>
      <Separator />
      <Item onClick={onDeleteClick}>Delete</Item>
    </Menu>
  );
};

export default FileContextMenu;
