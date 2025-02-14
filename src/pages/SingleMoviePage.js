import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w200";

const SingleMoviePage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [movieResponse, creditsResponse] = await Promise.all([
          fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`),
          fetch(
            `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
          ),
        ]);

        if (!movieResponse.ok || !creditsResponse.ok) {
          throw new Error("Failed to fetch movie data.");
        }

        const [movieData, creditsData] = await Promise.all([
          movieResponse.json(),
          creditsResponse.json(),
        ]);

        setDetails(movieData);
        setCast(creditsData.cast);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!details) return <div>No movie details found.</div>;

  const {
    original_title,
    vote_average,
    genres,
    release_date,
    overview,
    poster_path,
    backdrop_path,
  } = details;

  const formattedDate = new Date(release_date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <Header />
      <div className="details-cast-section">
        <div className="details-section">
          <div className="details">
            <div className="bg">
              <img
                src={`https://image.tmdb.org/t/p/w300${poster_path}`}
                alt={original_title}
                className="movie-item"
              />
              <div className="bg-items">
                <h3 className="details-title">{original_title}</h3>
                <p className="details-rating">Rating : {vote_average.toFixed(1)}</p>
                <h3 className="genres">
                  Genres :{" "}
                  {genres?.map((genre) => genre.name).join(", ") || "N/A"}
                </h3>
                <p className="details-release-date">
                  <span className="release">Release Date :</span>{" "}
                  {formattedDate}
                </p>
              </div>
            </div>
            <div className="movie-details">
              <h2 className="overview">Overview:</h2>
              <p className="paragraph">{overview}</p>
            </div>
          </div>
          {backdrop_path && (
            <div className="background-image">
              <img
                src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
                alt="Background"
                className="item-images"
              />
            </div>
          )}
        </div>

        <div className="cast">
          <h2 className="cast-heading">Cast</h2>
          <ul className="cast-list">
            {cast.length > 0 ? (
              cast
                .filter((actor) => actor.profile_path) 
                .map((actor) => (
                  <li key={actor.id} className="cast-item">
                    <img
                      src={`${IMAGE_URL}${actor.profile_path}`}
                      alt={actor.name}
                      className="actor-image"
                    />
                    <div className="actor-details">
                      <p className="actor-name">{actor.name}</p>
                      <p className="character-name">as {actor.character}</p>
                    </div>
                  </li>
                ))
            ) : (
              <p>No cast information available.</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SingleMoviePage;
