import SearchableLayout from "@/components/searchable-layout";
import style from './index.module.css';
import { ReactNode, useState, useEffect } from "react";

import MovieItem from "@/components/MovieItem";
import { MovieData } from "@/types";

export default function Home() {
    const [movies, setMovies] = useState<MovieData[]>([]);
    const [recommendedMovies, setRecommendedMovies] = useState<MovieData[]>([]);
    const [loading, setLoading] = useState(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    useEffect(() => {
        // 모든 영화 데이터 가져오기
        const fetchMovies = async () => {
            try {
              const response = await fetch(`${baseUrl}/api/movies`);
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              setMovies(data);
            } catch (error) {
              console.error('영화 데이터를 가져오는 중 오류 발생:', error);
            }
          };
    
        // 추천 영화 데이터 가져오기
        const fetchRecommendedMovies = async () => {
            try {
              const response = await fetch(`/api/movies/recommended`);
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              setRecommendedMovies(data);
            } catch (error) {
              console.error('추천 영화 데이터를 가져오는 중 오류 발생:', error);
            } finally {
              setLoading(false);
            }
          };
    
        fetchMovies();
        fetchRecommendedMovies();
      }, []);

      if (loading) {
        return <div>로딩 중...</div>;
      }

  return (
    <div className={style.container}>
        <h3>지금 가장 추천하는 영화</h3>
      <section className={style.recommended}>
        {recommendedMovies.map((movie) => <MovieItem key={movie.id} {...movie} />)}
      </section>
        <h3>등록된 모든 영화</h3>
      <section className={style.movies}>
        {movies.map((movie) => <MovieItem key={movie.id} {...movie} />)}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
