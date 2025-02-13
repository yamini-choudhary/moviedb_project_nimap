import React, { useEffect, useState } from "react";
import Header from "./Header";
import { URL } from "../utils/constant";
import Card from "./Card";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    if (data && searchQuery.trim() !== "") {
      const filtered = data.filter((item) =>
        item.original_title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [data, searchQuery]);
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  async function getAllData() {
    const apiData = await fetch(URL);
    const res = await apiData.json();
    console.log(res.results);
    setData(res.results);
    setFilteredData(res.results);
  }
  return (
    <>
      <Header onSearch={handleSearch}/>
      <div className="cards-container">
        {filterData?.map((item) => (
          <Card {...item} key={item.id} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
