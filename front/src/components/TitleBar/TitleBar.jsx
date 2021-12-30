import React, {useContext} from 'react';
import {IconButton, Tooltip} from "@mui/material";
import {DownloadRounded, Folder} from "@mui/icons-material";
import styled from "@emotion/styled";
import {grey} from "@mui/material/colors";
import createFolder from "../../network/createFolder";
import {FileStructureContext} from "../../App";

const TitleBarStyled = styled.div({
  padding: "5px",
  borderBottom: "1px solid gray"
});

const TitleBar = () => {

  const {updateFileStructure} = useContext(FileStructureContext)

  return (
    <TitleBarStyled>
      <Tooltip title="Create new top-level folder">
        <IconButton onClick={() => createTopLevelFolder(updateFileStructure)}>
          <Folder/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Download storage as zip">
        <IconButton>
          <DownloadRounded/>
        </IconButton>
      </Tooltip>
    </TitleBarStyled>
  );
};

async function createTopLevelFolder(updateFileStructure) {
  const ok = await createFolder("");
  if(ok) updateFileStructure();
}

export default TitleBar;
