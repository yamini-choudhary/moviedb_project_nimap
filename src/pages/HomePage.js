import React, { useEffect, useState } from "react";
import Header from "./Header";
import { URL } from "../utils/constant";
import Card from "./Card";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getAllData(currentPage);
  }, [currentPage]); 

  async function getAllData(page) {
    try {
      const apiData = await fetch(`${URL}&page=${page}`);
      const res = await apiData.json();
      setData(res.results);
      console.log(res.results)
      setTotalPages(res.total_pages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <Header />
      <div className="cards-container">
        {data.length > 0 ? (
          data.map((item) => <Card {...item} key={item.id} />)
        ) : (
          <p>No movies found</p>
        )}
      </div>

      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
};

export default HomePage;
