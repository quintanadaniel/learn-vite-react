export function ListOfMovies({ movies }) {
  return (
    <ul className="movies">
      {
      movies.map(movie => (
        <li className="movie" key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.poster} alt={movie.title} />
        </li>
      ))
      }
    </ul>
  );
}

export function ListNoResults() {
  return <p>No se encontraron peliculas</p>;
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0;

  return hasMovies ? <ListOfMovies movies={movies} /> : <ListNoResults />;
}
