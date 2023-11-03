export default async function uploadImage(file: File) {
  const data = new FormData();
  const url = "https://api.cloudinary.com/v1_1/dw47py5n1/auto/upload";
  data.append("file", file);
  data.append("upload_preset", import.meta.env.VITE_REACT_APP_CLOUDNARY_PRESET);
  return fetch(url, {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => data.url);
}
