import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { URL_REG } from "../Utils/Url";
import { Link } from "react-router-dom/dist";
import { schema } from "../Components/Register/schema";
import usePostApi from "../Hooks/usePostApi";


const Registration = () => {
  const {
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { response, isError, postData } = usePostApi();
  async function onSubmit(data) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    await postData(URL_REG, options);

    if (isError) {
      console.warn(isError);
    }
  }
  if (response.status === 201) {
    window.location.href = "/Login";
  }

  return (
    <>
      <div class="body">
      <div class="form">
      <div class="input-container ic1">
        <input {...register("name")} id="Name" placeholder=' ' class="input" /> <div class="cut"></div ><label for="Name" class="placeholder">
            Username
          </label></div>
        <div class="input-container ic2"> <input {...register("email")} id="email" placeholder=' ' class="input" /><div class="cut"></div><label for="email" class="placeholder">
            Email
          </label></div>
        <div class="input-container ic2"><input
          {...register("password")}
          placeholder=' '
          type='password'
          class="input"
          id="password"
        /><div class="cut"></div><label for="password" class="placeholder">
        Password
      </label></div>
      <div class="input-container ic2"><input {...register("avatar")} id="avatar" placeholder=' ' class="input" /><div class="cut"></div><label for="avatar" class="placeholder">
            Avatar
          </label></div>
      
      <div>
        <button class="submit submit:active" onClick={handleSubmit(onSubmit)}>
          Register
        </button>
      
        <Link class="color1" to='/Login'>Login here</Link><div class="cut"></div>
      </div></div></div>
    </>
  );
};

export default Registration;

