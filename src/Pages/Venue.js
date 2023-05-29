import React from "react";
import { useParams, Link } from "react-router-dom";
import useApi from "../Hooks/useApi";
import useApiMethod from "../Hooks/useApiMethod";
import Calender from "../Components/Calendar";
import { URL_ALL_LISTINGS, URL_POST_VENUES } from "../Utils/Url";

const Venue = () => {
  const name = JSON.parse(localStorage.getItem("name"));
  const { id } = useParams();
  const [fetchData] = useApiMethod();
  const { data, isLoading, isError } = useApi(
    `${URL_ALL_LISTINGS}${id}?_bookings=true&_owner=true`
  );

  const handleDelete = () => {
    fetchData(`${URL_POST_VENUES}/${id}`, "DELETE");
  };

  if (isLoading) {
    return <h2>Loading</h2>;
  }

  if (isError) {
    console.error(isError);
  }

  return (
    <div className="grid1">
      {data.owner.name === name && (
        <div className="flex2">
          <Link to={`/ChangeVenue/${data.id}`} state={{ data }}>
            <button className="submit width1">Edit</button>
          </Link>
          <button className="submit width1" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
      <div className="flex">
        <img className="img2" src={data?.media} alt="" />
      </div>
      <div>
        <h1 className="color1">{data.name}</h1>
        <p className="p">{data.description}</p>
        <div className="flex4">
          <div className="form">
            <div className="flex2">
              <img
                className="img3"
                src={data.owner.avatar}
                alt={data.owner.name}
              />
              <Link
                className="color1 p pad10"
                to={`/Profile/${data.owner.name}`}
              >
                {data.owner.name}
              </Link>
            </div>
            <p className="color1 p left">
              On this venue:{" "}
              {data.meta.wifi && (
                <>
                  Wifi,
                </>
              )}
              {data.meta.parking && (
                <>
                  Parking,
                </>
              )}
              {data.meta.breakfast && (
                <>
                  Breakfast,
                </>
              )}
              {data.meta.pets && (
                <>
                  Pets
                </>
              )}
            </p>
            <p className="color1 p left">Guests: {data.maxGuests}</p>
            <p className="color1 p left">Price: $ {data.price} per day</p>
          </div>
          <Calender id={data.id} data={data} />
        </div>
      </div>
    </div>
  );
};

export default Venue;
