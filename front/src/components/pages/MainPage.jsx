import getFileStructure from "../../network/getFileStructure";
import {useEffect, useState, useCallback, createContext} from "react";
import FileStructure from "../FileStructure";
import TitleBar from "../TitleBar/TitleBar";

import "../../styles/main.css"
import {useNavigate, useParams} from "react-router-dom";

export const SelectedNodesContext = createContext({});
export const FileStructureContext = createContext(null);

function MainPage() {

  const [fileStructure, setFileStructure] = useState(undefined);

  const {userId} = useParams();

  const updateFileStructure = useCallback(() => {
    getFileStructure(userId).then(setFileStructure);
  }, []);

  useEffect(updateFileStructure, []);

  const [selectedNodes, setSelectedNodes] = useState([]);

  window._navigate = useNavigate();

  return (
    <FileStructureContext.Provider value={{updateFileStructure}}>
      <SelectedNodesContext.Provider value={{selectedNodes, setSelectedNodes}}>
        <TitleBar/>
        <FileStructure fileStructure={fileStructure}/>
      </SelectedNodesContext.Provider>
    </FileStructureContext.Provider>
  );
}

export default MainPage;
