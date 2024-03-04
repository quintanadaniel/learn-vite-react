import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useEffect, useRef, useState, useCallback } from "react";
import debounce from "just-debounce-it";

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search === "") {
      setError("No se puede buscar pelicula vacia");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("No se puede buscar pelicula con numero");
      return;
    }

    if (search.length < 3) {
      setError("La busqueda ebe contener al menos 3 caracteres");
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { movies, loading, getMovies } = useMovies({ search, sort });

  // Usamos un debounce para evitar que rendericemos varias veces 
  // la busqueda de peliculas
  const debounceGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search });
    }, 500) // 500 milisegundos es una medida promedio e busqueda
    ,[getMovies]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(event.target.value);
    debounceGetMovies(newSearch);
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            style={{
              border: "1px solid transparent",
              borderColor: error ? "red" : "transparent",
            }}
            onChange={handleChange}
            value={search}
            name="query"
            placeholder="Avengers, Star Wars, The Matrix..."
          />
          <input type="checkbox" onChange={handleSort} checked={sort}></input>
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>{loading ? <p>Cargando ...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
