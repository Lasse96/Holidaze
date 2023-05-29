import React from "react";
import dayjs from "dayjs";
import usePostApi from "../../Hooks/usePostApi";
import { URL_BOOKINGS } from "../../Utils/Url";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker } from "antd";
import { schema } from "./schema";
import { Link } from "react-router-dom";
import { useState } from "react";

const Calender = ({ id, data }) => {
  const dateFormat = "YYYY/MM/DD";
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const { response, isError, postData } = usePostApi();
  const name = JSON.parse(localStorage.getItem("name"));
  const [selectedDateFrom, setSelectedDateFrom] = useState(null);
  const {
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const disabledDates = data.bookings.map((date) => {
    return dayjs(date.dateFrom).startOf("day");
  });
  async function onSubmit(data) {
    const formatt = {
      ...data,
      dateFrom: dayjs(data.dateFrom).format("YYYY/MM/DD"),
      dateTo: dayjs(data.dateTo).format("YYYY/MM/DD"),
      venueId: id,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formatt),
    };
    await postData(URL_BOOKINGS, options);

    if (isError) {
      console.warn(isError);
    }
  }
  if (response.status === 201) {
    window.location.reload();
  }

  const disabledDate = (current) => {
    const today = dayjs().startOf("day");
    return (
      disabledDates.some((date) => current.isSame(date, "day")) ||
      (selectedDateFrom && current.isBefore(selectedDateFrom, "day")) ||
      current.isBefore(today)
    );
  }

  return (
    <div className="body2">
      <div className="form">
        <div>
          <div className="flex3">
            <h2 className="color1">From:</h2>
            <h2 className="color1">To:</h2>
          </div>
          <div className="flex3">
            <DatePicker
              onChange={(value) => {
                console.log(value);
              }}
              defaultValue={dayjs()}
              format={dateFormat}
              disabledDate={disabledDate}
              name="dateFrom"
              {...register("dateFrom")}
            />
            <DatePicker
              defaultValue={dayjs()}
              format={dateFormat}
              disabledDate={disabledDate}
              onChange={(value) => {
                console.log(value);
              }}
              name="dateTo"
              {...register("dateTo")}
            />
          </div>
        </div>
        <div className="input-container ic2 margbot">
          <h2 className="color1">Guests:</h2>
          <input
            className="input"
            type="number"
            placeholder={0}
            min={1}
            max={data.maxGuests}
            {...register("guests")}
          />
        </div>
        <button className="submit" onClick={handleSubmit(onSubmit)}>
          Book venue
        </button>
      </div>
      {accessToken === null && (
        <div>
          <h1>Please log in to book a venue.</h1>
          <p>You need to be logged in to book a venue.</p>
          <p>Log in <Link to="/Login">Here</Link></p>
        </div>
      )}
    </div>
  );
};

export default Calender;
