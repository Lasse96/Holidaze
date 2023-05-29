import React, { useState } from "react";

const useGet = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  const getData = async (url) => {
    try {
      const postData = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(url, postData);
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err);
    }
  };
  return [getData, data, error];
};

export default useGet;
