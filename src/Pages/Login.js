import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { URL_LOGIN } from "../Utils/Url";
import { Link } from "react-router-dom/dist";
import { schema } from "../Components/Login/schema";
import usePostApi from "../Hooks/usePostApi";
import useLocalestorage from "../Hooks/useLocalestorage";


const Login = () => {
  const {
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { data, response, isError, postData } = usePostApi();
  const [accessToken, setAccessToken] = useLocalestorage("accessToken");
  const [email, setEmail] = useLocalestorage("email");
  const [name, setName] = useLocalestorage("name");
  const [venueManager, setVenueManager] = useLocalestorage("venueManager");
  const [avatar, setAvatar] = useLocalestorage("avatar");
  

  async function onSubmit(data) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    await postData(URL_LOGIN, options);

    if (isError) {
      console.warn(isError);
    }
  }
  useEffect(() => {
    if (data) {
      setAccessToken(data.accessToken);
      setEmail(data.email);
      setName(data.name);
      setAvatar(data.avatar);
      setVenueManager(data.venueManager);
    }
  }, [data]);

  if (response.status === 200) {
    window.location.href = "/";
  }

  return (
    <div class="body">
      <div class="form">
      <div class="input-container ic1">
        <input {...register("email")} class="input" placeholder=' ' id="email" /><div class="cut"></div><label for="email" class="placeholder">
            Email
          </label></div>
          <div class="input-container ic2">
        <input
          type='password'
          {...register("password")}
          placeholder=' '
          id="password"
          class="input"
        /><div class="cut"></div><label for="password" class="placeholder">
        Password
      </label></div>
        <button class="submit" onClick={handleSubmit(onSubmit)}>Login</button>
        <Link class="color1" to='/Register'>Register</Link>
      </div></div>
  );
};

export default Login;

