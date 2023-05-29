import React, { useEffect, useState } from "react";
import { URL_PROFILE } from "../Utils/Url";
import { Link, useParams } from "react-router-dom";
import useGet from "../Hooks/useGet";
import useApiMethod from "../Hooks/useApiMethod";
import useLocalStorage from "../Hooks/useLocalestorage";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../Components/Profile/schema";

const VenueBooking = ({ data }) => {
  return (
    <div>
        <div>
          <h2 class="color1 pad10">Created venues</h2>
            <div class="cards">
              {data?.venues.map((venue, idx) => {
                return (
                  <div class="card"
                    key={idx}
                  >
                    <img class="img" src={venue.media[0]} alt={venue.name} />
                    <h2 class="color1 pad10">{venue.name}</h2>
                    <h3 class="color1 pad10"> $ {venue.price}</h3>
                      <Link to={`/Venue/${venue.id}`}>
                        <button class="submit">View venue</button>
                      </Link>
                  </div>
                );
              })}
            </div>
            <h2 class="color1 pad10">My bookings</h2>
            <div class="cards">
              {data?.bookings.map((booking, idx) => {
                return (
                  <div class="card"
                    key={idx}>
                      <img class="img"
                          src={booking.venue.media[0]}
                          alt={booking.venue.name}
                        />
                    <h2 class="color1 pad10">{booking.venue.name}</h2>
                    <h3 class="color1 pad10"> $ {booking.venue.price}</h3>
                      <Link to={`/Venue/${booking.venue.id}`}>
                        <button class="submit">View Venue</button>
                      </Link>
                  </div>
                );
              })}
            </div>
        </div>
    </div>
  );
};


const Modals = ({ modal, handleOk, handleCancel }) => {
  const {
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <Modal open={modal} onCancel={handleCancel} onOk={handleSubmit(handleOk)}>
      <div>
        <input
          class="input"
          style={{padding: 20}}
          {...register("avatar")}
          type='url'
          placeholder={"Change avatar"}
        />
      </div>
    </Modal>
  );
};

const Profile = () => {
  const [getData, data] = useGet();
  const [fetchData, datas, isError, response] = useApiMethod();
  const [avatar, setAvatar] = useLocalStorage("avatar");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (data) => {
    fetchData(`${URL_PROFILE}/${name}/media`, "PUT", data);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { name } = useParams();
  const profileName = JSON.parse(localStorage.getItem("name"));

  useEffect(() => {
    getData(`${URL_PROFILE}/${name}?_venues=true&_bookings=true`);
  }, [name]);

  if (!data) {
    return <h2>Loading</h2>;
  }
  if (isError) {
    console.log(isError);
  }
  if (datas) {
    setAvatar(datas.avatar);
  }
  if (response?.status === 200) {
    window.location.reload();
  }

  return (
    <div>
      <div class="flex">
        <div class="margin">
          <img
            class="img"
            src={data?.avatar}
            alt={data?.name}
          />
        </div>
          <h1>{data?.name}</h1>
        <div class="margin">
          {name === profileName ? (
            <button class="submit" onClick={showModal}>Change avatar</button>
          ) : (
            ""
          )}
          <Link to={"/CreateVenue"}>
            <button class="submit">Create venue</button>
          </Link>
        </div>
      </div>
      <VenueBooking data={data} profileName={profileName} />
      <Modals
        modal={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        data={data}
        name={profileName}
      />
    </div>
  );
};

export default Profile;