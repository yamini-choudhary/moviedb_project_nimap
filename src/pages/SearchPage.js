import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Card from "./Card";
import Pagination from "./Pagination";

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US`;

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setCurrentPage(1);
      fetchMovies(query, 1);
    }
  }, [query]);

  useEffect(() => {
    if (query) {
      fetchMovies(query, currentPage);
    }
  }, [currentPage]);

  const fetchMovies = async (query, page) => {
    setLoading(true);
    try {
      const response = await fetch(`${SEARCH_URL}&query=${query}&page=${page}`);
      const result = await response.json();
      setMovies(result.results || []);
      setTotalPages(result.total_pages || 1);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setMovies([]);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="cards-container">
        {loading ? (
          <p>Loading...</p>
        ) : movies.length > 0 ? (
          movies.map((movie) => <Card {...movie} key={movie.id} />)
        ) : (
          <p>No movies found for "{query}"</p>
        )}
      </div>

      {movies.length > 0 && !loading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
};

export default SearchPage;
