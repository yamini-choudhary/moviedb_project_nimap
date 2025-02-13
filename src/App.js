import HomePage from "./pages/HomePage";
import TopRatedPage from "./pages/TopRatedPage";
import UpcomingMoviesPage from "./pages/UpcomingMoviesPage";
import SingleMoviePage from "./pages/SingleMoviePage";
// import SearchPage from "./pages/SearchPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/top-rated" element={<TopRatedPage />} />
        <Route path="/upcoming" element={<UpcomingMoviesPage />} />
        <Route path="/movie/:id" element={<SingleMoviePage />} />
        {/* <Route path="/search" element={<SearchPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
