import { useState } from "react";
const usePostApi = () => {
  const [data, setData] = useState(null);
  const [datas, setDatas] = useState(null);
  const [response, setResponse] = useState("");
  const [isError, setIsError] = useState(false);

  const postData = async (url, options = {}) => {
    try {
      setIsError(false);
      const fetchedData = await fetch(url, options);
      if (!fetchedData.ok) {
        throw new Error(fetchedData.status);
      }
      const json = await fetchedData.json();
      setData(json);
      setDatas(json);
      setResponse(fetchedData);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
    }
  };
  return { data, datas, response, isError, postData };
};

export default usePostApi;
