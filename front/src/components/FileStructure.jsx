import React from 'react';
import Node from "./Node/Node";

const FileStructure = ({fileStructure}) => {

  return (
    <div style={{marginLeft: 10, paddingBottom: 10}}>
      {fileStructure?.map(child =>
        <Node name={child.name}
              type={child.type}
              children={child.children}
              path={child.path}
              key={child.path}
              parent={child}
        />
      )}
    </div>
  );
};

export default FileStructure;
