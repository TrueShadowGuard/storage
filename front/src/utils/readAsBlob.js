export default async function readAsBlob(file) {
  return new Promise(function(resolve, reject) {
    const fr = new FileReader();
    fr.readAsArrayBuffer(file);
    fr.onloadend = e => {
      resolve(fr.result);
    }
  })
}
