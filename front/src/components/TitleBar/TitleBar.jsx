import React, {useContext} from 'react';
import {IconButton, Tooltip} from "@mui/material";
import {DownloadRounded, Folder, Logout} from "@mui/icons-material";
import styled from "@emotion/styled";
import createFolder from "../../network/createFolder";
import {FileStructureContext} from "../pages/MainPage";
import downloadNode from "../../network/downloadNode";
import {useParams} from "react-router-dom";
import {red} from "@mui/material/colors";

const TitleBarStyled = styled.div({
  padding: "5px",
  borderBottom: "1px solid gray"
});

const TitleBar = () => {

  const {updateFileStructure} = useContext(FileStructureContext);

  const {userId} = useParams();

  return (
    <TitleBarStyled>
      <Tooltip title="Create new top-level folder">
        <IconButton onClick={() => createTopLevelFolder(updateFileStructure, userId)}>
          <Folder/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Download storage as zip">
        <IconButton onClick={() => downloadStorage(userId)}>
          <DownloadRounded/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Logout">
        <IconButton onClick={() => logout()}>
          <Logout sx={{color: red[600]}}/>
        </IconButton>
      </Tooltip>
    </TitleBarStyled>
  );
};

async function createTopLevelFolder(updateFileStructure, userId) {
  const ok = await createFolder("", userId);
  if(ok) updateFileStructure();
}

function downloadStorage(userId) {
  downloadNode(".", userId);
}

function logout() {
  window.localStorage.clear();
  window._navigate("/login");
}

export default TitleBar;
