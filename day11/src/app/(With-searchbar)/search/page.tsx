'use client'

import MovieItem from "@/components/movie-Item";
import React, { useEffect, useState } from "react";
import { searchMovies, waitForMsw } from "../_lib/fetchMovies";
import style from "./page.module.css";
import { useSearchParams } from "next/navigation";
import { MovieData } from "@/types";

export default function Search() {
  // useSearchParams 훅을 사용해 URL 쿼리 파라미터 가져오기
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        // MSW 초기화 대기
        await waitForMsw();
        
        // 영화 검색 실행
        const data = await searchMovies(q);
        setMovies(data);
      } catch (err) {
        console.error("❌ 오류 발생:", err);
        setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [q]); // 검색어가 변경될 때마다 다시 검색

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;

  return (
    <div>
      <div className={style.container}>
        {movies.map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
}
