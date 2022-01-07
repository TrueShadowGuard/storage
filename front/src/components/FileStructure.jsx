import React from 'react';
import Node from "./Node/Node";
import DetailedNode from "./DetailedNode/DetailedNode";

const FileStructure = ({fileStructure, detailedNode}) => {

  return (
    <div style={{marginLeft: 10, paddingBottom: 10}}>
      {fileStructure?.map(child =>
        <Node key={child.path}
              node={child}
        />
      )}
    </div>
  );
};

export default FileStructure;
