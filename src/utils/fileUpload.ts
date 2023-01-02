import axios from "axios";

export const s3FileUpload = async (file: File | null, name: string) => {
  if (!file) return;
  console.log(file.name);

  const { data } = await axios.post("/api/test", {
    name: name,
    type: file.type,
  });
  const url = data.url;

  return await axios.put(url, file);
};
