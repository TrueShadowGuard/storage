export default async function downloadNode(path, userId) {
  const downloadUrl = process.env.NODE_ENV === "production" ?
    window.location.origin + "/user/" + userId + "/download-node?path=" + path :
    window.location.origin.replace(":3000", ":80") + "/user/" + userId + "/download-node?path=" + path
  const res = await fetch(downloadUrl, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token")
    }
  });
  const blob = await res.blob();
  const fileName = res.headers.get("X-File-Name");
  const a = document.createElement("a");
  a.download = fileName;
  const url = URL.createObjectURL(blob);
  a.href = url;
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 20000)
};
