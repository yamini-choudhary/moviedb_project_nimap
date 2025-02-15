import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Header from "./Header";
import Card from "./Card";

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US`;

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); // ✅ Added loading state

  useEffect(() => {
    if (query) {
      setCurrentPage(1); // ✅ Reset to first page when a new search happens
      fetchMovies(query, 1);
    }
  }, [query]);

  useEffect(() => {
    if (query) {
      fetchMovies(query, currentPage);
    }
  }, [currentPage]);

  const fetchMovies = async (query, page) => {
    setLoading(true); // ✅ Start loading
    try {
      const response = await fetch(`${SEARCH_URL}&query=${query}&page=${page}`);
      const result = await response.json();
      setMovies(result.results || []);
      setTotalPages(result.total_pages || 1);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setMovies([]); // Handle errors by clearing movies
    }
    setLoading(false); // ✅ Stop loading
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      <Header />
      <div className="cards-container">
        {loading ? (
          <p>Loading...</p> // ✅ Show while fetching data
        ) : movies.length > 0 ? (
          movies.map((movie) => <Card {...movie} key={movie.id} />)
        ) : (
          <p>No movies found for "{query}"</p> // ✅ Show only when API call is complete & no results
        )}
      </div>

      {movies.length > 0 && !loading && (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default SearchPage;
