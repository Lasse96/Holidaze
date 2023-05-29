import React, { useEffect, useState } from "react";
import useApi from "../Hooks/useApi";
import { URL_ALL_LISTINGS } from "../Utils/Url";
import { Link } from "react-router-dom";

const Home = () => {
  const { data, isLoading, isError } = useApi(URL_ALL_LISTINGS + "?_owner=true");
  const [inputText, setInputText] = useState("");
  const [filterSearch, setFilterSearch] = useState("normal");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filteredProducts = data.filter((product) => {
      return product.name.toLowerCase().includes(inputText.toLowerCase());
    });

    let sortedProducts;

    if (filterSearch) {
      sortedProducts = [...filteredProducts].sort((a, b) => {
        return a.price - b.price;
      });
    } else {
      sortedProducts = filteredProducts;
    }

    setFilteredProducts(sortedProducts);
  }, [data, inputText, filterSearch]);

  if (isLoading) {
    return <h2>Loading</h2>;
  }
  if (isError) {
    console.log(isError);
  }

  return (
    <div>
      <input
        className="search"
        placeholder="Search"
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
      />
      <div className="grid2">
        {filteredProducts.map((venue, idx) => {
          return (
                <div className="flex4" key={idx}>
                  <div className="form margbot">
                    <div className="flex2">
                      <img className="img4" src={venue.media[0]} alt={venue.name} />
                    </div>
                    <h3 className="color1">{venue.name}</h3>
                    <p className="color1 p1 left">
                      On this venue:{" "}
                      {venue.meta.wifi && <span>Wifi,</span>}
                      {venue.meta.parking && <span>Parking,</span>}
                      {venue.meta.breakfast && <span>Breakfast,</span>}
                      {venue.meta.pets && <span>Pets</span>}
                    </p>
                    <p className="color1 p1 left">Guests: {venue.maxGuests}</p>
                    <p className="color1 p1 left">Price: $ {venue.price} per day</p>
                    <Link to={`/Venue/${venue.id}`}>
                      <button className="submit">Book venue</button>
                    </Link>
                  </div>
                </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
