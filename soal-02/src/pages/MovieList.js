import MovieCard from "../components/MovieCard";
import MovieListFilter from "../components/MovieListFilter";
import { useLocation } from "react-router";

import movies from "../dummy-data";

const MovieList = () => {
  const shows = [10, 20, 30];
  const categories = ["TV", "Movie"];
  const fields = ["title", "score"];

  const qs = require('qs')

  const queryParams = useLocation().search.slice(1);

  const params = qs.parse(queryParams);

  const filter = {
    show: Number(params.show) || shows[0],
    category: params.category || categories[0],
    sort: params.sort || fields[0],
  };

  const Sorted = (key) => {
    return (vall1, vall2) => {
      if (!vall1.hasOwnProperty(key) || !vall2.hasOwnProperty(key)) {
        return 0;
      }

      const item1 =
        typeof vall1[key] === "string" ? vall1[key].toUpperCase() : vall1[key];
      const item2 =
        typeof vall2[key] === "string" ? vall2[key].toUpperCase() : vall2[key];

      let comp = 0;
      if (item1 > item2) {
        comp = 1;
      } else if (item1 < item2) {
        comp = -1;
      }

      return comp;
    };
  };

  // Variable yang akan menyimpan data-data yang sudah difilter menggunakan variable filter diatas
  const filteredMovies = movies
    .filter((movie) => movie.type === filter.category)
    .sort(Sorted(filter.sort))
    .slice(0, filter.show);

  return (
    <div className="row">
      <MovieListFilter />
      {filteredMovies.map((movie) => (
        <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={movie.mal_id}>
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
};

export default MovieList;