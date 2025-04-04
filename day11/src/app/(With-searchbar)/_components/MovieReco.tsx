"use client";
import { MovieData } from "@/types";
import { useEffect, useState } from "react";
import { fetchRandomMovies, waitForMsw } from "../_lib/fetchMovies";
import style from "./MoviesList.module.css";
import MovieItem from "@/components/movie-Item";

export default function MoviesList() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        // MSW 초기화 대기
        await waitForMsw();

        // 영화 데이터 가져오기
        const data = await fetchRandomMovies();
        setMovies(data);
      } catch (err) {
        console.error("❌ 오류 발생:", err);
        setError(
          err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
        );
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;

  return (
    <div className={style.reco_container}>
      {movies.map((movie) => (
        <MovieItem key={`reco-${movie.id}`} {...movie} />
      ))}
    </div>
  );
}
