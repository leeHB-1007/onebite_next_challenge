import React from "react";
import { MovieData } from "@/types";
import style from "./page.module.css";

export default async function MovieDetailClient({ params }: { params: {id: string}}) {
    const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${id}`,
    { cache: "force-cache" }
  );
   if(!response.ok) {
    throw new Error("네트워크 응답이 올바르지 않습니다.");
  }
  const movie: MovieData = await response.json();

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${movie.posterImgUrl}')` }}
      >
        <img src={movie.posterImgUrl} alt={movie.title} />
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
