import withResults from "../mocks/with-result.json";
import withoutResults from "../mocks/no-results.json";
import { useState, useRef, useMemo, useCallback } from "react";
import { searchMovies } from "../services/movies";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousSearch = useRef(search);

  // Para este caso usamos un useMemo para evitar la creacion y destrucciond
  // de la funcion getMovies, y solo se invocara dependiendo de la dependencia de
  // seacrh
  /* Usando useMemo
  const getMovies = useMemo(() => {
    return async ({search}) => {
      if (search === previousSearch.current) return;
      try {
        setLoading(true);
        setError(null);
        previousSearch.current = search;
        const newMovies = await searchMovies({ search });
        setMovies(newMovies);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
  }, [])
  */

  //Usando useCallback, es lo mismo pero no tnemos que retornar 
  // y se usa para funciones
  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return;
    try {
      setLoading(true);
      setError(null);
      previousSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // aqui estamos usando useMemo para memoizar el ordenamiento de las pelicuals
  // cuando las buscmaos, pero solo aplica cuando aplica un sor o movies
  // lo podemos usar para calculos computacionales
  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, getMovies, loading };
}
