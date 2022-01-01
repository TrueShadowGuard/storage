export default async function readAsText(file) {
  return new Promise(function(resolve, reject) {
    const fr = new FileReader();
    fr.readAsDataURL(file, "base64");
    fr.onloadend = e => {
      resolve(fr.result);
    }
  })
}
