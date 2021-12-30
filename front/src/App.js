import getFileStructure from "./network/getFileStructure";
import {useEffect, useState, useCallback, createContext} from "react";
import FileStructure from "./components/FileStructure";
import TitleBar from "./components/TitleBar/TitleBar";

import "./styles/main.css"

export const SelectedNodesContext = createContext({});
export const FileStructureContext = createContext(null);

function App() {

  const [fileStructure, setFileStructure] = useState(undefined);

  const updateFileStructure = useCallback(() => {
    getFileStructure().then(setFileStructure);
  }, []);

  useEffect(updateFileStructure, []);

  const [selectedNodes, setSelectedNodes] = useState([]);

  return (
    <FileStructureContext.Provider value={{updateFileStructure}}>
      <SelectedNodesContext.Provider value={{selectedNodes, setSelectedNodes}}>
        <TitleBar/>
        <FileStructure fileStructure={fileStructure}/>
      </SelectedNodesContext.Provider>
    </FileStructureContext.Provider>
  );
}

export default App;
