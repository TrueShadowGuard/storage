import React from 'react';
import {Item, Menu, Separator} from "react-contexify";

const ContextMenu = ({buttons, id}) => {
  return (
    <Menu id={id}>
      <Item onClick={buttons[0].action}>{buttons[0].title}</Item>
      {buttons.slice(1).map((button) =>
        <>
          <Separator />
          <Item onClick={button.action}>{button.title}</Item>
        </>
      )}
    </Menu>
  );
};

export default ContextMenu;
