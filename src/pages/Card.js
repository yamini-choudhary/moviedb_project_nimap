import { IMAGE_URL } from "../utils/constant";
import { Link } from "react-router-dom";

const Card = ({
  id,
  vote_average,
  backdrop_path,
  poster_path,
  original_title,
}) => {
  if (!poster_path) return null;

  return (
    <Link to={`/movie/${id}`} className="items">
      <div className="cards">
        <img
          src={IMAGE_URL + poster_path}
          alt={original_title}
          className="images"
        />
        <p className="title">{original_title}</p>
        <p className="rating">
          Rating : {vote_average ? vote_average.toFixed(1) : "N/A"}
        </p>
      </div>
    </Link>
  );
};

export default Card;
