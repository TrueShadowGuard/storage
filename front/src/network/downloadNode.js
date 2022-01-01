import axios from "./axios";
import fileDownload from "js-file-download";

export default function downloadNode(path) {
  if(process.env.NODE_ENV === 'production') {
    const downloadUrl = window.location.href + "download-node?path=" + path;
    window.open(downloadUrl);
  } else {
    window.open("http://localhost:80/download-node?path=" + path);
  }
};
