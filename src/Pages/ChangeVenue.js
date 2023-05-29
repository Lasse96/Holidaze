import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../Components/Change/schema";
import { useForm } from "react-hook-form";
import { URL_POST_VENUES } from "../Utils/Url";
import useApiMethod from "../Hooks/useApiMethod";
import { useParams } from "react-router-dom";
import useApi from "../Hooks/useApi";


const ChangeVenue = () => {
  const { id } = useParams();
  const [fetchData, datas, isError, response] = useApiMethod();
  const { data } = useApi(`${URL_POST_VENUES}/${id}`);
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue("name", data?.name);
    setValue("description", data?.description);
    setValue("price", data?.price);
    setValue("maxGuests", data?.maxGuests);
    setValue("name", data?.name);
    setValue("media", data?.media);
    setValue("meta.pets", data.meta?.pets);
    setValue("meta.breakfast", data.meta?.breakfast);
    setValue("meta.parking", data.meta?.parking);
    setValue("meta.wifi", data.meta?.wifi);
  }, [setValue, data]);

  const handleEdit = (editInfo) => {
    fetchData(`${URL_POST_VENUES}/${id}`, "PUT", editInfo);
  };
  if (isError) {
    console.warn(isError);
  }
  console.log(response);
  if (response?.status === 200) {
    window.location.href = `/Venue/${id}`;
  }
  return (
    <>
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
        <button class="submit" onClick={handleSubmit(handleEdit)}>Edit venue
        </button>
    </div></div>
    </>
  );
};

export default ChangeVenue;
