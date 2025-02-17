import React, { useEffect, useState } from "react";
import { TOP_RATED_URL } from "../utils/constant";
import Card from "../pages/Card";
import Pagination from "./Pagination";

const TopRatedPage = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllData(currentPage);
  }, [currentPage]);

  async function getAllData(page) {
    setLoading(true);
    try {
      const apiData = await fetch(`${TOP_RATED_URL}&page=${page}`);
      const res = await apiData.json();
      setData(res.results);
      setTotalPages(res.total_pages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  }

  return (
    <>
      <div className="cards-container">
        {loading ? (
          <p className="loading"></p>
        ) : data.length > 0 ? (
          data.map((item) => <Card {...item} key={item.id} />)
        ) : (
          <p>No top-rated movies found</p>
        )}
      </div>

      {data.length > 0 && !loading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
};

export default TopRatedPage;
