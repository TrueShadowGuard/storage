import React, {useState} from 'react';
import {Button, IconButton, InputAdornment, TextField} from "@mui/material";
import styled from "@emotion/styled";
import toLogin from "../../network/toLogin";
import toRegister from "../../network/toRegister";
import {useNavigate} from "react-router-dom";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const Container = styled.form({
  margin: "50px auto",
  padding: "8px",
  border: "1px solid #ccc",
  width: "300px",
  "& > *:not(:first-child)": {
    marginTop: "6px"
  }
});

const Buttons = styled.div({
  display: "flex",
  "& > *": {
    flexGrow: 1
  }
});

const defaultAuthStatus = {ok: null, text: ""};

const LoginPage = () => {

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [authStatus, setAuthStatus] = useState(defaultAuthStatus)

  const [showPassword, setShowPassword] = useState(false);
  window._navigate = useNavigate();

  const onLogin = e => (setLogin(e.target.value), setAuthStatus(defaultAuthStatus))
  const onPassword = e => (setPassword(e.target.value), setAuthStatus(defaultAuthStatus));

  console.log(authStatus);
  const color = authStatus.ok === null ? "primary" : authStatus.ok === true ? "success" : "error";
  console.log(color)

  return (
    <Container>
      <TextField fullWidth
                 label="Login"
                 color={color}
                 error={authStatus.ok === false}
                 value={login}
                 onChange={onLogin}
      /> <br/>
      <TextField fullWidth
                 type={showPassword ? "text" : "password"}
                 color={color}
                 helperText={authStatus.text}
                 label="Password"
                 value={password}
                 error={authStatus.ok === false}
                 onChange={onPassword}
                 InputProps={{
                   endAdornment: (
                     <InputAdornment position="end">
                       <IconButton
                         aria-label="toggle password visibility"
                         onClick={handleClickShowPassword}
                       >
                         {showPassword ? <Visibility /> : <VisibilityOff />}
                       </IconButton>
                     </InputAdornment>
                   )
                 }}
      /> <br/>
      <Buttons>
        <Button onClick={() => onLoginClik(login, password)}>Login</Button>
        <Button onClick={() => onRegisterClick(login, password)}>Register</Button>
      </Buttons>
    </Container>
  );

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }

  async function onLoginClik(login, password) {
    const loginStatus = await toLogin(login, password);
    if (loginStatus.ok) {
      window._navigate("/user/" + loginStatus.userId);
    } else {
      setAuthStatus(loginStatus)
    }
  }

  async function onRegisterClick(login, password) {
    const registerStatus = await toRegister(login, password);
    setAuthStatus(registerStatus);
  }
};

export default LoginPage;
