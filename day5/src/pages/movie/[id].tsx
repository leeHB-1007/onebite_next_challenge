import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MovieData } from "@/types";
import style from "./[id].module.css";

interface MovieDetail extends MovieData {
  relatedMovies?: MovieData[];
}

export default function Movie() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchMovieDetail = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/movies/datail?id=${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setMovie(data);
        } catch (error) {
          console.error("영화 상세 정보를 가져오는 중 오류 발생:", error);
          setError("영화 정보를 불러올 수 없습니다.");
        } finally {
          setLoading(false);
        }
      };

      fetchMovieDetail();
    }
  }, [id]); // id가 변경될 때마다 실행

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>영화 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="movie-detail">
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url(${movie.posterImgUrl})` }}
      >
        <img src={movie.posterImgUrl} alt={`${movie.title} 포스터`} />
      </div>
      <div className={style.info}>
        <h1 className={style.title}>{movie.title}</h1>
        <div className={style.meta}>
          <p>{movie.releaseDate}</p>/
          <p>{movie.genres.join(", ")}</p>/
          <p>{movie.runtime}분</p>
        </div>
        <p>{movie.company}</p>
        <p className={style.subTitle}>{movie.subTitle}</p>
        <p>{movie.description}</p>
      </div>
    </div>
  );
}
