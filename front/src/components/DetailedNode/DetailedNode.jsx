import React from 'react';
import styled from "@emotion/styled";

const Container = styled.div({
  width: "300px",
  height: "300px",
  float: "right"
});


const DetailedNode = ({node}) => {
  return (
    <Container>
      <div>Name: {node.name}</div>
    </Container>
  );
};

export default DetailedNode;
