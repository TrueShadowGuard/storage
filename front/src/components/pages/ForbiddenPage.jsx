import React from 'react';
import styled from "@emotion/styled";
import {NavLink} from "react-router-dom";

const Container = styled.div({
  width: 300,
  margin: "0 auto",
  textAlign: "center",
  "& > h1": {
    fontSize: "5rem",
    margin: 0
  },
  "& > a": {
    margin: "0 5px",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
});

const ForbiddenPage = () => {

  const userId = localStorage.getItem("userId")
  const myProfileLink = userId ? "/user/" + userId : null;

  console.log(myProfileLink)

  return (
    <Container>
      <h1>403</h1>
      <div>Not enough rights </div>
      {myProfileLink && <NavLink to={myProfileLink}>My profile</NavLink>}
      <NavLink to="/login">Login</NavLink>
    </Container>
  );
};

export default ForbiddenPage;
