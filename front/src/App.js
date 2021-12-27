import getFileStructure from "./network/getFileStructure";
import {useEffect, useState, useCallback, createContext} from "react";
import FileStructure from "./components/FileStructure";

export const SelectedNodesContext = createContext({});

function App() {

  const [fileStructure, setFileStructure] = useState(undefined);

  const updateFileStructure = useCallback(() => {
    getFileStructure().then(setFileStructure);
  }, [])

  useEffect(updateFileStructure, []);

  const [selectedNodes, setSelectedNodes] = useState([]);

  return (
    <SelectedNodesContext.Provider value={{selectedNodes, setSelectedNodes}}>
      <FileStructure fileStructure={fileStructure}/>
    </SelectedNodesContext.Provider>
  );
}

export default App;
