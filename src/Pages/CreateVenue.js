import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../Components/Change/schema";
import { useForm } from "react-hook-form";
import { URL_POST_VENUES } from "../Utils/Url";
import useApiMethod from "../Hooks/useApiMethod";
import { URL_PROFILE } from "../Utils/Url";
import useLocalStorage from "../Hooks/useLocalestorage";
import { Link } from "react-router-dom";

const CreateVenue = () => {
  const [fetchData, datas, isError, response] = useApiMethod();
  const [venueManager, setVenueManager] = useLocalStorage("venueManager");

  const manager = JSON.parse(localStorage.getItem("venueManager"));

  const name = JSON.parse(localStorage.getItem("name"));
  const {
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleAdd = (data) => {
    fetchData(URL_POST_VENUES, "POST", data);
  };

  const beManager = () => {
    fetchData(`${URL_PROFILE}/${name}`, "PUT", {
      venueManager: true,
    });
  };

  if (isError) {
    console.log(isError);
  }
  if (datas?.venueManager) {
    setVenueManager(datas.venueManager);
  }
  if (response?.status === 201) {
    window.location.href = `/Venue/${datas.id}`;
  }
  if (response?.status === 200) {
    window.location.href = `/AddVenue`;
  }
  return (
    <>
    {manager === true ? (
        ""
        ) : manager === null ? (
        <div>
          <h2>Please login</h2>
            <Link to={"/Login"}>Login</Link> or{" "}
            <Link to={"/Register"}>Register</Link>
        </div>
        ) : (
        <div class="pad10 center padtop">
          <h2><Link onClick={beManager}>Become a venue manager</Link></h2>
        </div>
        )}
    <div class="body">
      <div class="form">
        <div class="input-container ic1">
        <input class="input" id="Name" {...register("name")} type='text' placeholder=' ' /><div class="cut"></div ><label for="Name" class="placeholder">
            Title
          </label></div>
          <div class="input-container ic2">
          <input
            class="input"
            id="img"
            type='text'
            placeholder=' '
            {...register(`media[0]`)}
          /><div class="cut"></div ><label for="img" class="placeholder">
          Image
        </label></div>
        <div class="input-container ic2">
        <textarea
        name='Description'
        placeholder=' '
        type="text"
        class="input"
        id='desc'
        cols='20'
        rows='5'
        {...register("description")}
        /><div class="cut"></div ><label for="desc" class="placeholder">
        Description
        </label></div>
        <div class="input-container ic2">
        <input {...register("price")} type='number' id="price" class="input" placeholder=' ' /><div class="cut"></div ><label for="price" class="placeholder">
          Price
        </label></div>
        <div class="input-container ic2">
        <input
        {...register("maxGuests")}
        type='number'
        class="input"
        id="guest"
        placeholder=' '
        /><div class="cut"></div ><label for="guest" class="placeholder">
        Max guests
        </label></div>
        <div>
        <input {...register("meta.breakfast")} type='checkbox' id="break" /><div class="cut"></div ><label for="break" class="color1">
          Breakfast
        </label>
        <input {...register("meta.wifi")} type='checkbox' id="wifi" /><div class="cut"></div ><label for="wifi" class="color1">
          Wifi
        </label>
        <input {...register("meta.pets")} type='checkbox' id="wets" /><div class="cut"></div ><label for="pets" class="color1">
          Pets
        </label>
        <input {...register("meta.parking")} type='checkbox' id="parking" /><div class="cut"></div ><label for="parking" class="color1">
          Parking
        </label>
        </div>
        <button class="submit" onClick={handleSubmit(handleAdd)}>
          Create venue
        </button>
    </div></div>
    </>
  );
};

export default CreateVenue;
