'use client'

import React, { useEffect, useState } from "react";
import { MovieData } from "@/types";
import { fetchMovieById, waitForMsw } from "@/app/(With-searchbar)/_lib/fetchMovies";
import style from "./page.module.css";

// params 대신 id를 직접 prop으로 받음
export default function MovieDetailClient({ id }: { id: string }) {
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        await waitForMsw();
        const data = await fetchMovieById(Number(id));
        setMovie(data);
      } catch (err) {
        console.error("❌ 오류 발생:", err);
        setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;
  if (!movie) return <div>영화 정보를 찾을 수 없습니다.</div>;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${movie.posterImgUrl}')` }}
      >
        <img src={movie.posterImgUrl} alt={movie.title}/>
      </div>
      <div className={style.info_container}>
        <div>
          <h2>{movie.title}</h2>
          <div>
            {movie.releaseDate} / {movie.genres.join(", ")} / {movie.runtime}분
          </div>
          <div>{movie.company}</div>
        </div>
        <div>
          <div className={style.subTitle}>{movie.subTitle}</div>
          <div className={style.description}>{movie.description}</div>
        </div>
      </div>
    </div>
  );
}