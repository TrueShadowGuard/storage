import React from 'react';
import styled from "@emotion/styled";

const Container = styled.div({
  width: "200px",
  height: "200px",
  float: "right",
  border: "1px solid #888",
  borderTop: 0
});


const DetailedNode = ({node}) => {

  if(!node?.type || node.type === "folder") return null;

  const fileInfo = node.fileInfo;
  const createDate = new Date(fileInfo.birthtimeMs).toLocaleString();


  return (
    <Container>
      <div>{node.name}</div>
      <date>created at {createDate}</date>
    </Container>
  );
};

export default DetailedNode;
