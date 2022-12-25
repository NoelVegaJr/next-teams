import axios from "axios";

export const s3FileUpload = async (file: File | null) => {
  if (!file) return;

  const { data } = await axios.post("/api/test", {
    name: file.name,
    type: file.type,
  });
  const url = data.url;

  return await axios.put(url, file);
};
