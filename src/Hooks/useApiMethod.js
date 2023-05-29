import { useState } from "react";
const useApiMethod = () => {
  const name = JSON.parse(localStorage.getItem("name"));
  const [datas, setDatas] = useState(null);
  const [response, setResponse] = useState(null);
  const [isError, setIsError] = useState(null);
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  const fetchData = async (url, method, data) => {
    try {
      const postData = {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(url, postData);
      const json = await response.json();
      setDatas(json);
      setResponse(response);
    } catch (error) {
      setIsError(error);
    }
    if (method === "DELETE") {
      window.location.href = `/Profile/${name}`;
    }
  };

  return [fetchData, datas, response, isError];
};

export default useApiMethod;
