import React from 'react';
import {Item, Menu, Separator} from "react-contexify";

const DirectoryContextMenu = ({id, onDeleteClick, onDownloadClick}) => {
  return (
    <Menu id={id}>
      <Item onClick={onDownloadClick}>Download</Item>
      <Separator />
      <Item onClick={onDeleteClick}>Delete</Item>
    </Menu>
  );
};

export default DirectoryContextMenu;
