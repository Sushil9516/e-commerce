import React, { useState, Fragment } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import MetaData from "../layout/MetaData";
import "./Search.css";

const Search = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`); // Use navigate instead of history.push
    } else {
      navigate("/products"); // Use navigate instead of history.push
    }
  };

  return (
    <Fragment>
      <MetaData title="Search A Product -- ECOMMERCE" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
